<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		tone,
		invert = false,
		pad = true,
		label
	}: {
		children: Snippet;
		/** Tints the band and colours its top rule, in the product's own signal
		 *  palette — the colour says which part of the day you are in. */
		tone?: 'present' | 'late' | 'absent' | 'primary';
		/** Full-strength brand colour with light type, for the one inverted
		 *  section on the page. */
		invert?: boolean;
		/** Off when the band's own children are cells that supply their padding. */
		pad?: boolean;
		/** Small caps eyebrow pinned to the content's top-left corner. */
		label?: string;
	} = $props();
</script>

<!-- One horizontal band of the sheet. The band itself runs the full width of
     the viewport, so its tint and its coloured rule reach both screen edges;
     only the content inside is held to the measure. The page is a stack of
     these with no outer frame, which is what keeps it from looking like a
     document floating on a desktop. -->
<section class="band" class:invert data-tone={tone}>
	<div class="inner" class:pad>
		{#if label}
			<span class="label">{label}</span>
		{/if}
		{@render children()}
	</div>
</section>

<style>
	.band {
		position: relative;
		border-bottom: 1px solid var(--rule);
	}

	.inner {
		position: relative;
		max-width: var(--measure);
		margin: 0 auto;
	}

	.inner.pad {
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

	.inner.pad:has(.label) {
		padding-top: 4rem;
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

	/* Carries the same dot texture as the figure plates, so the inverted band
	   reads as part of the document rather than a banner dropped on top. */
	.band.invert {
		background-color: var(--primary);
		color: var(--primary-ink);
		background-image: radial-gradient(hsl(0 0% 100% / 0.16) 1px, transparent 1px);
		background-size: 14px 14px;
		border-bottom-color: var(--primary);
	}

	@media (max-width: 48rem) {
		.inner.pad {
			padding: 2.5rem 1.25rem;
		}

		.label {
			left: 1.25rem;
		}
	}
</style>
