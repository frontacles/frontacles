import { describe, expect, test } from 'vitest'
import { page } from 'vitest/browser'
import { setAttributes } from './index.js'
import { createElement, createElementNS } from './test-utils/index.js'

describe('dom/setAttributes', () => {
  const el = createElement('div', { 'data-testid': 'el-1' })
  const elTwo = createElement('div', { 'data-testid': 'el-2' })

  const svg = createElementNS('svg', 'svg', { 'data-testid': 'svg-1' })
  const svgTwo = createElementNS('svg', 'svg', { 'data-testid': 'svg-2' })

  const svgSpritesheet = `
    <svg style="display: none;">
      <symbol id="mastodon-path" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 24" fill="currentColor" fill-rule="evenodd">
          <path d="M15.68 18.293c2.954-.359 5.528-2.213 5.85-3.905h.002c.509-2.667.467-6.509.467-6.509 0-5.206-3.352-6.732-3.352-6.732C16.956.357 14.054.025 11.039 0h-.075C7.95.025 5.05.357 3.358 1.147c0 0-3.352 1.526-3.352 6.732l-.003.998c-.005.959-.01 2.022.018 3.132.122 5.09.918 10.108 5.543 11.356 2.133.574 3.965.695 5.44.612 2.675-.152 4.176-.972 4.176-.972l-.088-1.974s-1.913.613-4.058.538c-2.127-.074-4.373-.234-4.717-2.89a5.587 5.587 0 01-.047-.745s2.088.518 4.733.642c1.618.076 3.136-.097 4.676-.283zm2.365-3.705V8.284c0-1.29-.323-2.313-.97-3.07-.668-.758-1.542-1.146-2.628-1.146-1.256 0-2.207.49-2.836 1.473l-.612 1.043-.61-1.043c-.63-.982-1.58-1.473-2.836-1.473-1.086 0-1.962.388-2.628 1.146-.648.757-.971 1.78-.971 3.07v6.304h2.455v-6.12c0-1.289.533-1.944 1.6-1.944 1.18 0 1.77.777 1.77 2.312v3.35h2.44v-3.35c0-1.536.592-2.312 1.772-2.312 1.066 0 1.6.655 1.6 1.945v6.119h2.454z"/>
      </symbol>

      <!-- https://boxicons.com/ -->
      <symbol id="code-path" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.3 6.3L2.6 12l5.7 5.7 1.4-1.4L5.4 12l4.3-4.3zm7.4 11.4l5.7-5.7-5.7-5.7-1.4 1.4 4.3 4.3-4.3 4.3z"/>
      </symbol>
  </svg>`

  document.body.append(el, elTwo, svg, svgTwo)
  document.body.insertAdjacentHTML('beforeend', svgSpritesheet)

  const locator = page.getByTestId('el-1')
  const locatorTwo = page.getByTestId('el-2')
  const collection = document.getElementsByTagName('div')

  const locatorSvg = page.getByTestId('svg-1')
  const locatorSvgTwo = page.getByTestId('svg-2')
  const svgCollection = document.getElementsByTagName('svg')
  const symbols = document.getElementsByTagName('symbol')

  test('DOM setup is ready', () => {
    expect(locator).toBeInTheDocument()
    expect(locator.element()).toBeInstanceOf(HTMLElement)
    expect(locatorTwo).toBeInTheDocument()
    expect(collection).toBeInstanceOf(HTMLCollection)
    expect(collection).toHaveLength(2)

    expect(locatorSvg).toBeInTheDocument()
    expect(locatorSvg.element()).toBeInstanceOf(SVGElement)
    expect(locatorSvgTwo).toBeInTheDocument()
    expect(svgCollection).toBeInstanceOf(HTMLCollection)
    expect(svgCollection).toHaveLength(3)
    expect(symbols).toBeInstanceOf(HTMLCollection)
    expect(symbols).toHaveLength(2)
  })

  test('setAttributes is a function', () => expect(setAttributes).toBeInstanceOf(Function))

  /** Empty or wrong parameters. */

  test('setAttributes() throws', () => expect(() => setAttributes()).toThrow(TypeError))
  test('setAttributes(el) does not throw', () => expect(() => setAttributes(el)).not.toThrow(TypeError))

  /** Various type of attribute values on one element. */

  // <div attr="word">
  test("adds attribute with { attr: 'word' }", () => {
    setAttributes(el, { attr: 'word' })
    expect(locator).toHaveAttribute('attr', 'word')
  })

  // <div attr="1">
  test('adds attribute with { attr: 1 }', () => {
    setAttributes(el, { attr: 1 })
    expect(locator).toHaveAttribute('attr', '1')
  })

  // <div attr="0">
  test('adds attribute with { attr: 0 }', () => {
    setAttributes(el, { attr: 0 })
    expect(locator).toHaveAttribute('attr', '0')
  })

  // <div attr="1.5">
  test('adds attribute with { attr: -1.5 }', () => {
    setAttributes(el, { attr: -1.5 })
    expect(locator).toHaveAttribute('attr', '-1.5')
  })

  // <div attr="true">
  test("adds attribute with { attr: 'true' }", () => {
    setAttributes(el, { attr: 'true' })
    expect(locator).toHaveAttribute('attr', 'true')
  })

  // <div attr="false">
  test("adds attribute with { attr: 'false' }", () => {
    setAttributes(el, { attr: 'false' })
    expect(locator).toHaveAttribute('attr', 'false')
  })

  // <div attr="">
  test('adds attribute with { attr: true }', () => {
    setAttributes(el, { attr: true })
    expect(locator).toHaveAttribute('attr', '')
  })

  test('removes attribute with { attr: false }', () => {
    setAttributes(el, { attr: false })
    expect(locator).not.toHaveAttribute('attr')
  })

  test('removes attribute with { attr: undefined }', () => {
    setAttributes(el, { attr: 1 })
    setAttributes(el, { attr: undefined })
    expect(locator).not.toHaveAttribute('attr')
  })

  test('removes attribute with { attr: null }', () => {
    setAttributes(el, { attr: 1 })
    setAttributes(el, { attr: null })
    expect(locator).not.toHaveAttribute('attr')
  })

  // <div data-attr="hi">
  test(`adds attribute with { 'data-attr': 'hi' }`, () => {
    setAttributes(el, { attr: 1 })
    setAttributes(el, { 'data-attr': 'hi' })
    expect(el.dataset.attr).toBe('hi')
  })

  /* Objects, `class`, `data-` and `style` */

  // <div aria-label="Win" aria-pressed="true">` (set `aria-*`)
  test('adds `aria-*` attributes with { aria: {/* attributes */}}', () => {
    setAttributes(el, {
      aria: {
        hidden: false,
        pressed: 'true',
        label: 'Win',
      },
    })

    expect(locator).not.toHaveAttribute('aria-hidden')
    expect(locator).toHaveAttribute('aria-pressed', 'true')
    expect(locator).toHaveAttribute('aria-label', 'Win')
  })

  // <div data-attr="hi" data-attr="two">` (dataset)
  test('adds `data-*` attributes with { data: {/* attributes */}}', () => {
    setAttributes(el, {
      data: {
        attr: 'hi',
        two: 'two',
        null: null,
        nullStr: 'null',
        undefined: undefined,
        undefinedStr: 'undefined',
      },
    })

    expect(el.dataset.attr).toBe('hi')
    expect(el.dataset.two).toBe('two')
    expect(el.dataset).not.toHaveProperty('null')
    expect(el.dataset).not.toHaveProperty('undefined')
    expect(el.dataset.nullStr).toBe('null')
    expect(el.dataset.undefinedStr).toBe('undefined')
  })

  // <div data="not an object">
  test("adds `data` attribute with { data: 'not an object' }", () => {
    setAttributes(el, { data: 'not an object' })
    expect(locator).toHaveAttribute('data', 'not an object')
  })

  test('handles CSS classes with { class: /* string or object */', () => {

    // should add
    setAttributes(el, { class: { btn: true, 'btn--secondary': true }})
    setAttributes(el, { class: ['card__btn'] })
    setAttributes(el, { class: 'card__btn--special' })
    setAttributes(el, { class: 'card__btn--1 card__btn--2' })
    expect(locator).toHaveClass('btn', 'btn--secondary', 'card__btn', 'card__btn--special', 'card__btn--1', 'card__btn--2')

    // should remove
    setAttributes(el, { class: { 'btn--secondary': false }})
    expect(locator).not.toHaveClass('btn--secondary')
  })

  // <div style="color: red; opacity: 0.9">` (inline styles)
  test(`adds inline CSS with { style: { color: 'red', opacity: .9 }}`, () => {
    setAttributes(el, { style: { color: 'red', opacity: .9 }})
    expect(el.style.color).toBe('red')
    expect(el.style.opacity).toBe('0.9')

    setAttributes(el, { style: {
      color: undefined, // invalid value, ignored
      opacity: null // remove property
    }})
    expect(el.style.color).toBe('red')
    expect(el.style.opacity).toBe('')
  })

  // <div style="color: red; opacity: .9">` (inline styles
  test(`adds inline CSS with { style: 'color: red; opacity: .9' }`, () => {
    setAttributes(el, { style: 'color: red; opacity: .9' })
    expect(el.style.color).toBe('red')
    expect(el.style.opacity).toBe('0.9')

    setAttributes(el, { style: {
      color: undefined, // invalid value, ignored
      opacity: null // remove property
    }})
    expect(el.style.color).toBe('red')
    expect(el.style.opacity).toBe('')
  })

  // <div fn="() => 1 + 'a'">
  test(`stringify function with { fn: () => 1 + 'a' }`, () => {
    setAttributes(el, { fn: () => 1 + 'a' })

    // please don’t use `eval` in your projects
    const fn = eval(el.getAttribute('fn'))
    expect(fn()).toBe('1a')
  })

  /** On multiple elements. */

  test(`runs on an array of elements`, () => {
    setAttributes([el, elTwo], { attr: 'same' })

    expect(locator).toHaveAttribute('attr', 'same')
    expect(locatorTwo).toHaveAttribute('attr', 'same')
  })

  test(`runs on a HTML collection`, () => {
    setAttributes(collection, { attr: 'same same' })

    expect(locator).toHaveAttribute('attr', 'same same')
    expect(locatorTwo).toHaveAttribute('attr', 'same same')
  })

  test(`set and unset all kinds of attributes on a HTML collection`, () => {
    setAttributes(collection, {
      data: { name: 'Hakim' },
      aria: { label: 'Hello, Hakim!' },
      word: 'yes',
    })

    expect(el.dataset.name).toBe('Hakim')
    expect(elTwo.dataset.name).toBe('Hakim')
    expect(locator).toHaveAttribute('aria-label', 'Hello, Hakim!')
    expect(locatorTwo).toHaveAttribute('aria-label', 'Hello, Hakim!')
    expect(locator).toHaveAttribute('word', 'yes')
    expect(locatorTwo).toHaveAttribute('word', 'yes')

    // remove attributes

    setAttributes(collection, {
      data: { name: null },
      aria: { label: undefined },
      word: false,
    })

    expect(el.dataset).not.toHaveProperty('name')
    expect(elTwo.dataset).not.toHaveProperty('name')
    expect(locator).not.toHaveAttribute('aria-label')
    expect(locatorTwo).not.toHaveAttribute('aria-label')
    expect(locator).not.toHaveAttribute('word')
    expect(locatorTwo).not.toHaveAttribute('word')
  })

  /** Return value */

  test('setAttributes returns the provided element(s)', () => {
    expect(setAttributes(el, {})).toBe(el)
    expect(setAttributes(collection, {})).toBe(collection)
  })

  /** SVGs */

  test('adds attributes on <svg>', () => {
    setAttributes(svg, { attr: 'word' })
    expect(locatorSvg).toHaveAttribute('attr', 'word')

    setAttributes(svg, { attr: false })
    expect(locatorSvg).not.toHaveAttribute('attr')
  })

  test('handles CSS classes on `<svg>` with { class: /* string or object */', () => {

    // should add
    setAttributes(svg, { class: { btn: true, 'btn--secondary': true }})
    setAttributes(svg, { class: ['card__btn'] })
    setAttributes(svg, { class: 'card__btn--special' })
    setAttributes(svg, { class: 'card__btn--1 card__btn--2' })
    expect(locatorSvg).toHaveClass('btn', 'btn--secondary', 'card__btn', 'card__btn--special', 'card__btn--1', 'card__btn--2')

    // should remove
    setAttributes(svg, { class: { 'btn--secondary': false }})
    expect(locatorSvg).not.toHaveClass('btn--secondary')
  })

  test(`set and unset all kinds of attributes on a HTML collection of <svg>`, () => {
    setAttributes(svgCollection, {
      data: { name: 'Hakim' },
      aria: { label: 'Hello, Hakim!' },
      word: 'yes',
    })

    expect(svg.dataset.name).toBe('Hakim')
    expect(svgTwo.dataset.name).toBe('Hakim')
    expect(locatorSvg).toHaveAttribute('aria-label', 'Hello, Hakim!')
    expect(locatorSvgTwo).toHaveAttribute('aria-label', 'Hello, Hakim!')
    expect(locatorSvg).toHaveAttribute('word', 'yes')
    expect(locatorSvgTwo).toHaveAttribute('word', 'yes')

    // remove attributes

    setAttributes(svgCollection, {
      data: { name: null },
      aria: { label: undefined },
      word: false,
    })

    expect(svg.dataset).not.toHaveProperty('name')
    expect(svgTwo.dataset).not.toHaveProperty('name')
    expect(locatorSvg).not.toHaveAttribute('aria-label')
    expect(locatorSvgTwo).not.toHaveAttribute('aria-label')
    expect(locatorSvg).not.toHaveAttribute('word')
    expect(locatorSvgTwo).not.toHaveAttribute('word')
  })

  test('adds attributes on <svg> child nodes', () => {
    setAttributes(symbols, { id: null })
    expect(symbols.item(0)).not.toHaveAttribute('id')

    setAttributes(symbols, { id: 'mastodon-path' })
    expect(symbols.item(0)).toHaveAttribute('id', 'mastodon-path')
  })
})
