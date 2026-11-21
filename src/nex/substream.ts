import RC4Stream from '@/rc4';
import Counter from '@/nex/counter';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class Substream {
	private pendingClientToServerPackets: Record<number, PRUDPPacket> = {};
	private pendingservertoClientPackets: Record<number, PRUDPPacket> = {};
	private clientToServerSequenceIDCounter = new Counter(1);
	private servertoClientSequenceIDCounter = new Counter(1);
	private clientToServerFragmentedPayload: Buffer = Buffer.alloc(0);
	private servertoClientFragmentedPayload: Buffer = Buffer.alloc(0);

	public clientToServerSeenPackets: PRUDPPacket[] = [];
	public servertoClientSeenPackets: PRUDPPacket[] = [];

	public clientToServerCipher?: RC4Stream;
	public servertoClientCipher?: RC4Stream;

	public setKey(key: Buffer | string): void {
		// TODO - Support more than just RC4
		this.clientToServerCipher = new RC4Stream(key);
		this.servertoClientCipher = new RC4Stream(key);
	}

	public update(packet: PRUDPPacket): PRUDPPacket[] {
		// * Keep track of the packet order and reorder them if need be
		const packets: PRUDPPacket[] = [];
		const pendingPackets = packet.fromClientToServer ? this.pendingClientToServerPackets : this.pendingservertoClientPackets;
		const sequenceIDCounter = packet.fromClientToServer ? this.clientToServerSequenceIDCounter : this.servertoClientSequenceIDCounter;

		// * Ignore reliable PING packets
		if (packet.isTypePing()) {
			return packets;
		}

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

	public addFragment(packet: PRUDPPacket): Buffer {
		const seenPackets = packet.fromClientToServer ? this.clientToServerSeenPackets : this.servertoClientSeenPackets;
		const fragmentedPayload = packet.fromClientToServer ? this.clientToServerFragmentedPayload : this.servertoClientFragmentedPayload;
		const seenPacket = seenPackets.findIndex(({ sequenceID }) => packet.sequenceID === sequenceID);

		if (seenPacket !== -1) {
			// * Already seen packet, ignore it
			return fragmentedPayload;
		}

		const cipher = packet.fromClientToServer ? this.clientToServerCipher : this.servertoClientCipher;
		let payload = packet.payload;

		if (!cipher) {
			throw new Error('No cipher set on substream. `setKey` not called');
		}

		// * Raw RMC packets and PRUDP Lite do not encrypt payloads.
		// * The same applies for DO packets (usually? Is there a game which encrypts them?)
		if ((packet.version === 0 || packet.version === 1) && payload && packet.sourceStreamType !== 1) {
			payload = cipher.update(payload);
		}

		packet.decryptedPayload = payload;

		payload = Buffer.concat([
			fragmentedPayload,
			payload || Buffer.alloc(0)
		]);

		seenPackets.push(packet);

		let newBuffer = payload;
		if (packet.fragmentID === 0) {
			newBuffer = Buffer.alloc(0);
		}

		if (packet.fromClientToServer) {
			this.clientToServerFragmentedPayload = newBuffer;
		} else {
			this.servertoClientFragmentedPayload = newBuffer;
		}

		return payload;
	}
}
