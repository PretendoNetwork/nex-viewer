import { resolve } from 'node:path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
// @ts-expect-error - `@vitejs/plugin-vue` is installed but TypeScript says it can't find its types for some reason
import vue from '@vitejs/plugin-vue';
// @ts-expect-error - `@tailwindcss/vite` is installed but TypeScript says it can't find its types for some reason
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	main: {
		plugins: [
			externalizeDepsPlugin()
		],
		build: {
			rollupOptions: {
				input: resolve(__dirname, 'src/electron/main/index.ts')
			},
			outDir: 'dist/main',
			sourcemap: true
		},
		resolve: {
			alias: {
				'@': resolve(__dirname, 'src')
			}
		}
	},
	preload: {
		plugins: [
			externalizeDepsPlugin()
		],
		build: {
			rollupOptions: {
				input: resolve(__dirname, 'src/electron/preload/index.ts')
			},
			outDir: 'dist/preload',
			sourcemap: true
		}
	},
	renderer: {
		root: resolve(__dirname, 'src/electron/renderer'),
		optimizeDeps: {
			exclude: ['monaco-editor']
		},
		build: {
			rollupOptions: {
				input: resolve(__dirname, 'src/electron/renderer/index.html')
			},
			outDir: resolve(__dirname, 'dist/renderer'),
			sourcemap: true
		},
		plugins: [
			vue(),
			tailwindcss()
		],
		resolve: {
			alias: {
				'@': resolve(__dirname, 'src'),
				'@renderer': resolve(__dirname, 'src/electron/renderer/src')
			}
		}
	}
});
