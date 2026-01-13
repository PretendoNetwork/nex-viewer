import Title from '@/nex/titles/title';

export default class PokemonXY extends Title {
	public static name = 'Pokémon X/Y and OR/AS';
	public static gameServerID = '';
	public static accessKey = '876138df';
	public static libraryVersions = {
		main: '3.3.8',
		ranking: '3.3.8',
		datastore: '3.3.8',
		match_making: '3.3.8',
		messaging: '3.3.8',
		utility: '3.3.8'
	};

	public static settings = {
		pid_size: 4,
		string_length_size: 2,
		use_structure_header: false,
		session_key_size: 32,
		kerberos_key_version: 0,
		kerberos_ticket_version: 0,
		checksum_size: 4,
		flags_and_type_size: 2,
		use_crossplay: false
	};

	public static titleIDs = [
		'0004000000055D00',
		'0004000000055E00',
		'000400000011C400',
		'000400000011C500'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
