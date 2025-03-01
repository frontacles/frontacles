/**
 * @file Inject JSDoc comment in the generated types. This script currently
 * limits itself to override the description of class members inheriting
 * implementation from the parent class, but with a wrong description.
 *
 * This is a JSDoc limitation, not a TypeScript one.
 *
 * @todo Make a system to move the new documentation to an external file.
 */

import { readFile, writeFile } from 'node:fs'

readFile('types/index.d.ts', 'utf-8', function (err, data) {

  const emailClassNeedle = 'export class Email extends URL {'

  data = data.replace(emailClassNeedle, `${emailClassNeedle}
	/**
	 * The domain name and extension of the email.
	 *
	 * In \`username@domain.tld\`, it is \`domain.tld\`.
	 */
	declare hostname: string;
	/**
	 * The username of the email.
	 *
	 * In \`username@domain.tld\`, it is \`username\`.
	 */
	declare username: string;`
  )

  writeFile('types/index.d.ts', data, () => {});
});
