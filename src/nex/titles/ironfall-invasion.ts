import Title from '@/nex/titles/title';

export default class IRONFALLInvasion extends Title {
	public static name = 'IRONFALL Invasion';
	public static gameServerID = '';
	public static accessKey = 'feb81c7c';
	public static libraryVersions = {
		main: '3.7.1',
		ranking: '3.7.1',
		datastore: '3.7.1',
		match_making: '3.7.1',
		messaging: '3.7.1',
		utility: '3.7.1'
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
		'000400000015B100',
		'000400000015D800',
		'000400000017BF00',
		'000400000017D000'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
