import Title from '@/nex/titles/title';

export default class StealthInc2AGameofClones extends Title {
	public static name = 'Stealth Inc 2 A Game of Clones';
	public static gameServerID = '';
	public static accessKey = '44adeb87';
	public static libraryVersions = {
		main: '3.6.1',
		ranking: '3.6.1',
		datastore: '3.6.1',
		match_making: '3.6.1',
		messaging: '3.6.1',
		utility: '3.6.1'
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
		'0005000010173300',
		'0005000010176500'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
