import RC4Stream from '@/rc4';
import Counter from '@/nex/counter';
import type Packet from '@/types/nex/packet';

export default class Substream {
	private pendingClientToServerPackets: Record<number, Packet> = {};
	private pendingservertoClientPackets: Record<number, Packet> = {};
	private clientToServerSequenceIDCounter = new Counter(1);
	private servertoClientSequenceIDCounter = new Counter(1);
	private clientToServerFragmentedPayload = Buffer.alloc(0);
	private servertoClientFragmentedPayload = Buffer.alloc(0);

	public clientToServerSeenPackets: Packet[] = [];
	public servertoClientSeenPackets: Packet[] = [];

	public clientToServerCipher: RC4Stream;
	public servertoClientCipher: RC4Stream;

	public setKey(key: Buffer | string): void {
		// TODO - Support more than just RC4
		this.clientToServerCipher = new RC4Stream(key);
		this.servertoClientCipher = new RC4Stream(key);
	}

	public update(packet: Packet): Packet[] {
		// * Keep track of the packet order and reorder them if need be
		const packets: Packet[] = [];
		const pendingPackets = packet.fromClientToServer ? this.pendingClientToServerPackets : this.pendingservertoClientPackets;
		const sequenceIDCounter = packet.fromClientToServer ? this.clientToServerSequenceIDCounter : this.servertoClientSequenceIDCounter;

		if (!(packet.sequenceID < sequenceIDCounter.value || pendingPackets[packet.sequenceID])) {
			pendingPackets[packet.sequenceID] = packet;

			while (pendingPackets[sequenceIDCounter.value]) {
				packets.push(pendingPackets[sequenceIDCounter.value]);

				delete pendingPackets[sequenceIDCounter.value];

				sequenceIDCounter.next();
			}
		}

		return packets;
	}

	public addFragment(packet: Packet): Buffer {
		const seenPackets = packet.fromClientToServer ? this.clientToServerSeenPackets : this.servertoClientSeenPackets;
		const fragmentedPayload = packet.fromClientToServer ? this.clientToServerFragmentedPayload : this.servertoClientFragmentedPayload;
		const seenPacket = seenPackets.findIndex(({ sequenceID }) => packet.sequenceID === sequenceID);

		if (seenPacket !== -1) {
			// * Already seen packet, ignore it
			return fragmentedPayload;
		}

		const cipher = packet.fromClientToServer ? this.clientToServerCipher : this.servertoClientCipher;
		let payload = packet.payload;

		// * Raw RMC packets and PRUDP Lite do not encrypt payloads
		if ((packet.version === 0 || packet.version === 1) && payload) {
			payload = cipher.update(payload);
		}

		packet.decryptedPayload = payload;

		payload = Buffer.concat([
			fragmentedPayload,
			payload || Buffer.alloc(0)
		]);

		seenPackets.push(packet);

		// TODO - This is ugly
		if (packet.fragmentID === 0) {
			if (packet.fromClientToServer) {
				this.clientToServerFragmentedPayload = Buffer.alloc(0);
			} else {
				this.servertoClientFragmentedPayload = Buffer.alloc(0);
			}
		} else {
			if (packet.fromClientToServer) {
				this.clientToServerFragmentedPayload = payload;
			} else {
				this.servertoClientFragmentedPayload = payload;
			}
		}

		return payload;
	}
}
