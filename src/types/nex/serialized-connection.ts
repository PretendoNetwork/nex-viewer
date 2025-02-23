import type RMCMessage from '@/nex/rmc-message';
import type NEXByteStreamSettings from '@/types/nex/byte-stream-settings';
import type ServiceProtocol from '@/types/nex/service-protocol';

export interface Title {
	name: string;
	gameServerID: string;
	accessKey: string;
	libraryVersions: {
		main: string;
		ranking: string;
		datastore: string;
		match_making: string;
		messaging: string;
		utility: string;
	};
	settings: NEXByteStreamSettings;
	titleIDs: string[];
	protocols: ServiceProtocol[];

	getProtocolHandler(message: RMCMessage): ServiceProtocol | undefined;
}

export type SerializedConnection = {
	title: Title;
};

export default SerializedConnection;
