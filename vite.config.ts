import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// Everything here prerenders to plain HTML/CSS — there is no server,
			// no API, and no form endpoint. The demo CTA is a mailto: link.
			adapter: adapter({ fallback: undefined, strict: true })
		})
	]
});
