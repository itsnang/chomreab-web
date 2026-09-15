<script lang="ts">
	import Band from '$lib/components/Band.svelte';
	import Cells from '$lib/components/Cells.svelte';
	import RosterDemo from '$lib/components/RosterDemo.svelte';
	import Bubble from '$lib/components/Bubble.svelte';
	import Wordmark from '$lib/components/Wordmark.svelte';
	import Figure from '$lib/components/Figure.svelte';
	import { revealOnScroll, countUp, playThread } from '$lib/motion';

	/* Motion is attached through effects rather than CSS classes so that the
	   page is complete without it — see the note in $lib/motion.ts. Each
	   effect returns GSAP's own teardown. */
	let factsEl = $state<HTMLElement | null>(null);
	let stepsEl = $state<HTMLElement | null>(null);
	let threadEl = $state<HTMLElement | null>(null);
	let ownerEl = $state<HTMLElement | null>(null);

	$effect(() => (factsEl ? revealOnScroll(factsEl, { stagger: '.fact' }) : undefined));
	$effect(() => (stepsEl ? revealOnScroll(stepsEl, { stagger: '.step' }) : undefined));
	$effect(() => (ownerEl ? revealOnScroll(ownerEl, { stagger: '.step' }) : undefined));
	$effect(() => (threadEl ? playThread(threadEl, '.bubble') : undefined));

	function counter(node: HTMLElement) {
		const stop = countUp(node);
		return { destroy: stop };
	}

	const CONTACT = 'mailto:lorn.samnang.it@gmail.com?subject=Chomreab%20demo';

	/* Facts about how the product works — deliberately not customer counts.
	   There are no customers yet, and inventing traction is the one thing a
	   page like this can do that can't be walked back. */
	const facts = [
		{ figure: '3', unit: 'taps', note: 'to mark one student — present, late or absent.' },
		{ figure: '0', unit: 'apps', note: 'for a parent to install. The message arrives in Telegram.' },
		{ figure: '20', unit: 'days', note: 'of attendance history behind every rate you see.' }
	];

	const steps = [
		{
			n: '01',
			head: 'The teacher marks',
			body: "Today's classes are already on screen. Three taps a student, and a note when there's a reason worth recording."
		},
		{
			n: '02',
			head: 'The parent hears',
			body: 'A Telegram message the moment the register is saved. Nothing is sent for a student left unmarked.'
		},
		{
			n: '03',
			head: 'The record keeps',
			body: 'Every mark and every correction, with who made it and when. Answerable months later.'
		}
	];

	const faqs = [
		{
			q: 'What if a parent does not use Telegram?',
			a: 'Then they will not receive messages, and the register still works exactly as it does today — attendance is recorded either way. In practice Telegram is already on almost every phone, which is why it was chosen over SMS, which costs money per message, or an app, which nobody would install.'
		},
		{
			q: 'How does a parent get connected?',
			a: 'You generate a code for their child and hand it over, or send them a link they tap once. There is no account for them to create and no password for them to lose.'
		},
		{
			q: 'Do teachers need training?',
			a: 'The register screen is a list of names and three buttons. If a teacher can use a phone, they can mark attendance. The parts that need explaining — adding students, generating codes — are yours, not theirs.'
		},
		{
			q: 'What happens when a teacher marks the wrong student?',
			a: 'They change it, and the correction is recorded alongside the original — what it was, what it became, who changed it, when. Nothing is quietly overwritten.'
		},
		{
			q: 'Can I try it with my own classes?',
			a: 'Yes — that is what a demo is. Tell me roughly how many classes and students you have and it gets set up with your real timetable, so you are looking at your school rather than sample data.'
		}
	];
</script>

<svelte:head>
	<title>Chomreab — attendance that reaches the parent</title>
	<meta
		name="description"
		content="A teacher marks the register in three taps. The parent knows before the lesson ends. Attendance and parent notifications for schools and tutoring centres."
	/>
</svelte:head>

<div class="frame">
	<header class="top">
		<div class="top-inner">
		<Wordmark />
		<nav>
			<a href="#how">How it works</a>
			<a href="#faq">Questions</a>
			<a class="top-cta" href={CONTACT}>Book a demo</a>
		</nav>
		</div>
	</header>

	<!-- Hero -->
	<Band pad={false}>
		<div class="hero">
			<div class="hero-copy">
				<p class="eyebrow">Attendance · Telegram</p>
				<h1>A teacher taps three times. A parent knows before the lesson ends.</h1>
				<p class="sub">
					Chomreab is attendance for schools and tutoring centres. The register is marked on a
					phone, and the families who need to hear about it hear about it the same minute — on
					Telegram, which they already have.
				</p>
				<div class="cta-group">
					<a class="cta" href={CONTACT}>Book a demo</a>
					<a class="cta-ghost" href="#how">See how it works</a>
				</div>
			</div>
			<div class="hero-demo">
				<Figure caption="Fig. 1 — today's register, Grade 3A" live>
					<RosterDemo />
				</Figure>
			</div>
		</div>
	</Band>

	<!-- Facts -->
	<Band pad={false} tone="primary">
		<div bind:this={factsEl}>
		<Cells cols={3}>
			{#each facts as fact (fact.unit)}
				<div class="fact">
					<p class="fig"><span use:counter>{fact.figure}</span>{fact.unit}</p>
					<p class="fig-note">{fact.note}</p>
				</div>
			{/each}
		</Cells>
		</div>
	</Band>

	<!-- Problem -->
	<Band label="Before" tone="absent">
		<div class="two">
			<h2>Right now, the register is paper</h2>
			<div class="prose">
				<p>
					It gets marked, it goes in a drawer, and it is accurate. That is not the problem. The
					problem is that nobody outside the room knows what it says.
				</p>
				<p>
					A parent finds out their child missed Tuesday when the month's sheet comes home, or when
					someone finds time to call, or not at all. By then the reason is gone — nobody remembers
					why, and there is nothing left to ask about.
				</p>
			</div>
		</div>
	</Band>

	<!-- How it works -->
	<div id="how">
		<Band pad={false}>
			<div bind:this={stepsEl}>
			<Cells cols={3}>
				{#each steps as step (step.n)}
					<div class="step">
						<p class="step-n">{step.n}</p>
						<h3>{step.head}</h3>
						<p>{step.body}</p>
					</div>
				{/each}
			</Cells>
			</div>
		</Band>
	</div>

	<!-- The message -->
	<Band label="Sent" tone="present">
		<div class="two">
			<div>
				<h2>What the parent actually gets</h2>
				<div class="prose">
					<p>
						Plain messages, in the chat app they already have open. This is the whole
						parent-facing product — no account to make, no password to lose.
					</p>
					<p>
						A note the teacher adds travels with the message. That one line is usually the
						difference between a parent worrying and a parent knowing.
					</p>
				</div>
			</div>
			<Figure caption="Fig. 2 — one parent's morning">
			<div class="thread" bind:this={threadEl}>
				<Bubble text="You're now linked to Sokha." time="07:02" />
				<Bubble text="Sokha was marked ✅ present on 2026-09-15." time="07:41" />
				<Bubble text="Sokha was marked absent today with no note on file." time="07:44" />
				<Bubble
					text="Chenda was marked ⏰ late on 2026-09-15. Note: bus was held up at the market."
					time="07:46"
				/>
			</div>
			</Figure>
		</div>
	</Band>

	<!-- Owner -->
	<Band label="Office">
		<h2 class="wide">What you can see, as the person running the place</h2>
	</Band>
	<Band pad={false}>
		<div bind:this={ownerEl}>
		<Cells cols={3}>
			<div class="step">
				<h3 class="present">Attendance rate</h3>
				<p>Across the last twenty days, per class and per student.</p>
			</div>
			<div class="step">
				<h3 class="late">Chronic absence</h3>
				<p>
					Students with three or more unexplained absences, surfaced before it becomes a
					conversation you are having too late.
				</p>
			</div>
			<div class="step">
				<h3 class="absent">A full history</h3>
				<p>
					Every change: what it was, what it became, who changed it, when. Corrections are normal;
					losing track of them is not.
				</p>
			</div>
		</Cells>
		</div>
	</Band>

	<!-- FAQ -->
	<div id="faq">
		<Band label="Questions">
			<h2 class="wide">Things owners ask</h2>
			<div class="faq">
				{#each faqs as faq (faq.q)}
					<details>
						<summary>{faq.q}</summary>
						<p>{faq.a}</p>
					</details>
				{/each}
			</div>
		</Band>
	</div>

	<!-- Close -->
	<Band invert>
		<div class="close">
			<h2>Have a look at it with your own classes</h2>
			<p>
				Tell me roughly how many classes and students you have and it gets set up with your real
				timetable — so you are looking at your school, not a demo account.
			</p>
			<a class="cta-invert" href={CONTACT}>Book a demo</a>
		</div>
	</Band>

	<footer>
		<div class="foot-inner">
			<Wordmark />
			<span class="foot-note">Attendance for schools and tutoring centres.</span>
		</div>
	</footer>
</div>

<style>
	/* No outer frame: every band spans the viewport and only its content is
	   held to the measure, so tints and coloured rules reach both edges. */
	.frame {
		min-height: 100vh;
	}

	.top {
		border-bottom: 1px solid var(--rule);
		position: sticky;
		top: 0;
		background: var(--paper);
		z-index: 10;
	}

	.top-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		max-width: var(--measure);
		margin: 0 auto;
		padding: 1rem 2rem;
	}

	nav {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		font-size: 0.8125rem;
		font-weight: 500;
	}

	nav a {
		text-decoration: none;
		color: var(--ink-soft);
	}

	nav a:hover {
		color: var(--ink);
	}

	.top-cta {
		font-weight: 700;
		color: var(--ink) !important;
		padding: 0.4rem 0.8rem;
		border: 1px solid var(--rule-strong);
		border-radius: calc(var(--radius) * 0.6);
	}

	.top-cta:hover {
		border-color: var(--ink);
	}

	/* Hero -------------------------------------------------------------- */

	.hero {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 0.92fr);
	}

	.hero-copy {
		padding: 3.5rem 2rem 3.5rem;
	}

	.hero-demo {
		padding: 3.5rem 2rem;
		border-left: 1px solid var(--rule);
		background: hsl(60 11.1% 94.5%);
	}

	.eyebrow {
		font-family: var(--font-mono);
		font-size: 0.6875rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--primary);
		margin-bottom: 1.1rem;
	}

	h1 {
		font-size: clamp(2rem, 3.6vw, 2.9rem);
		line-height: 1.06;
		letter-spacing: -0.032em;
		font-weight: 800;
		text-wrap: balance;
	}

	.sub {
		margin-top: 1.15rem;
		font-size: 1rem;
		color: var(--ink-soft);
		max-width: 32rem;
	}

	.cta-group {
		margin-top: 1.75rem;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.cta {
		display: inline-block;
		background: var(--primary);
		color: var(--primary-ink);
		text-decoration: none;
		font-weight: 700;
		font-size: 0.9375rem;
		padding: 0.7rem 1.25rem;
		border-radius: calc(var(--radius) * 0.7);
	}

	.cta:hover {
		background: hsl(210 100% 34%);
	}

	.cta-ghost {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--ink-soft);
		text-decoration: none;
		border-bottom: 1px solid var(--rule-strong);
		padding-bottom: 1px;
	}

	.cta-ghost:hover {
		color: var(--ink);
		border-color: var(--ink);
	}

	/* Facts ------------------------------------------------------------- */

	.fig {
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		color: var(--ink-faint);
		display: flex;
		align-items: baseline;
		gap: 0.4rem;
	}

	.fig span {
		font-size: 2.5rem;
		font-weight: 600;
		color: var(--ink);
		letter-spacing: -0.03em;
	}

	.fig-note {
		margin-top: 0.4rem;
		font-size: 0.875rem;
		color: var(--ink-soft);
	}

	/* Bands ------------------------------------------------------------- */

	.two {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
		gap: 3rem;
		align-items: start;
	}

	h2 {
		font-size: clamp(1.3rem, 2.1vw, 1.75rem);
		line-height: 1.16;
		letter-spacing: -0.022em;
		font-weight: 800;
		text-wrap: balance;
	}

	h2.wide {
		max-width: 34rem;
	}

	h3 {
		font-size: 1rem;
		font-weight: 800;
		letter-spacing: -0.012em;
	}

	.prose p,
	.step p,
	.close p {
		margin-top: 0.8rem;
		color: var(--ink-soft);
		font-size: 0.9375rem;
	}

	.prose p:first-child {
		margin-top: 0;
	}

	.step-n {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--ink-faint);
		margin-bottom: 0.75rem;
	}

	h3.present {
		color: var(--present-text);
	}
	h3.late {
		color: var(--late-text);
	}
	h3.absent {
		color: var(--absent-text);
	}

	.thread {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	/* FAQ --------------------------------------------------------------- */

	.faq {
		margin-top: 1.75rem;
		border-top: 1px solid var(--rule);
	}

	details {
		border-bottom: 1px solid var(--rule);
	}

	summary {
		cursor: pointer;
		padding: 0.95rem 0;
		font-weight: 700;
		font-size: 0.9375rem;
		list-style: none;
		display: flex;
		justify-content: space-between;
		gap: 1rem;
	}

	summary::-webkit-details-marker {
		display: none;
	}

	summary::after {
		content: '+';
		font-family: var(--font-mono);
		color: var(--ink-faint);
		font-weight: 500;
	}

	details[open] summary::after {
		content: '−';
	}

	details p {
		padding-bottom: 1.1rem;
		margin: 0;
		max-width: 44rem;
		color: var(--ink-soft);
		font-size: 0.9375rem;
	}

	.close h2 {
		max-width: 22ch;
	}

	.close p {
		color: hsl(0 0% 100% / 0.82);
		max-width: 42ch;
	}

	.cta-invert {
		display: inline-block;
		margin-top: 1.5rem;
		background: var(--paper);
		color: var(--primary);
		text-decoration: none;
		font-weight: 700;
		font-size: 0.9375rem;
		padding: 0.7rem 1.25rem;
		border-radius: calc(var(--radius) * 0.7);
	}

	.cta-invert:hover {
		background: var(--card);
	}

	/* Footer ------------------------------------------------------------ */

	.foot-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
		max-width: var(--measure);
		margin: 0 auto;
		padding: 1.75rem 2rem 2.5rem;
	}

	.foot-note {
		font-size: 0.8125rem;
		color: var(--ink-faint);
	}

	@media (max-width: 62rem) {
		.hero,
		.two {
			grid-template-columns: 1fr;
			gap: 0;
		}

		.hero-demo {
			border-left: 0;
			border-top: 1px solid var(--rule);
		}

		.two {
			gap: 1.75rem;
		}
	}

	@media (max-width: 48rem) {
		.top-inner,
		.foot-inner {
			padding-left: 1.25rem;
			padding-right: 1.25rem;
		}

		.hero-copy,
		.hero-demo {
			padding: 2.5rem 1.25rem;
		}

		nav a:not(.top-cta) {
			display: none;
		}
	}
</style>
