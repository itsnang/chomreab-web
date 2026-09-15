<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		cols = 3
	}: {
		children: Snippet;
		cols?: 2 | 3 | 4;
	} = $props();
</script>

<!-- A row of cells divided by hairlines — the register's columns. Dividers are
     drawn as cell borders rather than a grid gap so they meet the band's own
     rules exactly, with no stray pixel where the lines cross. -->
<div class="cells" data-cols={cols}>
	{@render children()}
</div>

<style>
	.cells {
		display: grid;
	}

	.cells[data-cols='2'] {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.cells[data-cols='3'] {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	.cells[data-cols='4'] {
		grid-template-columns: repeat(4, minmax(0, 1fr));
	}

	.cells > :global(*) {
		padding: 1.75rem 2rem;
		border-left: 1px solid var(--rule);
	}

	.cells > :global(*:first-child) {
		border-left: 0;
	}

	@media (max-width: 62rem) {
		.cells[data-cols='3'],
		.cells[data-cols='4'] {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.cells > :global(*:nth-child(odd)) {
			border-left: 0;
		}

		.cells > :global(*:nth-child(n + 3)) {
			border-top: 1px solid var(--rule);
		}
	}

	@media (max-width: 40rem) {
		.cells[data-cols='2'],
		.cells[data-cols='3'],
		.cells[data-cols='4'] {
			grid-template-columns: minmax(0, 1fr);
		}

		.cells > :global(*) {
			border-left: 0;
			padding: 1.5rem 1.25rem;
		}

		.cells > :global(*:not(:first-child)) {
			border-top: 1px solid var(--rule);
		}
	}
</style>
