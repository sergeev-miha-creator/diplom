import { defineConfig, devices } from '@playwright/test';



export default defineConfig({
  testDir: 'tests',
  timeout: 60000,
  retries: process.env.CI ? 2 : 0,
  
  use: {
    baseURL: 'https://realworld.qa.guru/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  
  reporter: [
        ['line'],
        ['html', { outputFolder: 'playwright-report' }],
        ['allure-playwright', {
            detail: true,
            resultsDir: "allure-results",
            suiteTitle: false
      }
        ]
    ]
});