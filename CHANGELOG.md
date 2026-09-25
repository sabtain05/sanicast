# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-09-25

### Added
- Initial release of `sanicast`.
- Core bulletproof parsers:
  - `parseString`: Trims and casts any data to string.
  - `parseNumber`: Extracts numeric values from chaotic strings (e.g., "$1,200.50" to `1200.5`) gracefully.
  - `parseBoolean`: Converts standard truthy/falsy strings ('yes', '1', 'true') to boolean.
  - `parseDate`: Standardizes messy date formats and timestamps into standard ISO 8601 strings, returning `null` on failure instead of crashing.
- `sanicast` main engine with recursive object schema evaluation.
- Full TypeScript support with exported types (`SanicastSchema`, `SanicastType`, `SanicastResult`).
- Zero-dependency architecture.