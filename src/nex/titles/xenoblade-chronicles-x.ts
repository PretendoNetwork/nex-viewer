import Title from '@/nex/titles/title';

export default class XenobladeChroniclesX extends Title {
	public static name = 'Xenoblade Chronicles X';
	public static gameServerID = '';
	public static accessKey = '59d7be84';
	public static libraryVersions = {
		main: '3.5.5',
		ranking: '3.5.5',
		datastore: '3.5.5',
		match_making: '3.5.5',
		messaging: '3.5.5',
		utility: '3.5.5'
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
		'0005000010116100',
		'00050000101C4C00',
		'00050000101C4D00'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
