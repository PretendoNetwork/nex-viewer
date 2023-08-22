const Packet = require('./packet'); // eslint-disable-line no-unused-vars
const PacketV0 = require('./packetv0'); // eslint-disable-line no-unused-vars
const PacketV1 = require('./packetv1'); // eslint-disable-line no-unused-vars

class FragmentationManager {
	constructor() {
		this.fragments = [];
	}

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet PRUDP packet
	 * @returns {Array} fragments
	 */
	update(packet) {
		// * Some extra fragment
		if (packet.fragmentId !== 0) {
			this.fragments.push({
				sequenceId: packet.sequenceId,
				fragmentId: packet.fragmentId,
				nextedExpectedSequenceId: packet.sequenceId+1,
				payload: packet.payload
			});
		}

		// * End of fragmentation. Start rebuilding
		if (packet.fragmentId === 0) {
			const fragments = [];
			const secondToLastFragment = this.fragments.find(fragment => fragment.nextedExpectedSequenceId === packet.sequenceId);

			if (secondToLastFragment) {
				// * Payload was fragmented
				const missingFragments = [];
				const firstFragment = this.fragments.find(fragment => fragment.sequenceId === secondToLastFragment.sequenceId-secondToLastFragment.fragmentId+1);

				fragments.push(firstFragment);

				let currentFragment = firstFragment;

				for (let i = 0; i < secondToLastFragment.fragmentId-1; i++) {
					const nextFragment = this.fragments.find(fragment => fragment.sequenceId === currentFragment.nextedExpectedSequenceId);
					if (!nextFragment) {
						console.log('MISSING FRAGMENT', currentFragment.nextedExpectedSequenceId);
						missingFragments.push(currentFragment.nextedExpectedSequenceId);

						// TODO - Handle and defer this. I don't have any dumps which have missing packets to test!

						// * Fake next fragment, just to keep the loop going
						currentFragment = {
							nextedExpectedSequenceId: currentFragment.nextedExpectedSequenceId+1
						};
					} else {
						currentFragment = nextFragment;
						fragments.push(currentFragment);
					}
				}
			}

			// * Reorder the packets from 1-X and add fragment 0 to the end
			const sortedFragments = fragments.sort((a, b) => a.fragmentId - b.fragmentId);
			sortedFragments.push(packet);

			return sortedFragments;
		}

		return [];
	}
}

module.exports = FragmentationManager;