/*

Port of
https://github.com/Stary2001/nex-dissector/blob/master/nex-dissector-plugin/fragmentation.lua
modified to fit my needs

*/

const Packet = require('./packet'); // eslint-disable-line no-unused-vars
const PacketV0 = require('./packetv0'); // eslint-disable-line no-unused-vars
const PacketV1 = require('./packetv1'); // eslint-disable-line no-unused-vars

class FragmentationManager {
	constructor(baseId) {
		this.baseId = baseId;
		this.fragments = {};
		this.seenIds = [];
		this.startSequenceIds = {};
		this.deferredFragments = {};
		this.currentPacket;
	}

	makeUniqueId(sequenceId) {
		return `${this.baseId}+${this.currentPacket.source}-${this.currentPacket.destination}-${this.currentPacket.sessionId}-${sequenceId}`;
	}

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet PRUDP packet
	 * @returns {Array} fragments
	 */
	update(packet) {
		this.currentPacket = packet;

		if (this.startSequenceIds[this.baseId] === undefined) {
			this.startSequenceIds[this.baseId] = packet.sequenceId;
		}

		const payload = packet.payload;
		const uninqueSequenceAndConnectionId = this.makeUniqueId(packet.sequenceId);

		this.seenIds.push(uninqueSequenceAndConnectionId);

		if (!this.fragments[uninqueSequenceAndConnectionId]) {
			this.fragments[uninqueSequenceAndConnectionId] = {
				id: packet.fragmentId,
				payload: payload
			};
		}

		let { defragmented } = this.fragments[uninqueSequenceAndConnectionId];

		if (!defragmented) {
			defragmented = [];

			if (packet.fragmentId === 0) {
				const missingFragments = [];
				for (let i = packet.sequenceId - 1; i >= Math.max(packet.sequenceId - 50, this.startSequenceIds[this.baseId]); i--) {
					const id = this.makeUniqueId(i);
					if (!this.seenIds.includes(id)) {
						missingFragments.push(id);
						//console.log('Missing packet', id, 'in stream, deferrring fragment restoration');
					}
				}

				for (const id of missingFragments) {
					this.deferredFragments[id] = {
						missingFragments: missingFragments,
						sequenceId: packet.sequenceId
					};
				}

				if (missingFragments.length === 0) { // nothing missing, restore the fragments
					let previousFragment = this.fragments[this.makeUniqueId(packet.sequenceId - 1)];
					if (previousFragment && previousFragment.id > packet.fragmentId) {
						console.log('Restoring', previousFragment.id, 'fragments');
						for (let i = packet.sequenceId; i >= this.startSequenceIds[this.baseId] - 1; i--) {
							let fragment = this.fragments[this.makeUniqueId(i)];
							if (!fragment) {
								console.error('Cannot find fragment', i, 'in the past for packet', uninqueSequenceAndConnectionId);
								break;
							}

							defragmented.push(fragment.payload);

							if (fragment.id == 1) {
								break;
							}
						}
					} else {
						// no additional fragments detected
						defragmented.push(payload);
					}
				}
			} else { // missing fragments, attempt to defer defragmentation until a later stage
				const deferredFragment = this.deferredFragments[uninqueSequenceAndConnectionId];
				if (deferredFragment) {
					console.log('Found missing packet', uninqueSequenceAndConnectionId, ' fragment: ', packet.fragmentId, ')');
					const { missingFragments } = deferredFragment;

					for (const id of missingFragments) {
						if (id === uninqueSequenceAndConnectionId) {
							const index = missingFragments.indexOf(id);
							delete missingFragments[index];
						}
					}

					if (missingFragments.length === 0) {
						const deferredSequenceId = deferredFragment.sequenceId;
						console.log('Found all missing packets, defragmenting from', this.makeUniqueId(deferredSequenceId));

						for (let i = deferredSequenceId; i >= this.startSequenceIds[this.baseId] - 1; i--) {
							const fragment = this.fragments[this.makeUniqueId(i)];
							if (!fragment) {
								console.error('Cannot find fragment', i, 'in the past for packet', deferredSequenceId);
								break;
							}

							defragmented.push(fragment.payload);

							if (fragment.id == 1) {
								break;
							}
						}
					}
				}
			}

			this.fragments[uninqueSequenceAndConnectionId].defragmented = defragmented;
		} else {
			// * Already seen these packets
			return {
				fragments: [...defragmented].reverse(),
				seen: true,
			};
		}

		return {
			fragments: [...defragmented].reverse(),
			seen: false,
		};
	}
}

module.exports = FragmentationManager;