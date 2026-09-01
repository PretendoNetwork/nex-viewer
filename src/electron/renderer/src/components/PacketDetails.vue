<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import SerializedField from '@renderer/components/SerializedField.vue';
import MonacoViewer from '@renderer/components/MonacoViewer.vue';
import { useClipboard } from '@renderer/composables/useClipboard';
import { toHexString } from '@renderer/assets/js/util';
import type { SerializedMessage } from '@/types/serialized-message';

const { copyToClipboard } = useClipboard();

const props = defineProps<{
	packet: SerializedMessage | null;
}>();

const activeTab = ref('overview');

function saveBytes(tabTitle: string, field: { name: string; bytes?: number[] }): void {
	if (!field.bytes) {
		return;
	}

	window.api.saveBytes(`${tabTitle}-${field.name}`.toLowerCase(), new Uint8Array(field.bytes));
}

const tabs = computed(() => {
	const t = [
		{
			id: 'overview',
			label: 'Overview'
		},
		{
			id: 'hex',
			label: 'Hex View'
		}
	];

	if (props.packet) {
		for (const tab of props.packet.serialized_tabs) {
			t.push({
				id: tab.title.toLowerCase().replace(/ /g, ''),
				label: tab.title
			});
		}

		if (props.packet.stack_trace) {
			t.push({
				id: 'stack_trace',
				label: 'Stack Trace'
			});
		}
	}

	return t;
});

watch(() => props.packet, () => {
	activeTab.value = 'overview';
});
</script>

<template>
	<div v-if="!packet" class="h-full flex items-center justify-center">
		<p class="text-[#9a9fa9]">Select a packet to view details</p>
	</div>

	<div v-else class="h-full flex flex-col overflow-hidden">
		<div class="pb-2 flex-shrink-0 p-4">
			<h3 class="text-lg font-semibold leading-none tracking-tight">Packet Details</h3>
		</div>

		<div class="flex-1 flex flex-col overflow-hidden">
			<div class="flex border-b border-[#2e3238] flex-shrink-0">
				<button v-for="tab in tabs" :key="tab.id" class="px-4 py-2 text-sm border-b-2 transition-colors" :class="activeTab === tab.id ? 'border-blue-500 text-[#F9FAFC]' : 'border-transparent text-[#9a9fa9] hover:text-[#F9FAFC]'" @click="activeTab = tab.id">
					{{ tab.label }}
				</button>
			</div>

			<div class="flex-1 overflow-auto p-4">
				<div v-show="activeTab === 'overview'">
					<div v-for="section in packet.overview_sections" :key="section.title.toLowerCase().replace(/ /g, '')">
						<div class="py-4">
							<h3 class="text-lg font-semibold border-b-2 border-[#2e3238] pb-1">
								{{ section.title }}
							</h3>
						</div>
						<div :class="`grid gap-4`" :style="`grid-template-columns: repeat(${section.columns}, minmax(0, 1fr))`">
							<div v-for="field in section.fields" :key="field.name">
								<h3 class="text-sm font-medium text-[#9a9fa9]">{{ field.name }}</h3>
								<p class="font-mono">{{ field.value }}</p>
							</div>
						</div>
					</div>
				</div>

				<div v-show="activeTab === 'hex'" class="font-mono text-xs">
					<div v-for="section in packet.hex_views" :key="section.title.toLowerCase().replace(/ /g, '')" class="mb-6 last:mb-0">
						<div class="flex items-center gap-2 mb-2">
							<div class="text-sm font-medium text-[#F9FAFC]">{{ section.title }}</div>
							<button class="text-xs text-[#9a9fa9] hover:text-[#F9FAFC] transition-colors cursor-pointer" @click="copyToClipboard($event, toHexString(section.bytes))">Copy hex</button>
						</div>
						<div v-for="(row, rowIndex) in Array.from({ length: Math.ceil(section.bytes.length / 16) }, (_, i) => section.bytes.slice(i * 16, i * 16 + 16))" :key="rowIndex" class="flex gap-4 mb-0.5">
							<span class="text-[#9a9fa9] w-10 flex-shrink-0">{{ (rowIndex * 16).toString(16).padStart(4, '0') }}</span>
							<span class="flex gap-1">
								<span v-for="(byte, byteIndex) in row" :key="byteIndex" class="w-5 text-center text-[#F9FAFC]">{{ byte.toString(16).padStart(2, '0') }}</span>
								<span v-for="i in (16 - row.length)" :key="`pad-${i}`" class="w-5" />
							</span>
							<span class="text-[#9a9fa9] flex-shrink-0">
								<span v-for="(byte, byteIndex) in row" :key="byteIndex">{{ byte >= 32 && byte <= 126 ? String.fromCharCode(byte) : '.' }}</span>
							</span>
						</div>
					</div>
				</div>

				<div v-for="tab in packet.serialized_tabs" v-show="activeTab === tab.title.toLowerCase().replace(/ /g, '')" :key="tab.title.toLowerCase().replace(/ /g, '')" class="font-mono text-xs">
					<div class="mb-4">
						<div class="text-lg font-medium">{{ tab.title }}</div>
						<div v-if="tab.subtitle" class="text-sm text-[#9a9fa9]">{{ tab.subtitle }}</div>
					</div>
					<div class="space-y-1">
						<template v-for="field in tab.fields" :key="field.name">
							<div v-if="field.language" class="mt-6 mb-2">
								<div class="flex items-center gap-2 mb-2">
									<div class="text-sm font-medium text-[#F9FAFC]">{{ field.name }}</div>
									<button v-if="field.bytes?.length" class="text-xs text-[#9a9fa9] hover:text-[#F9FAFC] transition-colors cursor-pointer" @click="saveBytes(tab.title, field)">Save to disk</button>
								</div>
								<MonacoViewer :value="String(field.data.__value)" :language="field.language" />
							</div>
							<SerializedField v-else :field-key="field.name" :field="field.data" :depth="0" />
						</template>
					</div>
				</div>

				<div v-show="activeTab === 'stack_trace' && packet.stack_trace" class="font-mono text-xs">
					<div class="mb-4">
						<div class="text-lg font-medium">Stack Trace</div>
					</div>
					<pre class="text-[#F9FAFC] whitespace-pre-wrap break-all">{{ packet.stack_trace }}</pre>
				</div>
			</div>
		</div>
	</div>
</template>
