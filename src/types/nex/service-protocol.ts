import type Packet from '@/types/nex/packet';

type ServiceProtocol = {
	ID: number;
	Name: string;

	handlePacket(packet: Packet): void;
};

export default ServiceProtocol;
