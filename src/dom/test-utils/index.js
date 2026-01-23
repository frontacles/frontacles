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

/**
 * Create a MathML, SVG or XML element.
 *
 * @param {keyof namespaces} ns The namespace shorthand.
 * @param {string} tag
 * @param {Record<string, any>?} attributes
 */
export function createElementNS(ns, tag, attributes) {
  const element = document.createElementNS(namespaces[ns], tag)

  for (const attr in attributes) {
    element.setAttribute(attr, attributes[attr])
  }

  return element
}

const namespaces = {
  mathml:  'http://www.w3.org/1998/Math/MathML',
  svg:  'http://www.w3.org/2000/svg',
  xhtml:  'http://www.w3.org/1999/xhtml',
}
