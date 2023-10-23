/**
 * @typedef {import('../packet')} Packet
 * @typedef {import('../packetv0')} PacketV0
 * @typedef {import('../packetv1')} PacketV1
 */

const ShopBadgeArcade = require('./patches/shop_badge_arcade');
const ShopPokemonBank = require('./patches/shop_pokemon_bank');

// * This protocol has game-specific implementations,
// * so we check what game is using it and redirect
// * the packet to the proper handler.
class Shop {
	static ProtocolID = 0xC8;

	static ProtocolName = 'Shop';

	static MethodNames = {};

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet PRUDP packet
	 */
	static handlePacket(packet) {
		// Check if game is Badge Arcade
		if (packet.connection.accessKey === '82d5962d') {
			ShopBadgeArcade.handlePacket(packet);
			return;
		}

		// Check if game is Pokémon Bank
		if (packet.connection.accessKey === '9a2961d8') {
			ShopPokemonBank.handlePacket(packet);
			return;
		}

		console.log(`Unknown Shop protocol ID ${Shop.ProtocolID} (0x${Shop.ProtocolID.toString(16)}) used in ${packet.connection.title.name}`);
	}
}

module.exports = Shop;
