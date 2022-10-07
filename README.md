# NEX Viewer
### Utility for parsing and (eventually) viewing NEX connections from PCAP(NG) network dumps

## Installation
```
npm i https://github.com/PretendoNetwork/nex-viewer
```



## TODO:
### This tool is still VERY early in development, so nearly nothing is finished
- [x] PRUDP v0 packet parsing
- [x] PRUDP v1 packet parsing
- [ ] Fragmented payloads
- [ ] SMM DataStore method 50 (0x32) is completely busted
- [ ] NEX Protocols (there is mixed support, some protocols are partially implemented)
- [ ] CLI Display


## Example usage
```js
const NEXParser = require('../..');
const parser = new NEXParser();

parser.on('packet', packet => {
	// DO SOMETHING
	console.log(packet);
});

parser.parse(__dirname + '/smm.pcapng');
```
