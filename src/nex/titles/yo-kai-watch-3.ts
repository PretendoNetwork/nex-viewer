import Title from '@/nex/titles/title';

export default class YokaiWatch3 extends Title {
	public static name = 'Yo-kai Watch 3';
	public static gameServerID = '';
	public static accessKey = 'd9ca7b02';
	public static libraryVersions = {
		main: '3.10.0',
		ranking: '3.10.0',
		datastore: '3.10.0',
		match_making: '3.10.0',
		messaging: '3.10.0',
		utility: '3.10.0'
	};

	public static settings = {
		pid_size: 4,
		string_length_size: 2,
		use_structure_header: true,
		session_key_size: 32,
		kerberos_key_version: 0,
		kerberos_ticket_version: 0,
		checksum_size: 4,
		flags_and_type_size: 2,
		use_crossplay: false
	};

	public static titleIDs = [
		'000400000018B000',
		'0004000000191000',
		'0004000000191100',
		'00040000001AF400',
		'00040000001D6700',
		'00040000001D6800',
		'00040000001D6900',
		'00040000001D6A00',
		'00040000001D6B00',
		'00040000001D6C00'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
