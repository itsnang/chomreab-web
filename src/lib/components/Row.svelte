<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		n,
		label,
		children,
		tight = false
	}: {
		/** The mono numeral in the margin — the register's line number. */
		n?: string;
		/** Small caps label sitting under the numeral. */
		label?: string;
		children: Snippet;
		tight?: boolean;
	} = $props();
</script>

<!-- One ruled line of the register. Every section on the page is one of
     these, which is what keeps the left margin aligned all the way down. -->
<section class="row" class:tight>
	<div class="margin" aria-hidden="true">
		{#if n}<span class="n">{n}</span>{/if}
		{#if label}<span class="label">{label}</span>{/if}
	</div>
	<div class="body">
		{@render children()}
	</div>
</section>

<style>
	.row {
		display: grid;
		grid-template-columns: var(--margin-col) minmax(0, 1fr);
		gap: 0 1.5rem;
		max-width: var(--measure);
		margin: 0 auto;
		padding: 4.5rem 1.5rem 4.5rem 0;
		border-top: 1px solid var(--rule);
	}

	.row.tight {
		padding-top: 2.75rem;
		padding-bottom: 2.75rem;
	}

	.margin {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		padding-left: 1.5rem;
	}

	.n {
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		color: var(--ink-faint);
		font-variant-numeric: tabular-nums;
	}

	.label {
		font-size: 0.625rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--ink-faint);
	}

	@media (max-width: 48rem) {
		.row {
			grid-template-columns: 1fr;
			gap: 0.75rem;
			padding: 3rem 1.25rem;
		}

		.margin {
			flex-direction: row;
			align-items: baseline;
			gap: 0.6rem;
			padding-left: 0;
		}
	}
</style>
