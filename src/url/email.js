export class Email extends URL {

  /**
   *
   * @param {string} address An email address like `someone@domain.tld`.
   */
  constructor(address) {
    super(`ftp://${address}`)

    if (!this.#validate(address)) {
      throw new TypeError(`Email constructor: ${address} is not a valid Email.`)
    }
  }

  /**
   * The domain name and extension of the email.
   *
   * In `username@domain.tld`, it is `domain.tld`.
   */
  get host() {
    return super.host
  }

  /**
   * The username of the email.
   *
   * In `username@domain.tld`, it is `username`.
   */
  get username() {
    return super.username
  }

  toJSON () {
    return `${this.username}@${this.host}`
  }

  /**
   * Replace the string representation of the top-level class (`URL`) to be an
   * email address instead of `ftp://username@domain.tld`. It is needed for
   * situation where type casting to string is involved (`console.log`…).
   */
  toString () {
    return `${this.username}@${this.host}`
  }

  #validate (address) {
    return `${this.username}@${this.host}` == address
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
