import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('landing page', () => {
	test('states the offer and points the CTA at a real contact route', async ({ page }) => {
		await page.goto('/');

		await expect(page.getByRole('heading', { level: 1 })).toContainText('A teacher taps');

		// Two CTAs (header and closing section); both must actually go somewhere.
		const ctas = page.getByRole('link', { name: 'Book a demo' });
		await expect(ctas).toHaveCount(3);
		for (const href of await ctas.evaluateAll((els) => els.map((e) => e.getAttribute('href')))) {
			expect(href).toMatch(/^mailto:.+@.+/);
		}
	});

	test('marking a student produces the message their parent would receive', async ({ page }) => {
		await page.goto('/');

		// Nothing is claimed before the teacher does anything.
		await expect(page.getByText('Mark someone')).toBeVisible();

		const dara = page.getByRole('radiogroup', { name: 'Attendance for Dara' });
		await dara.getByRole('radio', { name: 'absent' }).click();

		await expect(page.getByText('Dara was marked absent today with no note on file.')).toBeVisible();
		await expect(page.getByText('1/3 marked')).toBeVisible();

		// A second student is independent of the first.
		const sokha = page.getByRole('radiogroup', { name: 'Attendance for Sokha' });
		await sokha.getByRole('radio', { name: 'late' }).click();

		await expect(page.getByText(/Sokha was marked ⏰ late on \d{4}-\d{2}-\d{2}\./)).toBeVisible();
		await expect(page.getByText('2/3 marked')).toBeVisible();
	});

	test('a mark can be changed, and only the latest one is shown', async ({ page }) => {
		await page.goto('/');

		const dara = page.getByRole('radiogroup', { name: 'Attendance for Dara' });
		await dara.getByRole('radio', { name: 'absent' }).click();
		await expect(page.getByText('Dara was marked absent today with no note on file.')).toBeVisible();

		await dara.getByRole('radio', { name: 'present' }).click();

		await expect(page.getByText(/Dara was marked ✅ present/)).toBeVisible();
		await expect(page.getByText('Dara was marked absent today with no note on file.')).toHaveCount(
			0
		);
		// Changing a mark is still one student marked, not two.
		await expect(page.getByText('1/3 marked')).toBeVisible();
	});

	// Audited with motion disabled: mid-flight GSAP tweens leave text at partial
	// opacity, which axe correctly reads as a contrast failure against whatever
	// is behind it. That makes the run non-deterministic and audits a state no
	// reader ever settles on. Reduced motion is also the state this must be
	// correct in, and motion.ts honours it by doing nothing at all.
	test.describe('with motion disabled', () => {
		test.use({ reducedMotion: 'reduce' });

		test('has no detectable accessibility violations', async ({ page }) => {
			await page.goto('/');
			const results = await new AxeBuilder({ page })
				.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
				.analyze();
			expect(results.violations).toEqual([]);
		});

		test('leaves every message visible rather than animating them in', async ({ page }) => {
			await page.goto('/');
			const bubbles = page.locator('.bubble');
			await expect(bubbles).toHaveCount(4);
			// Nothing is hidden in CSS, so with motion off the thread is simply
			// complete — no reader is left waiting on a tween that never runs.
			for (let i = 0; i < 4; i++) {
				await expect(bubbles.nth(i)).toHaveCSS('opacity', '1');
			}
		});
	});
});
