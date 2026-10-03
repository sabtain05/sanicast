# sanicast

[![npm version](https://img.shields.io/npm/v/sanicast.svg?style=flat-square)](https://www.npmjs.org/package/sanicast)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

**The ultimate solution for the developer's daily data tax.**  
A lightweight, zero-dependency, bulletproof data parser and caster that automatically detects and standardizes messy inputs. 

Are you tired of handling inconsistent API responses, parsing chaotic date formats, or extracting numbers from messy strings? `sanicast` does the heavy lifting for you in a single function call, without ever crashing your app.

## Why sanicast?

- **Zero Dependencies:** Extremely lightweight. Won't bloat your `node_modules`.
- **Bulletproof:** Gracefully handles bad data without throwing unhandled exceptions.
- **Strict Mode (New in v2.0.0!):** Automatically strips out unknown properties to secure your data pipeline.
- **Default Fallbacks (New in v2.0.0!):** Provide fallback values when data is missing or completely unparseable.
- **Array Power:** Seamlessly cast arrays of primitives and arrays of objects.
- **Deeply Recursive:** Supports deeply nested object schemas out of the box.
- **TypeScript First:** Written in TS with full type inference and support.

## Installation

```bash
npm install sanicast
yarn add sanicast
pnpm add sanicast

```

## Usage

Here is how you can use `sanicast` to clean up chaotic data, apply defaults, and strip unknown properties:

```typescript
import { sanicast } from 'sanicast';

// 1. Messy, unpredictable data (Notice the missing 'role' and the extra 'hacker_code')
const messyData = {
  user: {
    name: '   Sabtain Ali   ', 
    age: 'unknown_string', // Bad data, cannot be converted to number
  },
  role: null,              // Missing data
  hacker_code: "drop_me!", // Malicious/Unknown extra property
  transactions: ["$10.50", "20"]
};

// 2. Define your schema (with default values!)
const schema = {
  user: {
    name: 'string',
    age: { type: 'number', default: 18 } // Provide a fallback if parsing fails
  },
  role: { type: 'string', default: 'guest' },
  transactions: ['number']
};

// 3. Clean and cast it! (Strict mode is ON by default)
const cleanData = sanicast(messyData, schema);

/*
Output:
{
  user: { 
    name: 'Sabtain Ali', 
    age: 18               // Fell back to default!
  },
  role: 'guest',          // Fell back to default!
  transactions: [10.5, 20]
  // 'hacker_code' is safely dropped because of Strict Mode!
}
*/

```

## Configuration (Strict Mode)

By default, `sanicast` runs in **Strict Mode**. It automatically deletes any keys from your input data that are not defined in your schema. This is highly recommended for security.

If you want to retain unknown properties, you can disable strict mode by passing an options object as the third argument:

```typescript
const looseData = sanicast(messyData, schema, { strict: false });
// This will keep 'hacker_code' in the output.

```

## Supported Types

In your schema, you can use the following definitions to cast your data:

| Schema Type | How it works | Example Input | Parsed Output |
| --- | --- | --- | --- |
| `'string'` | Converts to string and `.trim()`s white spaces. | `123` or `'  hello  '` | `'123'`, `'hello'` |
| `'number'` | Strips currency signs, commas, spaces and parses to float. | `"$1,200.50"` | `1200.5` |
| `'boolean'` | Checks for truthy strings (`'yes'`, `'1'`, `'true'`, `'on'`). | `'yes'`, `1` | `true` |
| `'date'` | Parses timestamps and strings into ISO 8601 strings. | `'2026/04/12'` | `'2026-04-12T00:00:00.000Z'` |
| `['type']` | Parses an array of values based on the provided type. | `["$10", 20]` | `[10, 20]` |
| `{ type, default }` | Falls back to default if input is missing/invalid. | `null` | Your default value |

## Documentation & Community

* **Changelog**: See what's new in the latest versions.
* **Contributing**: Learn how to contribute to the project.
* **Code of Conduct**: Please read before participating in our community.
* **Security Policy**: Information about reporting vulnerabilities safely.

## License

This project is licensed under the MIT License.

---

<p align="center">
<strong>A Sabtain Ali production</strong>
</p>
