import Title from '@/nex/titles/title';

export default class Splatoon extends Title {
	public static name = 'Splatoon';
	public static gameServerID = '';
	public static accessKey = '6f599f81';
	public static libraryVersions = {
		main: '3.8.3',
		ranking: '3.8.3',
		datastore: '3.8.3',
		match_making: '3.8.3',
		messaging: '3.8.3',
		utility: '3.8.3'
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
		'0005000010162B00',
		'0005000010176900',
		'0005000010176A00',
		'000500001017E300',
		'00050000101CDB00',
		'00050000101CDC00',
		'00050000101CDD00',
		'00050000101CDE00',
		'00050000101D6A00',
		'00050000101D6B00',
		'00050000101D6C00'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
