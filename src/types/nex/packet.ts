import type PRUDPPacketV0 from '@/nex/prudp-packetv0';
import type PRUDPPacketV1 from '@/nex/prudp-packetv1';
import type PRUDPPacketLite from '@/nex/prudp-packetLite';
import type RawRMCPacket from '@/nex/raw-rmc-packet';

type Packet = PRUDPPacketV0 | PRUDPPacketV1 | PRUDPPacketLite | RawRMCPacket;

export default Packet;
