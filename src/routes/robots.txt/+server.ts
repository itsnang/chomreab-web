import { SITE_URL } from '$lib/seo';

/** Generated rather than static for one reason: the `Sitemap:` directive must
 *  be an absolute URL — crawlers ignore a relative one — and the canonical
 *  origin is only known at build time. A hand-written file would hard-code a
 *  domain and go stale the day a custom domain is pointed at the site. */
export const prerender = true;

export function GET(): Response {
	const body = `# allow crawling everything by default
User-agent: *
Disallow:

Sitemap: ${SITE_URL}/sitemap.xml
`;
	return new Response(body, {
		headers: { 'Content-Type': 'text/plain' }
	});
}
