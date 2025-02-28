export function round(number: number, precision?: number): number;
export class Email extends URL {
	static canParse(address: any): boolean;
	/**
	 *
	 * @param {string} address An email address like `someone@domain.tld`.
	 */
	constructor(address: string);
	/**
	 * The domain name and extension of the email.
	 *
	 * In `username@domain.tld`, it is `domain.tld`.
	 */
	get host(): string;
	/**
	 * The username of the email.
	 *
	 * In `username@domain.tld`, it is `username`.
	 */
	get username(): string;
	#private;
}

export {};
