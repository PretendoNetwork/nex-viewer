import Title from '@/nex/titles/title';
import NATTraversalProtocol from '@/nex/protocols/nat-traversal';
import MatchmakingProtocol from '@/nex/protocols/match-making';
import MatchmakingExtProtocol from '@/nex/protocols/match-making-ext';
import MatchmakeExtensionProtocol from '@/nex/protocols/matchmake-extension';
import DataStoreProtocol from '@/nex/protocols/datastore';

export default class MonsterHunter3Ultimate extends Title {
	public static displayName = 'Monster Hunter 3 Ultimate';
	public static gameServerID = '';
	public static accessKey = 'cb2b2f5a';
	public static libraryVersions = {
		main: '3.0.5',
		ranking: '3.0.5',
		datastore: '3.0.5',
		match_making: '3.0.5',
		messaging: '3.0.5',
		utility: '3.0.5'
	};

	public static settings = {
		pid_size: 4,
		string_length_size: 2,
		use_structure_header: false,
		session_key_size: 32,
		kerberos_key_version: 0,
		kerberos_ticket_version: 0,
		checksum_size: 4,
		flags_and_type_size: 2
	};

	public static titleIDs = [
		'00040000000AE400',
		'00040000000B1D00',
		'00040000000D2E00',
		'0004000000126300',
		'0005000010117200',
		'0005000010118300'
	];

	public static protocols = [
		NATTraversalProtocol,
		MatchmakingProtocol,
		MatchmakingExtProtocol,
		MatchmakeExtensionProtocol,
		DataStoreProtocol
	]; // * Populate with the protocols this title uses
}
