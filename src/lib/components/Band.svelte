<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		tone,
		pad = true,
		label
	}: {
		children: Snippet;
		/** Off when the band's own children are cells that supply their padding. */
		pad?: boolean;
		/** Small caps eyebrow pinned to the band's top-left corner. */
		label?: string;
		/** Tints the band and colours its top rule. The colours mean what they
		 *  mean everywhere else in the product — present, late, absent — so a
		 *  section inherits the sense of the state it is describing. */
		tone?: 'present' | 'late' | 'absent' | 'primary';
	} = $props();
</script>

<!-- One horizontal band of the sheet. The page is a stack of these, and the
     frame's left/right borders run behind them unbroken — which is what makes
     it read as one ruled document rather than a column of cards. -->
<section class="band" class:pad data-tone={tone}>
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

	/* The top rule carries the colour at full strength; the fill is a wash.
	   One saturated hairline reads more deliberately than a saturated block. */
	.band[data-tone]::before {
		content: '';
		position: absolute;
		inset: 0 0 auto;
		height: 2px;
	}

	.band[data-tone='present'] {
		background: var(--wash-present);
	}
	.band[data-tone='present']::before {
		background: var(--present);
	}

	.band[data-tone='late'] {
		background: var(--wash-late);
	}
	.band[data-tone='late']::before {
		background: var(--late);
	}

	.band[data-tone='absent'] {
		background: var(--wash-absent);
	}
	.band[data-tone='absent']::before {
		background: var(--absent);
	}

	.band[data-tone='primary'] {
		background: var(--wash-primary);
	}
	.band[data-tone='primary']::before {
		background: var(--primary);
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
