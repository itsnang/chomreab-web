import { defineConfig } from '@playwright/test';

export default defineConfig({
	testDir: 'e2e',
	// Test the real prerendered output, not the dev server — this site ships as
	// static HTML and that is what should be asserted against.
	webServer: {
		command: 'npm run build && npm run preview -- --port 4173',
		port: 4173,
		reuseExistingServer: !process.env.CI
	},
	use: { baseURL: 'http://localhost:4173' }
});
