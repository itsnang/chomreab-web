<script lang="ts">
	import Row from '$lib/components/Row.svelte';
	import RosterDemo from '$lib/components/RosterDemo.svelte';
	import Bubble from '$lib/components/Bubble.svelte';
	import Wordmark from '$lib/components/Wordmark.svelte';

	const CONTACT = 'mailto:lorn.samnang.it@gmail.com?subject=Chomreab%20demo';

	const steps = [
		{
			n: '01',
			head: 'The teacher marks the register',
			body: 'Their classes for the day are already on screen. Three taps per student — present, late, absent — and a note if there is a reason worth recording. It works on the phone in their pocket.'
		},
		{
			n: '02',
			head: "The parent's phone buzzes",
			body: 'Not an app they have to install. A message in Telegram, which they already use, from the moment the teacher saves. Nothing is sent for a student left unmarked.'
		},
		{
			n: '03',
			head: 'The record keeps itself',
			body: 'Every mark, every correction, who made it and when. You can answer "was she here last Tuesday?" without anyone going through paper.'
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

<header class="top">
	<div class="top-inner">
		<Wordmark />
		<a class="top-cta" href={CONTACT}>Book a demo</a>
	</div>
</header>

<main>
	<!-- Hero -->
	<Row label="Today">
		<div class="hero">
			<div class="hero-copy">
				<h1>A teacher taps three times.<br />A parent knows before the lesson ends.</h1>
				<p class="sub">
					Chomreab is attendance for schools and tutoring centres in Cambodia. The register is
					marked on a phone, and the families who need to hear about it hear about it the same
					minute — on Telegram, which they already have.
				</p>
				<div class="cta-group">
					<a class="cta" href={CONTACT}>Book a demo</a>
					<span class="cta-note">No installation for parents. No app for them to forget.</span>
				</div>
			</div>
			<div class="hero-demo">
				<RosterDemo />
			</div>
		</div>
	</Row>

	<!-- The problem -->
	<Row n="00" label="Before">
		<div class="prose">
			<h2>Right now, the register is paper</h2>
			<p>
				It gets marked, it goes in a drawer, and it is accurate. That is not the problem. The
				problem is that nobody outside the room knows what it says.
			</p>
			<p>
				A parent finds out their child missed Tuesday when the month's sheet comes home, or when
				someone finds time to call, or not at all. By then the reason is gone — nobody remembers
				why, and there is nothing to ask about.
			</p>
		</div>
	</Row>

	<!-- How it works -->
	{#each steps as step (step.n)}
		<Row n={step.n} label="Step" tight>
			<div class="step">
				<h2>{step.head}</h2>
				<p>{step.body}</p>
			</div>
		</Row>
	{/each}

	<!-- The message -->
	<Row label="Sent">
		<div class="prose">
			<h2>What the parent actually gets</h2>
			<p class="lede">
				Plain messages, in the chat app they already have open. This is the whole parent-facing
				product — there is no account for them to make and no password for them to lose.
			</p>
			<div class="thread">
				<Bubble text="You're now linked to Sokha." time="7:02" />
				<Bubble text="Sokha was marked ✅ present on 2026-09-14." time="7:41" />
				<Bubble
					text="Sokha was marked absent today with no note on file."
					time="7:44"
				/>
				<Bubble
					text="Chenda was marked ⏰ late on 2026-09-14. Note: bus was held up at the market."
					time="7:46"
				/>
			</div>
			<p class="aside">
				A note the teacher adds travels with the message. That one line is usually the difference
				between a parent worrying and a parent knowing.
			</p>
		</div>
	</Row>

	<!-- Owner value -->
	<Row n="04" label="Office">
		<div class="prose">
			<h2>What you can see, as the person running the place</h2>
			<ul class="facts">
				<li>
					<span class="figure">Attendance rate</span>
					<span>across the last twenty days, per class and per student.</span>
				</li>
				<li>
					<span class="figure">Chronic absence</span>
					<span
						>surfaced before it becomes a conversation you are having too late — students with
						three or more unexplained absences.</span
					>
				</li>
				<li>
					<span class="figure">A full history</span>
					<span
						>of every change: what it was, what it became, who changed it, and when. Corrections
						are normal; losing track of them is not.</span
					>
				</li>
			</ul>
		</div>
	</Row>

	<!-- CTA -->
	<Row label="Next">
		<div class="close">
			<h2>Have a look at it with your own classes</h2>
			<p>
				Tell me roughly how many classes and students you have and I will set it up with your real
				timetable, so you are looking at your school rather than a demo account.
			</p>
			<a class="cta" href={CONTACT}>Book a demo</a>
		</div>
	</Row>
</main>

<footer>
	<div class="foot-inner">
		<Wordmark />
		<span class="foot-note">Attendance for schools and tutoring centres. Built in Cambodia.</span>
	</div>
</footer>

<style>
	.top {
		border-bottom: 1px solid var(--rule);
		position: sticky;
		top: 0;
		background: hsl(60 11.1% 96.5% / 0.88);
		backdrop-filter: blur(8px);
		z-index: 10;
	}

	.top-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		max-width: var(--measure);
		margin: 0 auto;
		padding: 0.85rem 1.5rem;
	}

	.top-cta {
		font-size: 0.8125rem;
		font-weight: 700;
		text-decoration: none;
		padding: 0.45rem 0.85rem;
		border: 1px solid var(--rule-strong);
		border-radius: calc(var(--radius) * 0.6);
		white-space: nowrap;
	}

	.top-cta:hover {
		border-color: var(--ink);
	}

	/* Hero ------------------------------------------------------------- */

	.hero {
		display: grid;
		grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
		gap: 3rem;
		align-items: start;
	}

	h1 {
		font-size: clamp(1.9rem, 4.2vw, 3rem);
		line-height: 1.08;
		letter-spacing: -0.028em;
		font-weight: 800;
		text-wrap: balance;
	}

	.sub {
		margin-top: 1.25rem;
		font-size: 1.0625rem;
		color: var(--ink-soft);
		max-width: 34rem;
	}

	.cta-group {
		margin-top: 1.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		align-items: flex-start;
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

	.cta-note {
		font-size: 0.8125rem;
		color: var(--ink-faint);
	}

	/* Prose ------------------------------------------------------------ */

	h2 {
		font-size: clamp(1.25rem, 2.2vw, 1.6rem);
		line-height: 1.2;
		letter-spacing: -0.02em;
		font-weight: 800;
		text-wrap: balance;
	}

	.prose,
	.step,
	.close {
		max-width: 42rem;
	}

	.prose p,
	.step p,
	.close p {
		margin-top: 0.85rem;
		color: var(--ink-soft);
	}

	.lede {
		font-size: 1.0625rem;
	}

	.aside {
		font-size: 0.9375rem;
	}

	.thread {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-top: 1.5rem;
	}

	.facts {
		list-style: none;
		margin: 1.25rem 0 0;
		padding: 0;
		display: flex;
		flex-direction: column;
	}

	.facts li {
		display: grid;
		grid-template-columns: minmax(0, 10rem) minmax(0, 1fr);
		gap: 0.25rem 1.5rem;
		padding: 0.9rem 0;
		color: var(--ink-soft);
		font-size: 0.9375rem;
	}

	.facts li + li {
		border-top: 1px solid var(--rule);
	}

	.figure {
		font-weight: 700;
		color: var(--ink);
	}

	.close .cta {
		margin-top: 1.5rem;
	}

	/* Footer ----------------------------------------------------------- */

	footer {
		border-top: 1px solid var(--rule);
	}

	.foot-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
		max-width: var(--measure);
		margin: 0 auto;
		padding: 2rem 1.5rem 3rem;
	}

	.foot-note {
		font-size: 0.8125rem;
		color: var(--ink-faint);
	}

	@media (max-width: 62rem) {
		.hero {
			grid-template-columns: 1fr;
			gap: 2.25rem;
		}
	}

	@media (max-width: 40rem) {
		.facts li {
			grid-template-columns: 1fr;
		}
	}
</style>
