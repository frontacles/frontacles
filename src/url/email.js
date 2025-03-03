// eslint-disable-next-line no-undef
export class Email extends URL {

  /**
   * @param {string|Email} address An email address like `someone@domain.tld`.
   */
  constructor(address) {
    super(`ftp://${address}`)

    if (!this.#validate(address)) {
      throw new TypeError(`Email constructor: ${address} is not a valid Email.`)
    }
  }

  toJSON () {
    return this.toString()
  }

  /**
   * Replace the string representation of the top-level class (`URL`) to be an
   * email address instead of `ftp://username@domain.tld`. It is needed for
   * situation where type casting to string is involved (`console.log`…).
   */
  toString () {
    return `${this.username}@${this.hostname}`
  }

  /**
   * Recompose the email address and compare it to the input.
   *
   * @param {string} address
   */
  #validate (address) {
    return this.toString() == address
  }

  /**
   * Whether or not an email address is parsable and valid.
   *
   * @param {any|Email} address
   */
  static canParse(address) {
    try {
      new this(address)
      return true
    } catch {
      return false
    }
  }
}
