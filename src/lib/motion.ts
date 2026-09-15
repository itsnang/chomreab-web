import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

/**
 * GSAP wiring for a prerendered page.
 *
 * Two rules hold everything here together:
 *
 * 1. **Animate *from*, never *to*.** Nothing is hidden in CSS. Elements are
 *    painted in their final state by the prerendered HTML, and GSAP moves them
 *    backwards and plays them forwards. If JavaScript never runs — it failed,
 *    it was blocked, the CDN was slow — the page is simply the finished page.
 *    Hiding with CSS and revealing with JS would make the content dependent on
 *    a script, on a site whose whole point is that it is static HTML.
 *
 * 2. **Reduced motion means no motion.** `prefers-reduced-motion` is checked
 *    before anything registers; when set, this module does nothing at all and
 *    the page stays in its finished state.
 */

let registered = false;

function prefersReducedMotion(): boolean {
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Registers ScrollTrigger once, on the client only. Calling this during
 *  prerender would touch `window` and break the build. */
function ensureRegistered() {
	if (registered) return;
	gsap.registerPlugin(ScrollTrigger);
	registered = true;
}

/**
 * Reveals an element (and optionally its children, staggered) as it scrolls in.
 * Returns a teardown function for the caller's `$effect` cleanup — without it,
 * ScrollTriggers survive component destruction and leak.
 */
export function revealOnScroll(
	node: HTMLElement,
	options: { stagger?: string; y?: number; duration?: number } = {}
): () => void {
	if (prefersReducedMotion()) return () => {};
	ensureRegistered();

	const { stagger, y = 18, duration = 0.55 } = options;
	const targets = stagger ? node.querySelectorAll<HTMLElement>(stagger) : [node];
	if (targets.length === 0) return () => {};

	const ctx = gsap.context(() => {
		gsap.from(targets, {
			opacity: 0,
			y,
			duration,
			ease: 'power2.out',
			stagger: stagger ? 0.08 : 0,
			scrollTrigger: {
				trigger: node,
				start: 'top 85%',
				once: true
			}
		});
	}, node);

	return () => ctx.revert();
}

/**
 * Counts a figure up to its final value as it scrolls into view. The element's
 * text already holds the final number, so this reads it, counts to it, and puts
 * it back — leaving the DOM exactly as it found it if anything goes wrong.
 */
export function countUp(node: HTMLElement): () => void {
	const final = node.textContent?.trim() ?? '';
	const target = Number(final);
	if (!Number.isFinite(target) || prefersReducedMotion()) return () => {};
	ensureRegistered();

	const ctx = gsap.context(() => {
		const counter = { value: 0 };
		gsap.to(counter, {
			value: target,
			duration: 1.1,
			ease: 'power1.out',
			scrollTrigger: { trigger: node, start: 'top 90%', once: true },
			onUpdate: () => {
				node.textContent = String(Math.round(counter.value));
			},
			onComplete: () => {
				node.textContent = final;
			}
		});
	}, node);

	return () => {
		ctx.revert();
		node.textContent = final;
	};
}

/**
 * Plays the Telegram thread as it actually happens — one message after another
 * — rather than dropping four bubbles in at once. This is the one animation on
 * the page that is arguing something: messages arrive over the course of a
 * morning, as the register is marked.
 */
export function playThread(node: HTMLElement, selector: string): () => void {
	if (prefersReducedMotion()) return () => {};
	ensureRegistered();

	const bubbles = node.querySelectorAll<HTMLElement>(selector);
	if (bubbles.length === 0) return () => {};

	const ctx = gsap.context(() => {
		gsap.from(bubbles, {
			opacity: 0,
			y: 14,
			scale: 0.98,
			transformOrigin: 'left bottom',
			duration: 0.4,
			ease: 'back.out(1.4)',
			stagger: 0.5,
			scrollTrigger: { trigger: node, start: 'top 75%', once: true }
		});
	}, node);

	return () => ctx.revert();
}
