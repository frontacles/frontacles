export function clamp(val: number, min: number, max: number): number;
export function round(number: number, precision?: number): number;
export class Email extends URL {
	/**
	 * The domain name and extension of the email.
	 *
	 * In `username@domain.tld`, it is `domain.tld`.
	 */
	declare hostname: string;
	/**
	 * The username of the email.
	 *
	 * In `username@domain.tld`, it is `username`.
	 */
	declare username: string;
	/**
	 * Whether or not an email address is parsable and valid.
	 *
	 * @param {any|Email} address
	 */
	static canParse(address: any | Email): boolean;
	/**
	 * @param {string|Email} address An email address like `someone@domain.tld`.
	 */
	constructor(address: string | Email);
	#private;
}

export {};
