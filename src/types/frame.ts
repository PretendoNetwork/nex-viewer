import type { EnhancedPacketBlock, SimplePacketBlock } from '@/types/pcapng-parser';
import type { Packet } from '@/types/pcap-parser';

type Frame = EnhancedPacketBlock | SimplePacketBlock | Packet;

export default Frame;