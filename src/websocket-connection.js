/**
 * @typedef {import('./packet-lite')} PacketLite
 */

const FragmentationManager = require('./fragmentation_manager');
const RMCMessage = require('./rmc');
const Protocols = require('./protocols');
const titles = require('./titles.json');

class WebSocketConnection {
	constructor(discriminator) {
		this.discriminator = discriminator;
		this.packets = [];
		this.title = {
			name: '',
			title_ids: [],
			access_key: '',
			nex_version: '0.0.0',
			nex_ranking_version: '0.0.0',
			nex_datastore_version: '0.0.0',
			nex_match_making_version: '0.0.0',
			nex_messaging_version: '0.0.0',
			nex_utility_version: '0.0.0'
		};

		this.clientFragmentationManager = new FragmentationManager();
		this.serverFragmentationManager = new FragmentationManager();
	}

	toJSON() {
		return {
			discriminator: this.discriminator,
			title: this.title,
			type: 'wss'
		};
	}

	configure(gameServerID) {
		for (const title of titles) {
			if (title.game_server_id === gameServerID) {
				this.title = title;
				break;
			}
		}

		if (this.title.name === '') {
			throw new Error(`Unsupported game server ID ${gameServerID}`);
		}
	}

	/**
	 *
	 * @param {(PacketLite)} packet PRUDPLite packet
	 */
	handlePacket(packet) {
		if (packet.isData() && !packet.hasFlagReliable()) {
			this.packets.push(packet);
			return;
		}

		if (packet.hasFlagAck() || packet.hasFlagMultiAck()) {
			// TODO - Parse these for their sequence IDs
			this.packets.push(packet);
			return;
		}

		if (packet.isPing()) {
			// * Ping packets contain no useful information
			this.packets.push(packet);
			return;
		}

		if (packet.isData()) {
			let fragments;

			if (packet.isToServer()) {
				fragments = this.clientFragmentationManager.update(packet);
			} else {
				fragments = this.serverFragmentationManager.update(packet);
			}

			if (packet.fragmentId === 0) {
				const payloads = [];

				for (const fragment of fragments) {
					payloads.push(fragment.payload);
				}

				const defragmentedPayload = Buffer.concat(payloads);

				packet.rmcMessage = new RMCMessage(defragmentedPayload);

				// * If the packet has a custom ID, check the protocol list with it
				let protocolId;
				if (packet.rmcMessage.protocolId === 0x7F) {
					protocolId = packet.rmcMessage.customId;
				} else {
					protocolId = packet.rmcMessage.protocolId;
				}

				const protocol = Protocols[protocolId];

				if (!protocol) {
					console.log(`Unknown protocol ID ${protocolId} (0x${protocolId.toString(16)})`);
					this.packets.push(packet);
					return;
				}

				if (!packet.rmcMessage.isRequest() && !packet.rmcMessage.isSuccess()) {
					const requestPacket = this.packets.find(p => {
						if (
							p.rmcMessage.isRequest() &&
							p.rmcMessage.protocolId === packet.rmcMessage.protocolId &&
							p.rmcMessage.callId === packet.rmcMessage.callId
						) {
							return true;
						}
					});

					if (requestPacket) {
						packet.rmcMessage.methodId = requestPacket.rmcMessage.methodId;
					}
				} else {
					try {
						protocol.handlePacket(packet);
					} catch (error) {
						packet.stackTrace = error.stack;
					}
				}

				if (!packet.rmcData.protocolName) {
					packet.rmcData.protocolName = protocol.ProtocolName;
				}

				if (!packet.rmcData.methodName) {
					packet.rmcData.methodName = protocol.MethodNames[packet.rmcMessage.methodId];
				}
			}
		}

		this.packets.push(packet);
	}
}

module.exports = WebSocketConnection;