import TicketGrantingProtocol from '@/nex/protocols/ticket-granting';
import SecureConnectionProtocol from '@/nex/protocols/secure-connection';
import type RMCMessage from '@/nex/rmc-message';
import type ServiceProtocol from '@/types/nex/service-protocol';

export default class Title {
	// TODO - Update the protocol classes to "configure" them with the library settings/version? That way we can remove the options from this class
	private static commonProtocols = [ // * Protocols common to all titles
		TicketGrantingProtocol,
		SecureConnectionProtocol
	];

	// * Stubs just to get getProtocolHandler working. This is actually set on the parent class
	public static name: string;
	public static gameServerID: string;
	public static accessKey: string;
	public static libraryVersions: {
		main: string;
		ranking: string;
		datastore: string;
		match_making: string;
		messaging: string;
		utility: string;
	};

	public static settings: {
		pid_size: number;
		string_length_size: number;
		use_structure_header: boolean;
		session_key_size: number;
		kerberos_key_version: number;
		kerberos_ticket_version: number;
		checksum_size: number;
		flags_and_type_size: number;
	};

	public static titleIDs: string[];
	public static protocols: ServiceProtocol[];

	public static getProtocolHandler(message: RMCMessage): ServiceProtocol | undefined {
		const protocolID = message.protocolID === 0x7F ? message.extendedProtocolID : message.protocolID;
		const protocols = [
			...this.commonProtocols,
			...this.protocols
		];

		for (const protocol of protocols) {
			if (protocol.ID === protocolID) {
				return protocol;
			}
		}
	}

	// * For serializing when sending to the frontend
	public static toJSON(): Record<string, any> {
		return {
			name: this.name,
			game_server_id: this.gameServerID,
			access_key: this.accessKey,
			library_versions: this.libraryVersions,
			settings: this.settings,
			title_ids: this.titleIDs
		};
	}

	// TODO - Add methods to calculate packet signatures and checksums. That way we can support non-NEX and non-standard-NEX titles
}
