import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

/** The canonical origin, baked in at build time.
 *
 *  Absolute URLs are not optional for social metadata: crawlers fetch og:image
 *  without a document to resolve a relative path against, so a relative one
 *  simply yields no preview. Since every page here is prerendered, the value
 *  has to be known at build rather than read in the browser.
 *
 *  Vercel sets VERCEL_PROJECT_PRODUCTION_URL itself, so a normal deploy needs
 *  no configuration. Set PUBLIC_SITE_URL to override it — which you want once
 *  a custom domain is pointed at the site, so previews cite the real domain
 *  rather than the *.vercel.app one. */
const siteUrl =
	process.env.PUBLIC_SITE_URL?.replace(/\/+$/, '') ??
	(process.env.VERCEL_PROJECT_PRODUCTION_URL
		? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
		: 'http://localhost:4173');

export default defineConfig({
	define: {
		__SITE_URL__: JSON.stringify(siteUrl)
	},
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
