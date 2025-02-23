import Title from '@/nex/titles/title';

export default class BIOHAZARDREVELATIONSUnveiledEdition extends Title {
	public static name = 'BIOHAZARD REVELATIONS Unveiled Edition';
	public static gameServerID = '';
	public static accessKey = '59d539a9';
	public static libraryVersions = {
		main: '3.2.1',
		ranking: '3.2.1',
		datastore: '3.2.1',
		match_making: '3.2.1',
		messaging: '3.2.1',
		utility: '3.2.1'
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
		'0005000010113100'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
