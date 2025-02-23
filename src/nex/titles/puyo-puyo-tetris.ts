import Title from '@/nex/titles/title';

export default class PuyoPuyoTetris extends Title {
	public static name = 'Puyo Puyo Tetris';
	public static gameServerID = '';
	public static accessKey = '4eb0ca36';
	public static libraryVersions = {
		main: '3.5.2',
		ranking: '3.5.2',
		datastore: '3.5.2',
		match_making: '3.5.2',
		messaging: '3.5.2',
		utility: '3.5.2'
	};

	public static settings = {
		pid_size: 4,
		string_length_size: 2,
		use_structure_header: true,
		session_key_size: 32,
		kerberos_key_version: 0,
		kerberos_ticket_version: 0,
		checksum_size: 4,
		flags_and_type_size: 2
	};

	public static titleIDs = [
		'0004000000101200',
		'000500001014D900'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
