import { describe, expect, test } from 'vitest'
import { page } from 'vitest/browser'
import { setAttributes } from './index.js'
import { createElement } from './test-utils/index.js'

describe('dom/setAttributes', () => {
  const el = createElement('div', { 'data-testid': 'el-1' })
  const elTwo = createElement('div', { 'data-testid': 'el-2' })

  document.body.append(el, elTwo)

  const locator = page.getByTestId('el-1')
  const locatorTwo = page.getByTestId('el-2')
  const collection = document.getElementsByTagName('div')

  test('DOM setup is ready', () => {
    expect(locator).toBeInTheDocument()
    expect(locatorTwo).toBeInTheDocument()
    expect(collection).toBeInstanceOf(HTMLCollection)
    expect(collection).toHaveLength(2)
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

  test(`set then unset all kind of attributes on a HTML collection`, () => {
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

  test.todo('adds attributes on <svg>')
  test.todo('adds attributes on <svg> child nodes')
})
