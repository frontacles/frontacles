import { expect, test } from 'vitest'
import { page } from 'vitest/browser'
import { createElement } from './test-utils/index.js'

test('Sample browser test', () => {
  const el = createElement('div', { 'data-testid': 'sample' })
  el.innerHTML = `Hello!`
  document.body.append(el)

  const locator = page.getByTestId('sample')

  expect(locator).toBeInTheDocument()
  expect(locator).toHaveAttribute('data-testid', 'sample')
})
