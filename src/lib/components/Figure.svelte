<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		caption,
		live = false,
		children
	}: {
		/** Rendered in bracket notation, the way a plate is captioned in a
		 *  technical document — this page is a register, and a register has
		 *  figures rather than screenshots. */
		caption: string;
		live?: boolean;
		children: Snippet;
	} = $props();
</script>

<figure class="fig">
	<figcaption>
		<span class="cap">[ {caption} ]</span>
		{#if live}<span class="live">live</span>{/if}
	</figcaption>
	<div class="plate">
		{@render children()}
	</div>
</figure>

<style>
	.fig {
		margin: 0;
	}

	figcaption {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 0.7rem;
	}

	.cap {
		font-family: var(--font-mono);
		font-size: 0.6875rem;
		letter-spacing: 0.08em;
		color: var(--ink-faint);
	}

	.live {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		font-family: var(--font-mono);
		font-size: 0.625rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--present-text);
	}

	.live::before {
		content: "";
		width: 0.4rem;
		height: 0.4rem;
		border-radius: 50%;
		background: var(--present);
	}

	/* Crop marks. Four corner brackets drawn with borders on pseudo-elements
	   of two nested boxes — cheaper than four extra elements, and they sit
	   outside the plate so they never disturb its own layout. */
	.plate {
		position: relative;
		padding: 1rem;
		background-image: radial-gradient(var(--dot) 1px, transparent 1px);
		background-size: 12px 12px;
		background-position: -1px -1px;
	}

	.plate::before,
	.plate::after {
		content: "";
		position: absolute;
		width: 10px;
		height: 10px;
		border-color: var(--ink-faint);
		border-style: solid;
	}

	.plate::before {
		top: 0;
		left: 0;
		border-width: 1px 0 0 1px;
	}

	.plate::after {
		bottom: 0;
		right: 0;
		border-width: 0 1px 1px 0;
	}
</style>
