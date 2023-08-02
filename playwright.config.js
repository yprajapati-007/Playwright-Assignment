// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 600 * 1000,
  expect: {
    timeout: 600000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    actionTimeout: 0,
    trace: 'on-first-retry',
    // Enable video recording for the 'chromium' project
    video: 'on',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          headless: true, // Run the browser in non-headless mode
        },
        // Enable video recording for the 'chromium' project
        video: 'on',
      },
    },
    // Other projects can be defined here...

  ],

  // Other configurations can be added here...

});
