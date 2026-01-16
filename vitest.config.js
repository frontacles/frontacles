import { cwd } from 'node:process'
import { loadEnv } from 'vite'
import { defineConfig } from 'vitest/config'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, cwd(), ['VITE_', 'VITEST_'])

  return ({
    test: {
      projects: [
        {
          test: {
            name: 'Node',
            include: ['src/**/**.test.js'],
            environment: 'node',
          },
        },
      ],
    },
  })
})
