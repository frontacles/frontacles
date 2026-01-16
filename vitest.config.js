import { cwd } from 'node:process'
import { loadEnv } from 'vite'
import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, cwd(), ['VITE_', 'VITEST_'])

  return ({
    test: {
      projects: [
        {
          test: {
            name: 'Node',
            include: ['src/**/**.test.js'],
            exclude: ['src/dom/**.test.js'],
            environment: 'node',
          },
        },
        {
          test: {
            name: 'Browser',
            include: ['src/dom/**.test.js'],
            // https://vitest.dev/config/browser/playwright
            browser: {
              enabled: true,
              provider: playwright({}),
              headless: true,
              screenshotFailures: env.VITEST_SCREENSHOT_FAILURES == 'true',
              instances: [
                { browser: 'chromium' },
                // { browser: 'firefox' },
                // { browser: 'webkit' },
              ],
            },
          },
        },
      ],
    },
  })
})
