/**
 * Bulk update attributes of HTML element(s).
 *
 * Specific behaviour for the following types of values:
 *
 * - boolean, `null` and `undefined`:
 *   - `true` adds the attribute to the HTML, with no value (`<p hidden="">`)
 *   - `false`, `null` and `undefined` removes the attribute from the HTML
 * - objects:
 *   - `class` will add/remove CSS classes from `{ className: state }` entries
 *   - `data` is pushed to `Element.dataset`, but a `data` property that is
 *     `null` or `undefined` removes its `data-*` attribute from the HTML:
 *     `{ data: { id: 1, enabled: false }}` gives `<p data-id="1">`
 *   - `style` is pushed to `Element.style` (inline CSS):
 *     `{ style: { color: 'red', gap: '2px' }}` gives
 *     `<p style="color: red; gap: 2px;">`
 *   - all other objects are converted the same way:
 *     `aria: { label: 'Hello!' }` gives `<p aria-label="Hello!">`
 * - `class` can also be a string with one or more classes (space-separated),
 *   or an array of classes.
 *
 * @template {Element | Element[] | HTMLCollection} T
 * @param {T} elements
 * @param {Attributes} attributes
 * @returns {T} The received element(s). Use it for method chaining.
 */
export const setAttributes = (elements, attributes) => {
  const items = elements instanceof Element
    ? [elements]
    : [...elements]

  attributes = normalizeAttributes(attributes)

  items.forEach(element =>
    attributes.forEach(([name, value]) => {
      if (value == null) {
        return element.removeAttribute(name)
      }

      // CSS `class`, as array or object.
      if (name == 'class') {
        return Array.isArray(value)
          ? element.classList.add(...value)
          : Object.entries(value).forEach(([className, classState]) =>
            element.classList.toggle(className, classState)
          )
      }

      // Only `data` and `style` can go in this `if`.
      if (typeof value == 'object') {

        // `style` attribute (inline styles)
        if (name == 'style') {
          return Object.assign(element.style, value)
        }

        // `data-*` attributes (using `dataset`)
        Object.assign(element.dataset, value)

        return Object.entries(value).forEach(([dataKey, dataValue]) => {
          /**
          * Remove `data-*` prop if their value is `null` or `undefined`,
          * because `dataset` stringify them but `setAttributes` apply
          * the logic of regular HTML attributes to all attributes.
          */
          if (dataValue == null) {
            delete element.dataset[dataKey]
          }
        })
      }

      element.setAttribute(name, value)
    })
  )

  return elements
}

/** @param {Record<string, any>} fnAttributes */
const normalizeAttributes = fnAttributes => {
  const attributes = { ...fnAttributes }

  /**
   * Normalize object attributes.
   * It turns `{ key: { name: value }}` into `'key-name="value"'`.
   */
  Object.entries(attributes)
    .filter(([name, value]) =>
      value
      && typeof value == 'object'
      && !['class', 'data', 'style'].includes(name)
    )
    .forEach(([name, value]) => {
      delete attributes[name]

      Object.entries(value).forEach(([attrName, attrValue]) => {
        attributes[`${name}-${attrName}`] = attrValue
      })
    })

  // Normalize `class` attribute from string to array.
  if (typeof attributes.class == 'string') {
    attributes.class = attributes.class.split(' ')
  }

  // Normalize boolean attributes: `true` becomes `''`, `false` becomes `null`.
  return Object.entries(attributes)
    .map(([name, value]) => [
      name,
      typeof value == 'boolean'
        ? (value ? '' : null)
        : value // not boolean
    ])
}

/** @typedef {boolean|string|number|null|undefined} AttributePrimitive */
/** @typedef {AttributePrimitive | Record<string, AttributePrimitive>} AttributeValue */
/** @typedef {Record<string, AttributeValue>} BaseAttributes */
/** @typedef {BaseAttributes | { class?: string[] | AttributeValue }} Attributes */
