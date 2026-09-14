<script lang="ts">
	import type { Status } from '$lib/types';

	let {
		value = $bindable(null),
		label
	}: {
		value?: Status | null;
		label: string;
	} = $props();

	const options: Status[] = ['present', 'late', 'absent'];

	function choose(status: Status) {
		value = status;
	}
</script>

<!-- The same three-state control the teacher actually taps in the product,
     rebuilt rather than screenshotted. A radiogroup so it announces as one
     control with one answer, not three unrelated buttons. -->
<div class="mark" role="radiogroup" aria-label="Attendance for {label}">
	{#each options as option (option)}
		<button
			type="button"
			role="radio"
			aria-checked={value === option}
			class="seg"
			class:selected={value === option}
			data-status={option}
			onclick={() => choose(option)}
		>
			{option}
		</button>
	{/each}
</div>

<style>
	.mark {
		display: flex;
		gap: 0.25rem;
	}

	.seg {
		flex: 1;
		font: inherit;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.01em;
		text-transform: capitalize;
		padding: 0.4rem 0.5rem;
		border: 1px solid var(--rule-strong);
		border-radius: calc(var(--radius) * 0.55);
		background: var(--card);
		color: var(--ink-soft);
		cursor: pointer;
		transition:
			background 120ms ease,
			color 120ms ease,
			border-color 120ms ease;
	}

	.seg:hover:not(.selected) {
		border-color: var(--ink-faint);
		color: var(--ink);
	}

	.seg.selected[data-status='present'] {
		background: var(--present-muted);
		border-color: var(--present);
		color: var(--present);
	}

	.seg.selected[data-status='late'] {
		background: var(--late-muted);
		border-color: var(--late);
		color: var(--late);
	}

	.seg.selected[data-status='absent'] {
		background: var(--absent-muted);
		border-color: var(--absent);
		color: var(--absent);
	}
</style>
