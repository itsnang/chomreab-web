/** Everything a crawler or a chat client reads about this page, in one place —
 *  so the title in the tab, the title in a Telegram preview and the title in a
 *  search result cannot drift apart. */

/** Canonical origin, baked in by Vite at build time. See vite.config.ts. */
export const SITE_URL = __SITE_URL__;

export const TITLE = 'Chomreab — attendance that reaches the parent';

export const DESCRIPTION =
	'A teacher marks the register in three taps. The parent knows before the lesson ends. Attendance and parent notifications for schools and tutoring centres.';

export const OG_IMAGE = `${SITE_URL}/og.png`;

/** Read aloud by screen readers when the card is shared, and shown by clients
 *  that fail to load the image. Describes the card, not the product. */
export const OG_IMAGE_ALT =
	'Chomreab — a teacher taps three times, a parent knows before the lesson ends. Attendance for schools and tutoring centres.';

/** Schema.org description of the product itself. `SoftwareApplication` rather
 *  than `Organization`: what this page is about is the thing being sold, and
 *  there is no company to describe yet.
 *
 *  No `offers` block — there is no published price, and inventing one to
 *  satisfy a rich-result validator would be a lie to both Google and a reader. */
export const STRUCTURED_DATA = {
	'@context': 'https://schema.org',
	'@type': 'SoftwareApplication',
	name: 'Chomreab',
	applicationCategory: 'BusinessApplication',
	applicationSubCategory: 'School attendance',
	operatingSystem: 'Web',
	url: SITE_URL,
	image: OG_IMAGE,
	description: DESCRIPTION,
	featureList: [
		'Mark attendance on a phone in three taps',
		'Notify parents on Telegram the same minute',
		'Attendance history and per-student rates'
	]
};
