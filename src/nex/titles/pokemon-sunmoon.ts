import Title from '@/nex/titles/title';

export default class PokemonSunMoon extends Title {
	public static name = 'Pokémon Sun/Moon';
	public static gameServerID = '';
	public static accessKey = '086f9d28';
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
		'0004000000164800',
		'0004000000175E00'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
