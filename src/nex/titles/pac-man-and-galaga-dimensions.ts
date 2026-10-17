import RankingProtocolLegacy from '@/nex/protocols/ranking/legacy';
import StorageManagerProtocol from '@/nex/protocols/storage-manager';
import Title from '@/nex/titles/title';

export default class PacManAndGalagaDimensions extends Title {
	public static displayName = 'Pac-Man & Galaga Dimensions';
	public static gameServerID = '00039900';
	public static accessKey = '76ce81e6';
	public static libraryVersions = {
		main: '1.1.0',
		ranking: '1.1.0',
		datastore: '1.1.0',
		match_making: '1.1.0',
		messaging: '1.1.0',
		utility: '1.1.0'
	};

	public static settings = {
		pid_size: 4,
		string_length_size: 2,
		use_structure_header: false,
		session_key_size: 16,
		kerberos_key_version: 0,
		kerberos_ticket_version: 0,
		checksum_size: 4,
		flags_and_type_size: 2
	};

	public static titleIDs = [
		'0004000000036300',
		'0004000000039900',
		'0004000000045D00'
	];

	public static protocols = [
		RankingProtocolLegacy,
		StorageManagerProtocol
	]; // * Populate with the protocols this title uses
}
