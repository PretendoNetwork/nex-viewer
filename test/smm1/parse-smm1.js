const fs = require('fs');
const { NEXParser } = require('../..');

const parser = new NEXParser();

// Do no processing, this only tests that the parser is working and throwing no errors
// This test does not care about visual output, only about errors
parser.on('packet', packet => {
	if (packet.error) {
		if (packet.error.message) {
			console.log(packet.error.message);
		} else {
			console.log(packet.error);
		}
	}
});

const udpDumpStream = fs.createReadStream('./SMM1-FirstConnect-SeeVideo.pcapng');
udpDumpStream.pipe(parser);