# NEX Viewer
### Utility for parsing and (eventually) viewing NEX connections from PCAP(NG) network dumps

## TODO:
### This tool is still VERY early in development, so nearly nothing is finished
- [x] PRUDP v0 packet parsing
- [x] PRUDP v1 packet parsing
- [ ] Fragmented payloads
- [ ] SMM DataStore method 50 (0x32) (`DataStoreSMM::GetCustomRankingByDataId`) is completely busted
- [ ] NEX Protocols (there is mixed support, some protocols are partially implemented)
- [ ] CLI Display


## Installation
```
npm i https://github.com/PretendoNetwork/nex-viewer
```

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

## NEX keys
PRUDP packet payloads get encrypted using a key which is encrypted using a key which is derived from your NEX account PID and password. In order to read packets, `nex-viewer` requires a `nex-keys.txt` file to be placed in any of these locations:

- `src` folder of this repo
- Root folder of this repo
- `%AppData%/Wireshark/nex-keys.txt` (Windows)
- `~/.config/wireshark/nex-keys.txt` (Linux/MacOS)

`nex-viewer` will check the local repo first then look elsewhere for the file depending on your operating system. `nex-keys.txt` must be in the following format:

```
NEX_PID:NEX_PASSWORD
NEX_PID:NEX_PASSWORD
NEX_PID:NEX_PASSWORD
NEX_PID:NEX_PASSWORD
```

With each NEX account details on a new line. Each time `nex-viewer` runs it will derive the correct crypto key from each PID:PASSWORD and write it back to `nex-keys.txt`. This way your NEX password does not stay in plain-text on disk

## WARNING!
DO NOT SHARE YOUR NEX PID AND PASSWORD WITH ANYBODY UNLESS YOU ABSOLUTELY KNOW WHAT YOU ARE DOING OR YOU DO NOT CARE ABOUT THE ACCOUNT. THIS PID/PASSWORD COMBINATION IS WHAT THE CONSOLE USES TO VERIFY YOU WHEN PLAYING ONLINE, NOT YOUR NNID USERNAME/PASSWORD. SHARING THESE DETAILS CAN ALLOW ANYONE TO LOGIN TO ANY GAME UNDER YOUR ACCOUNT

## Obtaining NEX account details
NEX accounts are _**not**_ the same thing as NNIDs. How you obtain your NEX account details depends on your system. See below for details

## Obtaining NEX account details (Wii U)

There are 2 ways to obtain your NEX account details on a Wii U

- Homebrew (can be unreliable)
- Proxy server (can be difficult to setup)

To use homebrew to obtain your NEX account details on Wii U, all you need is an FTP server homebrew (such as FTPiiU_Everywhere). Connect to your Wii U via FTP and navigate to `/storage_mlc/usr/save/system/act`. Here you will find folders for every account on your Wii U. Open each folder and then open the `account.dat` file in any text editor. Verify the account is the one you want to use by looking for your NNID user name (it will be labeled as `AccountId`). Once you have found the `account.dat` file for the account you want to use, find the `PrincipalId` and `NfsPassword` fields. If you do not see one of these fields, or if the field has no value, you _must_ use the proxy server method. The `PrincipalId` field is your NEX PID encoded as hexadecimal. Decode it back to decimal for use here (example: `68503904` decodes to `1750087940`). The `NfsPassword` field is your NEX password

To use a proxy server to obtain your NEX account details on Wii U, you must first get a proxy server like Fiddler (Windows), Charles (all OSes) or mitmproxy (all OSes). Note: if using Fiddler, do not use Fiddler Everywhere, use the original Fiddler. Once installed you must either disable SSL verification on your console via homebrew or replace your systems SSL certificates with the proxy server certificates. Be warned that messing up replacing the SSL certficiates will brick your console (can be recovered). Here are guides for [Fiddler](https://www.reddit.com/r/WiiUHacks/comments/6zfck3/guide_setting_up_mitm_to_log_and_preserve_services/) and [Charles](https://www.reddit.com/r/WiiUHacks/comments/6zj67k/guide_wii_u_mitm_charles_edition/). Once connected to the proxy server on your Wii U look for the request to `https://account.nintendo.net/v1/api/provider/nex_token/@me`. Open the response to this request and locate the `pid` and `nex_password` fields. These are your NEX account details

## Obtaining NEX account details (3DS)

Unlike the Wii U the 3DS does not request your NEX account details from any server. Instead it is stored on your console after the first time you connect to the friends server. The only wait to obtain your 3DS NEX account details is to dump them with homebrew. Downloads this [homebrew application](https://9net.org/~stary/get_3ds_pid_password.3dsx) and run it on your 3DS. It will create a `nex-keys.txt` file on the root of the SD card in the correct format already. The source code for the homebrew is [available here](https://github.com/Stary2001/nex-dissector/tree/master/get_3ds_pid_password)