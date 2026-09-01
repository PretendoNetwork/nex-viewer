<script setup lang="ts">
import { ref, shallowRef, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import * as monaco from 'monaco-editor/editor';
import 'monaco-editor/features/register.all';
import 'monaco-editor/languages/register.all';

const MIN_HEIGHT = 80;
const MAX_HEIGHT = 480;

// * Monaco only ships with formatters for JSON, HTML and CSS. We have to add everything else ourselves
const FORMATTABLE_LANGUAGES = ['json', 'html', 'css'];

monaco.editor.defineTheme('network-viewer', {
	base: 'vs-dark',
	inherit: true,
	rules: [],
	colors: {
		'editor.background': '#121720'
	}
});

const props = defineProps<{
	value: string;
	language: string;
}>();

const container = ref<HTMLElement | null>(null);
const editor = shallowRef<monaco.editor.IStandaloneCodeEditor | null>(null);
const height = ref(MIN_HEIGHT);
const formatted = ref(false);
const canFormat = computed(() => FORMATTABLE_LANGUAGES.includes(props.language));

async function showFormatted(): Promise<void> {
	const instance = editor.value;

	if (!instance) {
		return;
	}

	// * Monaco needs the editor to be writeable to format it, so toggle it.
	// * This DOES create a bit of a race condition where the user COULD modify
	// * the contents while the formatting is happening, but idrc tbh
	instance.updateOptions({ readOnly: false });
	await instance.getAction('editor.action.formatDocument')?.run();
	instance.updateOptions({ readOnly: true });

	formatted.value = true;
}

function showRaw(): void {
	editor.value?.getModel()?.setValue(props.value);
	formatted.value = false;
}

onMounted(() => {
	if (!container.value) {
		return;
	}

	// * Disable as much editor functionality as possible. We only care about viewing text in a pretty way
	const instance = monaco.editor.create(container.value, {
		value: props.value,
		language: props.language,
		theme: 'network-viewer',
		readOnly: true,
		domReadOnly: true,
		contextmenu: false,
		renderLineHighlight: 'none',
		occurrencesHighlight: 'off',
		selectionHighlight: false,
		matchBrackets: 'never',
		minimap: {
			enabled: false
		},
		overviewRulerLanes: 0,
		overviewRulerBorder: false,
		hideCursorInOverviewRuler: true,
		scrollBeyondLastLine: false,
		automaticLayout: true,
		fontSize: 12,
		lineNumbersMinChars: 3,
		padding: {
			top: 8,
			bottom: 8
		},
		scrollbar: {
			alwaysConsumeMouseWheel: false
		}
	});

	instance.onDidContentSizeChange(() => {
		height.value = Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, instance.getContentHeight()));
	});

	editor.value = instance;
});

watch(() => [props.value, props.language], () => {
	const model = editor.value?.getModel();

	if (!model) {
		return;
	}

	model.setValue(props.value);
	monaco.editor.setModelLanguage(model, props.language);
	formatted.value = false;
});

onBeforeUnmount(() => {
	editor.value?.getModel()?.dispose();
	editor.value?.dispose();
});
</script>

<template>
	<div>
		<div v-if="canFormat" class="flex items-center gap-3 mb-2">
			<button class="text-xs transition-colors cursor-pointer" :class="formatted ? 'text-[#9a9fa9] hover:text-[#F9FAFC]' : 'text-blue-400'" @click="showRaw">Raw</button>
			<button class="text-xs transition-colors cursor-pointer" :class="formatted ? 'text-blue-400' : 'text-[#9a9fa9] hover:text-[#F9FAFC]'" @click="showFormatted">Formatted</button>
		</div>
		<div ref="container" class="rounded-md border border-[#2e3238] overflow-hidden" :style="{ height: `${height}px` }" />
	</div>
</template>
