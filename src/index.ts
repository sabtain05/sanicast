import { SanicastSchema, SanicastType, SanicastResult } from './types';
import { parseString, parseNumber, parseBoolean, parseDate } from './parsers';


function parseSingleValue(value: any, typeExpected: SanicastType) {
  switch (typeExpected) {
    case 'string': return parseString(value);
    case 'number': return parseNumber(value);
    case 'boolean': return parseBoolean(value);
    case 'date': return parseDate(value);
    default: return value;
  }
}


export function sanicast<T>(data: any, schema: SanicastSchema): SanicastResult<T> {
  if (!data || typeof data !== 'object') {
    return {} as SanicastResult<T>;
  }

  const result: any = {};

  for (const key in schema) {
    const typeExpected = schema[key];
    const value = data[key];

    if (typeof typeExpected === 'string') {
      result[key] = parseSingleValue(value, typeExpected as SanicastType);
    } 
    else if (Array.isArray(typeExpected) && typeExpected.length > 0) {
      const arrayType = typeExpected[0];
      
      if (Array.isArray(value)) {
        result[key] = value.map(item => {
          if (typeof arrayType === 'string') {
            return parseSingleValue(item, arrayType as SanicastType);
          } else if (typeof arrayType === 'object') {
            return sanicast(item, arrayType as SanicastSchema);
          }
          return item;
        });
      } else {
        result[key] = [];
      }
    }
    else if (typeof typeExpected === 'object' && typeExpected !== null && !Array.isArray(typeExpected)) {
      result[key] = sanicast(value, typeExpected as SanicastSchema);
    }
  }

  return result as SanicastResult<T>;
}

export * from './types';