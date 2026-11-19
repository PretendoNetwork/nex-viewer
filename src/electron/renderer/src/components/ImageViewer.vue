<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue';

const props = defineProps<{
	bytes: number[];
	type: string;
}>();

const url = ref('');
const width = ref(0);
const height = ref(0);

function revoke(): void {
	if (url.value) {
		URL.revokeObjectURL(url.value);
	}
}

function load(): void {
	revoke();

	url.value = URL.createObjectURL(new Blob([new Uint8Array(props.bytes)], {
		type: props.type
	}));
}

function onLoad(event: Event): void {
	const image = event.target as HTMLImageElement;

	width.value = image.naturalWidth;
	height.value = image.naturalHeight;
}

watch(() => props.bytes, load, {
	immediate: true
});

onBeforeUnmount(revoke);
</script>

<template>
	<div>
		<div v-if="width !== 0" class="text-xs text-[#9a9fa9] mt-1 mb-1">{{ width }} x {{ height }} ({{ type }})</div>
		<div class="rounded-md border border-[#2e3238] bg-[#121720] flex items-center justify-center p-2 overflow-hidden">
			<img :src="url" draggable="false" class="max-w-full max-h-[480px] object-contain" @load="onLoad">
		</div>
	</div>
</template>
