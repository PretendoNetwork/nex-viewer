import Title from '@/nex/titles/title';

export default class MarioSonicattheRio2016OlympicGamesWiiU extends Title {
	public static name = 'Mario & Sonic at the Rio 2016 Olympic Games (Wii U)';
	public static gameServerID = '';
	public static accessKey = '63fecb0f';
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
		'0005000010190300',
		'00050000101E5300',
		'00050000101E5400'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
