const NEXParser = require('../..');
const parser = new NEXParser();

parser.on('packet', packet => {
	// * DO SOMETHING
});

parser.parse(__dirname + '/smm.pcapng');