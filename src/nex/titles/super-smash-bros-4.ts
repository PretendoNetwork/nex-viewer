import Title from '@/nex/titles/title';

export default class SuperSmashBros4 extends Title {
	public static name = 'Super Smash Bros. 4';
	public static gameServerID = '';
	public static accessKey = '2869ba38';
	public static libraryVersions = {
		main: '3.6.27',
		ranking: '3.6.27',
		datastore: '3.6.27',
		match_making: '3.6.27',
		messaging: '3.6.27',
		utility: '3.6.27'
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
		'00040000000B8B00',
		'00040000000EDF00',
		'00040000000EE000',
		'0004000000167C00',
		'0005000010110E00',
		'0005000010144F00',
		'0005000010145000'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
