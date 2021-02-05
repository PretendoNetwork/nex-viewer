// This file is used to store the access keys for servers with NEX protocol patches
// If a server uses one of these access keys we know what patches to use in a given protocol

// Monster Hunter XX (3DS) has patches for Matchmake Extension, need to get server access key
module.exports = [
	'ridfebb9', // Friends (has no patches, used for kerberos)
	'9f2b4678', // Super Mario Maker
	'6f599f81', // Splatoon
	'2869ba38', // Smash 4 (this key also works for the friends server, so the friends server key is higher up to prevent clashes)
	'25dbf96a', // Mario Kart 8
];