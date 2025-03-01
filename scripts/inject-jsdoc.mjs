/**
 * @file Inject JSDoc comment in the generated types. This script currently
 * limits itself to override the description of class members inheriting
 * their implementation from the parent class but a wrong description.
 *
 * @todo Make a system to move the new documentation to an external file.
 */

import { readFile, writeFile } from 'node:fs'

readFile('types/index.d.ts', 'utf-8', function (err, data) {

  const emailClassNeedle = 'export class Email extends URL {'

  data = data.replace(emailClassNeedle, emailClassNeedle
    + '\n\t/**'
    + '\n\t * The domain name and extension of the email.'
    + '\n\t *'
    + '\n\t * In `username@domain.tld`, it is `domain.tld`.'
    + '\n\t */'
    + '\n\tdeclare hostname: string;'
    + '\n\t/**'
    + '\n\t * The username of the email.'
    + '\n\t *'
    + '\n\t * In `username@domain.tld`, it is `username`.'
    + '\n\t */'
    + '\n\tdeclare username: string;'
  )

  writeFile('types/index.d.ts', data, () => {});
});
