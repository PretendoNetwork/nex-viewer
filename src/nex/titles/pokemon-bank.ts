import Title from '@/nex/titles/title';

export default class PokemonBank extends Title {
	public static name = 'Pokémon Bank';
	public static gameServerID = '';
	public static accessKey = '9a2961d8';
	public static libraryVersions = {
		main: '3.4.12',
		ranking: '3.4.12',
		datastore: '3.4.12',
		match_making: '3.4.12',
		messaging: '3.4.12',
		utility: '3.4.12'
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
		'00040000000C9B00'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
