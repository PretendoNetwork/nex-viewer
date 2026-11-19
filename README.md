# Pretendo Network Viewer
### Utility for proxying and viewing gameplay sessions from various consoles, including the 3DS, Wii U and Switch.

## Support
### Packets
- [x] Quazal Rendez-Vous
- [x] PRUDPv0
- [x] PRUDPv1
- [x] PRUDPLite
- [ ] NetZ (WIP)
- [ ] PIA (WIP)
- [ ] HPP
- [ ] HTTP
- [x] gRPC/NPLN

### Dump Formats
- [x] [PCAP (`.pacp`)](https://www.ietf.org/archive/id/draft-gharris-opsawg-pcap-01.html)
- [x] [PCAPNG (`.pacpng`)](https://www.ietf.org/archive/id/draft-tuexen-opsawg-pcapng-03.html)
- [x] [HAR (`.har`)](https://en.wikipedia.org/wiki/HAR_(file_format))
- [x] [Charles (`.chls`, `.chlz`)](https://www.charlesproxy.com)
- [x] [Mitmproxy Flows (`.flow`, `.flows`)](https://mitmproxy.org)
- [ ] [Fiddler (`.saz`)](https://docs.telerik.com/fiddler-everywhere/knowledge-base/fiddler-archives)
- [x] [Proxide (`.bin`)](https://github.com/Rantanen/proxide)

### NEX Protocols
- [x] [RemoteLogDevice](https://nintendo-wiki.pretendo.network/docs/nex/protocols/remote-log-device)
- [x] [NATTraversal](https://nintendo-wiki.pretendo.network/docs/nex/protocols/nat-traversal)
- [x] [TicketGranting](https://nintendo-wiki.pretendo.network/docs/nex/protocols/authentication)
- [x] [SecureConnection](https://nintendo-wiki.pretendo.network/docs/nex/protocols/secure-connection)
- [ ] BackEndManagement
- [x] [NotificationEvents](https://nintendo-wiki.pretendo.network/docs/nex/protocols/notifications)
- [ ] [SimpleAuthentication](https://nintendo-wiki.pretendo.network/docs/nex/protocols/simple-authentication)
- [ ] Siege
- [x] [Health](https://nintendo-wiki.pretendo.network/docs/nex/protocols/health)
- [x] [Monitoring](https://nintendo-wiki.pretendo.network/docs/nex/protocols/monitoring)
- [x] [Friends](https://nintendo-wiki.pretendo.network/docs/nex/protocols/friends)
- [x] [MatchMaking](https://nintendo-wiki.pretendo.network/docs/nex/protocols/match-making)
- [x] [Messaging](https://nintendo-wiki.pretendo.network/docs/nex/protocols/messaging)
- [x] [PersistentStore](https://nintendo-wiki.pretendo.network/docs/nex/protocols/persistent-store)
- [x] [AccountManagement](https://nintendo-wiki.pretendo.network/docs/nex/protocols/account-management)
- [ ] Competition
- [x] [MessageDelivery](https://nintendo-wiki.pretendo.network/docs/nex/protocols/message-delivery)
- [ ] ClientSettings
- [ ] [UbiAccountManagement](https://nintendo-wiki.pretendo.network/docs/nex/protocols/ubi-account-management)
- [ ] GeoLocalization
- [ ] [News](https://nintendo-wiki.pretendo.network/docs/nex/protocols/news)
- [ ] [Privileges](https://nintendo-wiki.pretendo.network/docs/nex/protocols/privileges)
- [ ] [Tracking3](https://nintendo-wiki.pretendo.network/docs/nex/protocols/tracking-3)
- [ ] [Localization](https://nintendo-wiki.pretendo.network/docs/nex/protocols/localization)
- [ ] [GameSession](https://nintendo-wiki.pretendo.network/docs/nex/protocols/game-session)
- [ ] SubAccountManagement
- [ ] IPToLocation
- [ ] IPToLocationAdmin
- [ ] UbiFriends
- [ ] SkillRating
- [ ] [UplayWin](https://nintendo-wiki.pretendo.network/docs/nex/protocols/uplay-win)
- [x] [MatchMakingExtension](https://nintendo-wiki.pretendo.network/docs/nex/protocols/match-making-ext)
- [ ] [TitleStorage](https://nintendo-wiki.pretendo.network/docs/nex/protocols/title-storage)
- [ ] [UserStorage](https://nintendo-wiki.pretendo.network/docs/nex/protocols/user-storage)
- [ ] [PlayerStats](https://nintendo-wiki.pretendo.network/docs/nex/protocols/player-stats)
- [ ] Spark
- [ ] [OfflineGameNotifications](https://nintendo-wiki.pretendo.network/docs/nex/protocols/offline-game-notifications)
- [ ] [UserAccountManagement](https://nintendo-wiki.pretendo.network/docs/nex/protocols/user-account-management)
- [ ] SiegeAdmin
- [x] [NintendoNotificationEvents](https://nintendo-wiki.pretendo.network/docs/nex/protocols/nintendo-notifications)
- [x] [Friends3DS](https://nintendo-wiki.pretendo.network/docs/nex/protocols/friends-3ds)
- [x] [FriendsWiiU](https://nintendo-wiki.pretendo.network/docs/nex/protocols/friends-wiiu)
- [x] [MatchmakeExtension](https://nintendo-wiki.pretendo.network/docs/nex/protocols/matchmake-extension)
- [x] [Utility](https://nintendo-wiki.pretendo.network/docs/nex/protocols/utility)
- [x] [StorageManager](https://nintendo-wiki.pretendo.network/docs/nex/protocols/storage-manager)
- [x] [Ranking](https://nintendo-wiki.pretendo.network/docs/nex/protocols/ranking)
- [x] [DataStore](https://nintendo-wiki.pretendo.network/docs/nex/protocols/datastore)
- [x] [Debug](https://nintendo-wiki.pretendo.network/docs/nex/protocols/debug)
- [x] [Subscription](https://nintendo-wiki.pretendo.network/docs/nex/protocols/subscription)
- [x] [Rating](https://nintendo-wiki.pretendo.network/docs/nex/protocols/rating)
- [x] [ServiceItem](https://nintendo-wiki.pretendo.network/docs/nex/protocols/service-item)
- [x] [MatchmakeReferee](https://nintendo-wiki.pretendo.network/docs/nex/protocols/matchmake-referee)
- [x] [Subscriber](https://nintendo-wiki.pretendo.network/docs/nex/protocols/subscriber)
- [x] [Ranking2](https://nintendo-wiki.pretendo.network/docs/nex/protocols/ranking-2)
- [x] [AAUser](https://nintendo-wiki.pretendo.network/docs/nex/protocols/aa-user)
- [x] [Screening](https://nintendo-wiki.pretendo.network/docs/nex/protocols/screening)
- [ ] [WebNotificationsStorage](https://nintendo-wiki.pretendo.network/docs/nex/protocols/web-notifications-storage)
- [ ] [TitleStorageAdmin](https://nintendo-wiki.pretendo.network/docs/nex/protocols/title-storage-admin)
- [ ] [UserStorageAdmin](https://nintendo-wiki.pretendo.network/docs/nex/protocols/user-storage-admin)
- [ ] [Dummy](https://nintendo-wiki.pretendo.network/docs/nex/protocols/dummy)
- [ ] [SecureConnectionInternal](https://nintendo-wiki.pretendo.network/docs/nex/protocols/secure-connection-internal)
- [ ] [NATTraversalReportInternal](https://nintendo-wiki.pretendo.network/docs/nex/protocols/nat-traversal-report-internal)
- [x] [Shop (Pokemon Bank)](https://nintendo-wiki.pretendo.network/docs/nex/protocols/shop)
- [x] [OLSStorage (Rayman Legends)](https://nintendo-wiki.pretendo.network/docs/nex/protocols/ols-storage)
- [x] [Tournament (Super Smash Bros. Ultimate)](https://nintendo-wiki.pretendo.network/docs/nex/protocols/tournament)

## Settings / Accounts
> [!WARNING]
> Older versions of this tool precomputed the Kerberos keys for each password. These precomputed keys are NOT usable in newer versions. Password files must now always contain the raw game server password for each PID.

In order to decrypt PRUDP packet payloads for the games secure server(s) your game server account credentials must be known by Pretendo Network Viewer. To add an account to the settings open one of the following JSON files:

- `%AppData%/NEXViewer/settings.json` (Windows)
- `~/.config/nex-viewer/settings.json` (Linux)
- `code /Users/<UserName>/Library/Application\ Support/nex-viewer/settings.json` (MacOS)

From here add an account entry to the `accounts` array. An account entry takes the following form:

```ts
{
	platform: string; // The platform the account is for (W ii U, 3DS, PC, etc.). Unused currently
	username: string; // Account username. For NEX accounts this is your account PID as a string
	pid: number; // Account unique PID
	password: string; // Account password. Must not be hashed. Used to generate the below hashes, and those for non-NEX game servers
	password_hash_old: string; // Pre-computed Kerberos key using the old key derivation method
	password_hash_new: string; // Pre-computed Kerberos key using the new key derivation method
}
```

> [!CAUTION]
DO NOT SHARE YOUR NEX PID AND PASSWORD WITH ANYBODY UNLESS YOU ABSOLUTELY KNOW WHAT YOU ARE DOING OR YOU DO NOT CARE ABOUT THE ACCOUNT. THIS PID/PASSWORD COMBINATION IS WHAT THE CONSOLE USES TO AUTHENTICATE YOU WHEN PLAYING ONLINE, NOT YOUR NNID USERNAME/PASSWORD. SHARING THESE DETAILS CAN ALLOW ANYONE TO LOGIN TO ANY GAME UNDER YOUR ACCOUNT.

## Obtaining NEX account details
NEX accounts are _**not**_ the same thing as NNIDs/NSO accounts. How you obtain your NEX account details depends on your system. See below for details.

## Obtaining NEX account details (Wii U)

There are 2 ways to obtain your NEX account details on a Wii U:

- Homebrew (can be unreliable)
- Proxy server (can be difficult to setup)

To use homebrew to obtain your NEX account details on Wii U, all you need is an FTP server homebrew (such as FTPiiU_Everywhere). Connect to your Wii U via FTP and navigate to `/storage_mlc/usr/save/system/act`. Here you will find folders for every account on your Wii U. Open each folder and then open the `account.dat` file in any text editor. Verify the account is the one you want to use by looking for your NNID user name (it will be labeled as `AccountId`). Once you have found the `account.dat` file for the account you want to use, find the `PrincipalId` and `NfsPassword` fields. If you do not see one of these fields, or if the field has no value, you _must_ use the proxy server method. The `PrincipalId` field is your NEX PID encoded as hexadecimal. Decode it back to decimal for use here (example: `68503904` decodes to `1750087940`). The `NfsPassword` field is your NEX password.

To use a proxy server to obtain your NEX account details on Wii U, you must first get a proxy server like Fiddler (Windows), Charles (all OSes) or mitmproxy (all OSes). Note: if using Fiddler, do not use Fiddler Everywhere, use the original Fiddler. Once installed you must either disable SSL verification on your console via homebrew or replace your systems SSL certificates with the proxy server certificates. Be warned that messing up replacing the SSL certficiates will brick your console (can be recovered). Here are guides for [Fiddler](https://www.reddit.com/r/WiiUHacks/comments/6zfck3/guide_setting_up_mitm_to_log_and_preserve_services/) and [Charles](https://www.reddit.com/r/WiiUHacks/comments/6zj67k/guide_wii_u_mitm_charles_edition/). Once connected to the proxy server on your Wii U look for the request to `https://account.nintendo.net/v1/api/provider/nex_token/@me`. Open the response to this request and locate the `pid` and `nex_password` fields. These are your NEX account details.

## Obtaining NEX account details (3DS)

Unlike the Wii U the 3DS does not request your NEX account details from any server. Instead it is stored on your console after the first time you connect to the friends server. The only way to obtain your 3DS NEX account details is to dump them with homebrew. Compile this [homebrew application](get_3ds_pid_password) and run it on your 3DS. It will create a `nex-keys.txt` file on the root of the SD card in the correct format already. The source code for the homebrew is [available here](https://github.com/Stary2001/nex-dissector/tree/master/get_3ds_pid_password).

## Obtaining NEX account details (Switch)

NEX account details are not required for traffic on the Nintendo Switch as there is no packet-level encryption. NEX account details are required in other versions in order to decrypt the session ticket to obtain the session key used to encrypt packet payloads, but NEX on the Nintendo Switch uses a [WebSocket Secure](https://en.wikipedia.org/wiki/WebSocket) connection rather than UDP, which relies on the encryption at the TLS layer rather than the application layer.

## Obtaining account details (other)

Pretendo Network Viewer supports standard [Quazal Rendez-Vous](http://web.archive.org/web/20090224012115/http://www.quazal.com/modules.php?op=modload&name=Sections&file=index&req=viewarticle&artid=116&page=1) connections as well. This means traffic from games such as Rayman Legends, Rock Band 1, 2 and 3, WATCH_DOGS, etc. are supported (though may require modifications to the viewer for any game-specific features). This is because Nintendo licensed Rendez-Vous from Quazal and only modified it slightly to create NEX, much of the underlying systems are identical (or at least broadly compatible). Ubisoft purchased Quazal in 2010, so many fo their games use the Rendez-Vous library.

This application is designed with this traffic in mind and tries it's best to support all possible games. Due to Quazal licensing it's Rendez-Vous software to many developers over time, the specifics on how you obtain the account details will vary. Due to Rendez-Vous' ability to be modified and extended (such as with the creation of NEX), some developers may have also made large changes to the protocols which are incompatible with other implementations. One such example is WATCH_DOGS, which changed the structure of RMC payloads. This application does a best attempt at supporting these changes, but it is possible that some changes are impossible to support cleanly along side other implementations. In those cases, a fork of Pretendo Network Viewer should be made.

## Using the NPLN Proxy

> [!CAUTION]
> Use at your own risk. While the proxy has been tested thoroughly, and no bans have occured from its use, Nintendo is much more cautious with NSO. Even irregularities such as the order of headers can trip their alarms. We are not responsible for anything that may happen to your console/NSO account when using this tool.

Pretendo Network Viewer implements a built-in gRPC/NPLN proxy server which can be used to capture traffic from NPLN games. It can be started and stopped from the application menu (under "Proxy") and it will listen on port 8080 by default, but it can be configured to listen to any port in the settings.

Before enabling the proxy on your console, you will need to make it trust the CA certificate, generated in the `proxy-ca` folder in the application data directory (Accessible by clicking "Open CA Certificate folder" in the "Proxy" menu) after the proxy has been started atleast once. To do this, you can use a tool like [network_mitm](https://github.com/nookingtons/network_mitm/).

Once the proxy has been set up, incoming gRPC/NPLN requests will automatically be parsed by the viewer and displayed in the packet list.

## Contributing

### Recommended IDE Setup
The recommended IDE for Pretendo Network Viewer is [VSCode](https://code.visualstudio.com/), using the following plugins:

- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [Better Comments Next](https://marketplace.visualstudio.com/items?itemName=EdwinHuiSH.better-comments-next)

### Install

```bash
$ git clone https://github.com/PretendoNetwork/nex-viewer
$ cd nex-viewer
$ npm install
```

### Running (`electron-vite`) (Recommended)
Run the app in development mode using `electron-vite`

```bash
$ npm run dev
```

### Running (`electron-forge`)
Run the app in development mode using `electron-forge`

```bash
$ npm start
```

### Build (`electron-vite`)
Build the app for distribution using `electron-vite`

```bash
$ npm run build
```

### Build (`electron-builder`)
Build the app for distribution using `electron-builder`

```bash
$ npm run build:win
$ npm run build:mac
$ npm run build:linux
```

### Build (`electron-forge`)
Build the app for distribution using `electron-forge`

```bash
$ npm run make
```
