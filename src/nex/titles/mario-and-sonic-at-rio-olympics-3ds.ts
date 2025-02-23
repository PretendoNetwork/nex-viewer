import Title from '@/nex/titles/title';

export default class MarioSonicatRioOlympics3DS extends Title {
	public static name = 'Mario & Sonic at Rio Olympics (3DS)';
	public static gameServerID = '';
	public static accessKey = 'a2dbfa39';
	public static libraryVersions = {
		main: '3.9.1',
		ranking: '3.9.1',
		datastore: '3.9.1',
		match_making: '3.9.1',
		messaging: '3.9.1',
		utility: '3.9.1'
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
		'000400000014A400',
		'000400000017E200',
		'000400000017E300',
		'0004000000191C00',
		'0004000000191D00',
		'0004000000192400'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
