/** @file Alternatives implementations of email validation for benchmark purpose. */

/** A function validating an email, using RegExp. */
export const isEmailWithRegExp = address => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(address)

/** Class extending `URL`. Validation using RegExp. */
// eslint-disable-next-line no-undef
export class EmailClassWithRegExp extends URL {

  constructor(address) {
    super(`ftp://${address}`)

    if (!this.#validate(address)) {
      throw new TypeError(`Email constructor: ${address} is not a valid Email.`)
    }
  }

  toJSON () {
    return this.toString()
  }

  toString () {
    return `${this.username}@${this.hostname}`
  }

  /** @param {string} address */
  #validate (address) {
    return this.toString() == address && this.username
  }

  /** @param {any|Email} address */
  static canParse(address) {
    return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(address)
  }
}

/** Class extending `URL`. Validation using `URL`. */
// eslint-disable-next-line no-undef
export class EmailClassWithURL extends URL {
  constructor(address) {
    super(`ftp://${address}`)

    if (!this.#validate(address)) {
      throw new TypeError(`Email constructor: ${address} is not a valid Email.`)
    }
  }

  toJSON () {
    return this.toString()
  }

  toString () {
    return `${this.username}@${this.hostname}`
  }

  #validate (address) {
    return this.toString() == address && this.username
  }

  static canParse(address) {
    try {
      new this(address)
      return true
    } catch {
      return false
    }
  }
}
