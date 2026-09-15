<script lang="ts">
	let { size = 'md' }: { size?: 'md' | 'lg' } = $props();
</script>

<!-- The mark takes its colour from the text around it, so the same markup
     serves the blue lockup on paper and the knocked-out white one on the
     inverted band. -->
<span class="wordmark" class:lg={size === 'lg'}>
	<svg class="mark" viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false">
		<path
			d="M17 51V30.5C17 22.2 23.7 15.5 32 15.5C40.3 15.5 47 22.2 47 30.5V51"
			stroke="currentColor"
			stroke-width="5"
			stroke-linecap="round"
		/>
		<path
			d="M27 34.5L31.5 39L37.5 28.5"
			stroke="currentColor"
			stroke-width="5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
	<span>Chomreab</span>
</span>

<style>
	.wordmark {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		font-weight: 800;
		font-size: 1.0625rem;
		letter-spacing: -0.01em;
	}

	.mark {
		width: 1.75rem;
		height: 1.75rem;
		flex: none;
		/* The arch sits a touch low in its own box; nudge it back onto the
		   wordmark's optical centre rather than its bounding-box centre. */
		margin-top: -0.06em;
	}

	.lg .mark {
		width: 2.25rem;
		height: 2.25rem;
	}

	.lg {
		font-size: 1.375rem;
	}
</style>
