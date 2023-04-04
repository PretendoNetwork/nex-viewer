const fs = require('fs');

const nex = fs.readFileSync('./nex.txt').toString(); // Data from https://kinnay.github.io/view.html?page=wiiu
const nexMatchMaking = fs.readFileSync('./nex_match_making.txt').toString();
const nexDataStore = fs.readFileSync('./nex_datastore.txt').toString();
const access = fs.readFileSync('./access.txt').toString(); // Data from https://kinnay.github.io/view.html?page=nexwiiu

const nexLines = nex.split('\n');
const nexMatchMakingLines = nexMatchMaking.split('\n');
const nexDataStoreLines = nexDataStore.split('\n');
const accessLines = access.split('\n');

// * Start the list with the Friends server
// * This is because the Smash 4 access key
// * also works for the friends server
const titles = [
	{
		name: 'Friends',
		access_key: 'ridfebb9',
		nex_version: { // NEX version doesn't matter here
			major: 0,
			minor: 0,
			patch: 0
		}
	}
];

// Fill in title NEX details
for (const line of nexLines) {
	// Discard empty lines
	if (!line) continue;

	const [name, nexVersion] = line.split('|');
	const [major, minor, patch] = nexVersion.trim().split('.');

	titles.push({
		name: name.trim(),
		access_key: '',
		nex_version: {
			major: Number(major),
			minor: Number(minor),
			patch: Number(patch)
		}
	});
}

// Fill in title NEX additional Matchmaking versions
for (const line of nexMatchMakingLines) {
	// Discard empty lines
	if (!line) continue;

	const [name, nexVersion] = line.split('|');
	const [major, minor, patch] = nexVersion.trim().split('.');

	const game = titles.find(game => game.name === name.trim());

	if (game) {
		game.nex_match_making_version = {
			major: Number(major),
			minor: Number(minor),
			patch: Number(patch)
		};
	} else {
		titles.push({
			name: name.trim(),
			access_key: '',
			nex_version: {
				major: 0,
				minor: 0,
				patch: 0
			},
			nex_match_making_version: {
				major: 0,
				minor: 0,
				patch: 0
			}
		});
	}
}

// Fill in title NEX additional DataStore versions
for (const line of nexDataStoreLines) {
	// Discard empty lines
	if (!line) continue;

	const [name, nexVersion] = line.split('|');
	const [major, minor, patch] = nexVersion.trim().split('.');

	const game = titles.find(game => game.name === name.trim());

	if (game) {
		game.nex_datastore_version = {
			major: Number(major),
			minor: Number(minor),
			patch: Number(patch)
		};
	} else {
		titles.push({
			name: name.trim(),
			access_key: '',
			nex_version: {
				major: 0,
				minor: 0,
				patch: 0
			},
			nex_datastore_version: {
				major: 0,
				minor: 0,
				patch: 0
			}
		});
	}
}

// Match the titles access key
for (const line of accessLines) {
	// Discard empty lines
	if (!line) continue;

	const [name, accessKey] = line.split('|');

	const game = titles.find(game => game.name === name.trim());

	if (game) {
		game.access_key = accessKey.trim();
	} else {
		titles.push({
			name: name.trim(),
			access_key: accessKey.trim(),
			nex_version: {
				major: 0,
				minor: 0,
				patch: 0
			}
		});
	}
}

fs.writeFileSync('./src/titles.json', JSON.stringify(titles, null, 4));

console.log('Title data built');
