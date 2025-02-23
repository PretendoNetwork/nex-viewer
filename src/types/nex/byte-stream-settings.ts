type NEXByteStreamSettings = {
	pid_size: number;
	string_length_size: number;
	use_structure_header: boolean;
	session_key_size: number;
	kerberos_key_version: number;
	kerberos_ticket_version: number;
	checksum_size: number;
	flags_and_type_size: number;
};

export default NEXByteStreamSettings;
