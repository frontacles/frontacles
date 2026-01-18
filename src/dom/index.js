/**
 * Bulk update of attributes on one or many HTML element(s).
 *
 * Specific behaviour for the following types of values:
 *
 * - boolean, `null` and `undefined`:
 *   - `true` adds the attribute to the HTML, with no value (`<p hidden="">`)
 *   - `false`, `null` and `undefined` removes the attribute from the HTML
 * - objects:
 *   - `data` is pushed to `HTMLElement.dataset`, but a data property being
 *     `null` or `undefined` removes its `data-*` attribute from the HTML:
 *     `{ data: { id: 1, enabled: false }}` gives `<p data-id="1">`
 *   - `style` is pushed to `HTMLElement.style` (inline CSS):
 *     `{ style: { color: 'red', gap: '2px' }}` gives
 *     `<p style="color: red; gap: 2px;">`
 *   - all other objects are converted the same way:
 *     `aria: { label: 'Hello!' }` gives `<p aria-label="Hello!">`
 *
 * @param {HTMLElement|HTMLElement[]|HTMLCollection} elements
 * @param {Record<string, any>} attributes
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
    .filter(([name, value]) => value && typeof value == 'object' && !['data', 'style'].includes(name))
    .forEach(([name, value]) => {
      delete attributes[name]
      for (const attrName in value) {
        attributes[`${name}-${attrName}`] = value[attrName]
      }
    })

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

      if (typeof value == 'object') {

        // `data-*` attributes
        if (name == 'data') {
          Object.assign(element.dataset, value)

          for (const dataKey in value) {
            /**
            * Remove `data-*` prop if their value is `null` or `undefined`.
            * This is the same logic as regular HTML attributes.
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
