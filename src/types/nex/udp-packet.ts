type UDPPacket = {
	source: string;
	destination: string;
	sourcePort: number;
	destinationPort: number;
	payload: Buffer;
};

export default UDPPacket;
