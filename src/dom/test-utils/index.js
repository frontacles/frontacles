/**
 * Create a HTML element.
 *
 * @param {string?} tag Default to `div`.
 * @param {Record<string, any>?} attributes
 */
export function createElement(tag = 'div', attributes) {
  const element = document.createElement(tag)

  for (const attr in attributes) {
    element.setAttribute(attr, attributes[attr])
  }

  return element
}
