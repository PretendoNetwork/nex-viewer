import NATTraversalProtocol from '@/nex/protocols/nat-traversal';
import MatchMakingExtProtocol from '@/nex/protocols/match-making-ext';
import MatchmakeExtensionProtocol from '@/nex/protocols/matchmake-extension';
import RankingProtocol from '@/nex/protocols/ranking';
import Title from '@/nex/titles/title';

export default class MarioTennisOpen extends Title {
	public static displayName = 'Mario Golf: World Tour';
	public static gameServerID = '';
	public static accessKey = '';
	public static libraryVersions = {
		main: '3.4.2',
		ranking: '3.4.2',
		datastore: '3.4.2',
		match_making: '3.4.2',
		messaging: '3.4.2',
		utility: '3.4.2'
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
		'00040000000DCD00',
		'0004000000106300',
		'00040000000A5300',
		'00040000000DCE00'
	];

	public static protocols = [
		NATTraversalProtocol,
		MatchMakingExtProtocol,
		MatchmakeExtensionProtocol,
		RankingProtocol
	];
}
