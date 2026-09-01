<script setup lang="ts">
import { ref, shallowRef, watch, onMounted, onBeforeUnmount } from 'vue';
import * as monaco from 'monaco-editor/editor';
import 'monaco-editor/features/register.all';
import 'monaco-editor/languages/register.all';

const MIN_HEIGHT = 80;
const MAX_HEIGHT = 480;

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
});

onBeforeUnmount(() => {
	editor.value?.getModel()?.dispose();
	editor.value?.dispose();
});
</script>

<template>
	<div ref="container" class="rounded-md border border-[#2e3238] overflow-hidden" :style="{ height: `${height}px` }" />
</template>
