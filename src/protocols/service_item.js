/**
 * @typedef {import('../packet')} Packet
 * @typedef {import('../packetv0')} PacketV0
 * @typedef {import('../packetv1')} PacketV1
 */

const ServiceItemTKCD = require('./patches/service_item_tkcd');
const ServiceItemWiiSportsClub = require('./patches/service_item_wii_sports_club');

// * This protocol has game-specific implementations,
// * so we check what game is using it and redirect
// * the packet to the proper handler.
class ServiceItem {
	static ProtocolID = 0x77;

	static ProtocolName = 'Service Item';

	static MethodNames = {};

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet PRUDP packet
	 */
	static handlePacket(packet) {
		// Check if game is TKCD
		if (packet.connection.accessKey === 'e0c85605') {
			ServiceItemTKCD.handlePacket(packet);
			return;
		}

		// Check if game is Wii Sports Club
		if (packet.connection.accessKey === '4d324052') {
			ServiceItemWiiSportsClub.handlePacket(packet);
			return;
		}

		console.log(`Unknown Service Item protocol ID ${ServiceItem.ProtocolID} (0x${ServiceItem.ProtocolID.toString(16)}) used in ${packet.connection.title.name}`);
	}
}

module.exports = ServiceItem;
