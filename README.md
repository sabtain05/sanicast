# sanicast

[![npm version](https://img.shields.io/npm/v/sanicast.svg?style=flat-square)](https://www.npmjs.org/package/sanicast)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

**The ultimate solution for the developer's daily data tax.**  
A lightweight, zero-dependency, bulletproof data parser and caster that automatically detects and standardizes messy inputs.

Are you tired of handling inconsistent API responses, parsing chaotic date formats, or extracting numbers from messy strings? `sanicast` does the heavy lifting for you in a single function call, without ever crashing your app.

## Why sanicast?

- **Zero Dependencies:** Extremely lightweight. Won't bloat your `node_modules`.
- **Bulletproof:** Gracefully handles bad data. If a date is completely invalid, it returns `null` instead of crashing.
- **Smart Type Coercion:** Automatically extracts numbers from strings (e.g., `"$1,200.50"` becomes `1200.5`).
- **Deeply Recursive:** Supports deeply nested object schemas out of the box.
- **TypeScript First:** Written in TS with full type inference and support.

## Installation

You can install `sanicast` using your favorite package manager:

```bash
# Using npm
npm install sanicast

# Using yarn
yarn add sanicast

# Using pnpm
pnpm add sanicast

```

## Usage

Here is how you can use `sanicast` to clean up chaotic, unpredictable data:

```typescript
import { sanicast } from 'sanicast';

const messyData = {
  user: {
    name: '   Sabtain Ali   ',
    isActive: 'yes',      
  },
  transaction: {
    amount: '$1,200.50',         
    date: '2026/04/12 12:00:00',
  },
  metadata: {
    age: '25',                   
  }
};

const schema = {
  user: {
    name: 'string',
    isActive: 'boolean',
  },
  transaction: {
    amount: 'number',
    date: 'date',
  },
  metadata: {
    age: 'number'
  }
};
const cleanData = sanicast(messyData, schema);

/*
Output:
{
  user: { name: 'Sabtain Ali', isActive: true },
  transaction: { amount: 1200.5, date: '2026-04-12T07:00:00.000Z' },
  metadata: { age: 25 }
}
*/

```

## Supported Types

In your schema, you can use the following string values to cast your data:

| Schema Type | How it works | Example Input | Parsed Output |
| --- | --- | --- | --- |
| `'string'` | Converts to string and `.trim()`s white spaces. | `123` or `'  hello  '` | `'123'`, `'hello'` |
| `'number'` | Strips currency signs, commas, spaces and parses to float. | `"$1,200.50"` | `1200.5` |
| `'boolean'` | Checks for truthy strings (`'yes'`, `'1'`, `'true'`, `'on'`). | `'yes'`, `1` | `true` |
| `'date'` | Parses timestamps and strings into ISO 8601 strings. | `'2026/04/12'` | `'2026-04-12T00:00:00.000Z'` |

*Note: If data is completely unparseable for `number` or `date`, `sanicast` will safely return `null`.*

## Documentation & Community

* **Changelog**: See what's new in the latest versions.
* **Contributing**: Learn how to contribute to the project.
* **Code of Conduct**: Please read before participating in our community.
* **Security Policy**: Information about reporting vulnerabilities safely.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<p align="center">
<strong>A Sabtain Ali production</strong>
</p>