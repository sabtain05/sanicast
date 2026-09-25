import { SanicastSchema, SanicastType, SanicastResult } from './types';
import { parseString, parseNumber, parseBoolean, parseDate } from './parsers';


export function sanicast<T>(data: any, schema: SanicastSchema): SanicastResult<T> {
  if (!data || typeof data !== 'object') {
    return {} as SanicastResult<T>;
  }

  const result: any = {};

  for (const key in schema) {
    const typeExpected = schema[key];
    const value = data[key];

    if (typeof typeExpected === 'string') {
      switch (typeExpected as SanicastType) {
        case 'string':
          result[key] = parseString(value);
          break;
        case 'number':
          result[key] = parseNumber(value);
          break;
        case 'boolean':
          result[key] = parseBoolean(value);
          break;
        case 'date':
          result[key] = parseDate(value);
          break;
        default:
          result[key] = value;
      }
    } 
    else if (typeof typeExpected === 'object' && typeExpected !== null) {
      result[key] = sanicast(value, typeExpected as SanicastSchema);
    }
  }

  return result as SanicastResult<T>;
}

export * from './types';
