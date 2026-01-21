/**
 * Bulk update of attributes on one or many HTML element(s).
 *
 * Specific behaviour for the following types of values:
 *
 * - boolean, `null` and `undefined`:
 *   - `true` adds the attribute to the HTML, with no value (`<p hidden="">`)
 *   - `false`, `null` and `undefined` removes the attribute from the HTML
 * - objects:
 *   - `class` will add/remove CSS classes from `{ className: state }` entries
 *   - `data` is pushed to `HTMLElement.dataset`, but a data property being
 *     `null` or `undefined` removes its `data-*` attribute from the HTML:
 *     `{ data: { id: 1, enabled: false }}` gives `<p data-id="1">`
 *   - `style` is pushed to `HTMLElement.style` (inline CSS):
 *     `{ style: { color: 'red', gap: '2px' }}` gives
 *     `<p style="color: red; gap: 2px;">`
 *   - all other objects are converted the same way:
 *     `aria: { label: 'Hello!' }` gives `<p aria-label="Hello!">`
 * - `class` can also be a string with one or more classes (space-separated),
 *   or an array of classes.
 *
 * @todo Check how it behaves on SVGs.
 *
 * @param {HTMLElement|HTMLElement[]|HTMLCollection} elements
 * @param {Record<string, any>} fnAttributes
 * {@link https://github.com/meduzen/setAttributes}
 *
 * @returns The received element(s), for chaining fans.
 */
export const setAttributes = (elements, fnAttributes) => {
  const items = elements instanceof HTMLElement
    ? [elements]
    : [...elements]

  const attributes = { ...fnAttributes }

  // Normalize object attributes.
  Object.entries(attributes)
    .filter(([name, value]) =>
      value
      && typeof value == 'object'
      && !['class', 'data', 'style'].includes(name)
    )
    .forEach(([name, value]) => {
      delete attributes[name]
      for (const attrName in value) {
        attributes[`${name}-${attrName}`] = value[attrName]
      }
    })

  // Normalize `class` attribute from string to array.
  if (typeof attributes.class == 'string') {
    attributes.class = attributes.class.split(' ')
  }

  // Normalize boolean attributes.
  const attrEntries = Object.entries(attributes)
    .map(([name, value]) => typeof value == 'boolean'
      ? [name, value ? '' : null]
      : [name, value]
    )

  items.forEach(element =>
    attrEntries.forEach(([name, value]) => {
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

      if (typeof value == 'object') {

        // `data-*` attributes (using `dataset`)
        if (name == 'data') {
          Object.assign(element.dataset, value)

          for (const dataKey in value) {
            /**
            * Remove `data-*` prop if their value is `null` or `undefined`,
            * because `dataset` stringify them but `setAttributes` apply
            * the logic of regular HTML attributes to all attributes.
            */
            if (value[dataKey] == null) {
              delete element.dataset[dataKey]
            }
          }

          return
        }

        // `style` attribute (inline styles)
        if (name == 'style') {
          return Object.assign(element.style, value)
        }
      }

      element.setAttribute(name, value)
    })
  )

  return elements
}
