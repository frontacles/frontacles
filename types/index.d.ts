export function subArray(haystack: any[], needles: any[]): boolean;
export function subSet(haystack: Set<any>, needles: Set<any>): boolean;
export function sameArray(a1: any[], a2: any[]): boolean;
export function clamp(val: number, min: number, max: number): number;
export function round(number: number, precision?: number): number;
export function capitalize(str: string): string;
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
	 * @param {any|string|Email|Stringable} address
	 */
	static canParse(address: any | string | Email | Stringable): boolean;
	/**
	 * @param {string|Email} address An email address like `someone@domain.tld`.
	 */
	constructor(address: string | Email);
	#private;
}
export function isEmail(address: any | string | Stringable): boolean;
export type Stringable = {
	/**
	 * - The object as a string.
	 */
	toString: () => string;
};

export {};
