<script lang="ts">
	let { size = 'md' }: { size?: 'md' | 'lg' } = $props();
</script>

<span class="wordmark" class:lg={size === 'lg'}>
	<span class="glyph" aria-hidden="true">C</span>
	<span>Chomreab</span>
</span>

<style>
	.wordmark {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		font-weight: 800;
		font-size: 1.0625rem;
		letter-spacing: -0.01em;
	}

	.glyph {
		display: grid;
		place-items: center;
		width: 1.75rem;
		height: 1.75rem;
		border-radius: 0.5rem;
		background: var(--primary);
		color: var(--primary-ink);
		font-size: 0.9375rem;
		font-weight: 800;
	}

	.lg .glyph {
		width: 2.25rem;
		height: 2.25rem;
		font-size: 1.1875rem;
	}

	.lg {
		font-size: 1.375rem;
	}
</style>
