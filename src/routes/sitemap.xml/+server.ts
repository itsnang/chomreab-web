import { SITE_URL } from '$lib/seo';

/** Prerendered to a static file at build time, like everything else here.
 *
 *  Written as a route rather than dropped in `static/` because the canonical
 *  origin is only known at build: a hand-written sitemap would hard-code a
 *  domain and quietly point at the wrong one the day a custom domain lands. */
export const prerender = true;

export function GET(): Response {
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<url>
		<loc>${SITE_URL}/</loc>
		<changefreq>monthly</changefreq>
		<priority>1.0</priority>
	</url>
</urlset>
`;
	return new Response(body, {
		headers: { 'Content-Type': 'application/xml' }
	});
}
