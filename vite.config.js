import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { resolve } from 'path'

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {'$src': resolve('src')}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
