import Title from '@/nex/titles/title';

export default class YokaiWatchBusters2 extends Title {
	public static name = 'Yo-kai Watch Busters 2';
	public static gameServerID = '';
	public static accessKey = 'cf2bf677';
	public static libraryVersions = {
		main: '4.2.0',
		ranking: '4.2.0',
		datastore: '4.2.0',
		match_making: '4.2.0',
		messaging: '4.2.0',
		utility: '4.2.0'
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
		'00040000001C9400',
		'00040000001C9C00'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
