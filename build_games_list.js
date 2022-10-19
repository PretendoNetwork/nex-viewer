const fs = require('fs');

const nex = fs.readFileSync('./nex.txt').toString(); // Data from https://kinnay.github.io/view.html?page=wiiu
const access = fs.readFileSync('./access.txt').toString(); // Data from https://kinnay.github.io/view.html?page=nexwiiu

const nexLines = nex.split('\n');
const accessLines = access.split('\n');

// * Start the list with the Friends server
// * This is because the Smash 4 access key
// * also works for the friends server
const titles = [
	{
		name: 'Friends',
		nex_version: { // NEX version doesn't matter here
			major: 0,
			minor: 0,
			patch: 0
		},
		access_key: 'ridfebb9',
	}
];

// Fill in title NEX details
for (const line of nexLines) {
	const [name, nexVersion] = line.split('|');
	const [major, minor, patch] = nexVersion.trim().split('.');

	titles.push({
		name: name.trim(),
		nex_version: {
			major: Number(major),
			minor: Number(minor),
			patch: Number(patch)
		},
		access_key: '',
	});
}

// Match the titles access key
for (const line of accessLines) {
	const [name, accessKey] = line.split('|');

	const game = titles.find(game => game.name === name.trim());

	if (game) {
		game.access_key = accessKey.trim();
	} else {
		titles.push({
			name: name.trim(),
			nex_version: {
				major: 0,
				minor: 0,
				patch: 0
			},
			access_key: accessKey.trim(),
		});
	}
}

fs.writeFileSync('./src/titles.json', JSON.stringify(titles, null, 4));

console.log('Title data built');