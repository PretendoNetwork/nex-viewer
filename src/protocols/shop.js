const Packet = require('../packet'); // eslint-disable-line no-unused-vars
const PacketV0 = require('../packetv0'); // eslint-disable-line no-unused-vars
const PacketV1 = require('../packetv1'); // eslint-disable-line no-unused-vars

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
		// Check if game is Pokémon Bank
		if (packet.connection.accessKey === '9a2961d8') {
			ShopPokemonBank.handlePacket(packet);
			return;
		}

		console.log(`Unknown Shop protocol ID ${Shop.ProtocolID} (0x${Shop.ProtocolID.toString(16)}) used in ${packet.connection.title.name}`);
	}
}

module.exports = Shop;
