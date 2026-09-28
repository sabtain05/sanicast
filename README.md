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
- **Array Power (New in v1.5.0!):** Seamlessly cast arrays of primitives and arrays of objects.
- **Deeply Recursive:** Supports deeply nested object schemas out of the box.
- **TypeScript First:** Written in TS with full type inference and support.

## Installation

You can install `sanicast` using your favorite package manager:

```bash
npm install sanicast
yarn add sanicast
pnpm add sanicast

```

## Usage

Here is how you can use `sanicast` to clean up chaotic, unpredictable data, including arrays!

```typescript
import { sanicast } from 'sanicast';

// 1. Your messy, unpredictable data from an API
const messyData = {
  user: {
    name: '   Sabtain Ali   ', 
    isActive: 'yes',             
  },
  transactions: ["$10.50", "20", "$30.99"],
  devices: [
    { name: "iPhone", isMobile: 1 },        
    { name: "  MacBook  ", isMobile: "no" }
  ],
  createdAt: '2026/04/12 12:00:00'
};

// 2. Define how you want your data to look
const schema = {
  user: {
    name: 'string',
    isActive: 'boolean',
  },
  transactions: ['number'],
  devices: [{
    name: 'string',
    isMobile: 'boolean'
  }],
  createdAt: 'date'
};

// 3. Clean and cast it!
const cleanData = sanicast(messyData, schema);

/*
Output:
{
  user: { name: 'Sabtain Ali', isActive: true },
  transactions: [10.5, 20, 30.99],
  devices: [
    { name: 'iPhone', isMobile: true },
    { name: 'MacBook', isMobile: false }
  ],
  createdAt: '2026-04-12T07:00:00.000Z'
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
| `['type']` | Parses an array of values based on the provided type. | `["$10", 20]` | `[10, 20]` |
| `[{...}]` | Parses an array of objects recursively. | `[{ active: 'yes' }]` | `[{ active: true }]` |

*Note: If data is completely unparseable for `number` or `date`, `sanicast` will safely return `null`.*

## Documentation & Community

* **Changelog**: See what's new in the latest versions.
* **Contributing**: Learn how to contribute to the project.
* **Code of Conduct**: Please read before participating in our community.
* **Security Policy**: Information about reporting vulnerabilities safely.

## License

This project is licensed under the MIT License

---

<p align="center">
<strong>A Sabtain Ali production</strong>
</p>