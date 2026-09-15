<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		pad = true,
		label
	}: {
		children: Snippet;
		/** Off when the band's own children are cells that supply their padding. */
		pad?: boolean;
		/** Small caps eyebrow pinned to the band's top-left corner. */
		label?: string;
	} = $props();
</script>

<!-- One horizontal band of the sheet. The page is a stack of these, and the
     frame's left/right borders run behind them unbroken — which is what makes
     it read as one ruled document rather than a column of cards. -->
<section class="band" class:pad>
	{#if label}
		<span class="label">{label}</span>
	{/if}
	{@render children()}
</section>

<style>
	.band {
		position: relative;
		border-bottom: 1px solid var(--rule);
	}

	.band.pad {
		padding: 3.25rem 2rem;
	}

	.label {
		position: absolute;
		top: 0.85rem;
		left: 2rem;
		font-family: var(--font-mono);
		font-size: 0.625rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--ink-faint);
	}

	.band.pad:has(.label) {
		padding-top: 4rem;
	}

	@media (max-width: 48rem) {
		.band.pad {
			padding: 2.5rem 1.25rem;
		}

		.label {
			left: 1.25rem;
		}
	}
</style>
