# NEX Viewer
### Utility for parsing and (eventually) viewing NEX connections from WireShark network dumps



## Installation

### NodeJS module
```
npm i https://github.com/PretendoNetwork/nex-viewer
```

### CLI Command
```
git clone https://github.com/PretendoNetwork/nex-viewer
cd nex-viewer
npm link
```



## What is working:
### This tool is still VERY early in development, so nearly nothing is finished
- [x] PRUDP v0 packet parsing
- [x] PRUDP v1 packet parsing
- [ ] NEX Protocols (there is mixed support, some protocols are partially implemented)
- [ ] CLI Display



## Example usage (clone) (CLI)
```
nex-viewer ./path-to-dump.pcapng
```



## Example usage (module)
```js
const fs = require('fs');
const { NEXParser } = require('nex-viewer');

const parser = new NEXParser();

parser.on('packet', packet => {
	// packet contains a parsed and processed PRUDP packet
});

parser.on('close', () => {
	// parser has finished
});

const udpDumpStream = fs.createReadStream('./path-to-dump.pcapng');
udpDumpStream.pipe(parser);
```
