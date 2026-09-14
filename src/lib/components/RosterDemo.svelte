<script lang="ts">
	import type { Status } from '$lib/types';
	import Mark from './Mark.svelte';
	import Bubble from './Bubble.svelte';

	type Student = { id: string; name: string; status: Status | null };

	let students = $state<Student[]>([
		{ id: 's1', name: 'Dara', status: null },
		{ id: 's2', name: 'Sokha', status: null },
		{ id: 's3', name: 'Chenda', status: null }
	]);

	/** The message a parent would actually receive — same wording the bot
	 *  sends in the product, not marketing paraphrase. */
	function messageFor(name: string, status: Status): string {
		if (status === 'absent') {
			return `${name} was marked absent today with no note on file.`;
		}
		const label = status === 'present' ? '✅ present' : '⏰ late';
		return `${name} was marked ${label} on ${today}.`;
	}

	/** Built from local parts rather than `toISOString()`, which formats in UTC
	 *  — east of Greenwich that renders yesterday's date all local morning,
	 *  on a page whose whole claim is that the parent hears *today*. */
	const now = new Date();
	const today = [
		now.getFullYear(),
		String(now.getMonth() + 1).padStart(2, '0'),
		String(now.getDate()).padStart(2, '0')
	].join('-');

	let sent = $derived(
		students
			.filter((s): s is Student & { status: Status } => s.status !== null)
			.map((s) => ({ id: s.id, text: messageFor(s.name, s.status) }))
	);

	let marked = $derived(students.filter((s) => s.status !== null).length);
</script>

<div class="demo">
	<div class="sheet">
		<header class="sheet-head">
			<span class="cls">Grade 3A</span>
			<span class="count" aria-live="polite">{marked}/3 marked</span>
		</header>

		<ul class="roster">
			{#each students as student (student.id)}
				<li>
					<span class="name">{student.name}</span>
					<Mark bind:value={student.status} label={student.name} />
				</li>
			{/each}
		</ul>
	</div>

	<div class="out" aria-live="polite">
		{#if sent.length === 0}
			<p class="hint">Mark someone — see what their parent gets.</p>
		{:else}
			{#each sent as message (message.id)}
				<Bubble text={message.text} />
			{/each}
		{/if}
	</div>
</div>

<style>
	.demo {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.sheet {
		background: var(--card);
		border: 1px solid var(--rule);
		border-radius: var(--radius);
		overflow: hidden;
	}

	.sheet-head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		padding: 0.75rem 1rem;
		border-bottom: 1px solid var(--rule);
	}

	.cls {
		font-weight: 800;
		font-size: 0.9375rem;
	}

	.count {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--ink-faint);
	}

	.roster {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.roster li {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 13rem);
		align-items: center;
		gap: 1rem;
		padding: 0.7rem 1rem;
	}

	.roster li + li {
		border-top: 1px solid var(--rule);
	}

	.name {
		font-weight: 700;
		font-size: 0.9375rem;
	}

	.out {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		min-height: 3.5rem;
	}

	.hint {
		font-size: 0.8125rem;
		color: var(--ink-faint);
		font-style: italic;
	}

	@media (max-width: 30rem) {
		.roster li {
			grid-template-columns: 1fr;
			gap: 0.5rem;
		}
	}
</style>
