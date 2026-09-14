<script lang="ts">
	let { text, time = 'now' }: { text: string; time?: string } = $props();
</script>

<!-- A parent's message. Deliberately plain: the point is that this arrives on a
     phone the parent already has, not that it looks like a designed product. -->
<div class="bubble">
	<p>{text}</p>
	<span class="time">{time}</span>
</div>

<style>
	.bubble {
		position: relative;
		max-width: 30rem;
		background: var(--card);
		border: 1px solid var(--rule);
		border-radius: 1rem 1rem 1rem 0.25rem;
		padding: 0.7rem 0.9rem 0.5rem;
		box-shadow: 0 1px 2px hsl(0 0% 6.3% / 0.05);
	}

	p {
		font-size: 0.9375rem;
		line-height: 1.45;
	}

	.time {
		display: block;
		margin-top: 0.15rem;
		font-family: var(--font-mono);
		font-size: 0.6875rem;
		color: var(--ink-faint);
	}
</style>
