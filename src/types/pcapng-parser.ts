export type OptionalData = Map<number, Buffer>;

export type SectionHeaderBlock = {
	be: boolean;
	interfaces: InterfaceDescriptionBlock[];
	versionMajor: number;
	versionMinor: number;
	options: OptionalData;
};

export type InterfaceDescriptionBlock = {
	linkLayerType: number;
	reserved: number;
	maxPacketLength: number;
	options: OptionalData;
};

export type EnhancedPacketBlock = {
	interfaceID: number;
	timestamp: {
		high: number;
		low: number;
		seconds: number;
	};
	storedLength: number;
	realLength: number;
	interface: NetworkInterface;
	options: OptionalData;
	data: Buffer;
};

export type SimplePacketBlock = {
	realLength: number;
	interface: NetworkInterface;
	data: Buffer;
};

export type NameResolutionBlock = object; // * Unused
export type InterfaceStatisticsBlock = object; // * Unused
export type CustomBlock = object; // * Unused

export type EthernetInterface = {
	type: 1;
	data: {
		destinationMAC: string;
		sourceMAC: string;
		type: number;
	};
};

export type NetworkInterface = EthernetInterface;
