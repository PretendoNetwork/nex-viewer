import Title from '@/nex/titles/title';

export default class PokemonRumbleWorld extends Title {
	public static name = 'Pokémon Rumble World';
	public static gameServerID = '';
	public static accessKey = '844f1d0c';
	public static libraryVersions = {
		main: '3.8.2',
		ranking: '3.8.2',
		datastore: '3.8.2',
		match_making: '3.8.2',
		messaging: '3.8.2',
		utility: '3.8.2'
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
		'0004000000164600',
		'0004000000185A00'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
