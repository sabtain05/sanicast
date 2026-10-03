import { SanicastSchema, SanicastType, SanicastResult, SanicastConfig, SanicastOptions } from './types';
import { parseString, parseNumber, parseBoolean, parseDate } from './parsers';


function isConfig(val: any): val is SanicastConfig {
  return val !== null && typeof val === 'object' && !Array.isArray(val) && 'type' in val && ['string', 'number', 'boolean', 'date'].includes(val.type);
}

function parseSingleValue(value: any, typeExpected: SanicastType, defaultValue?: any) {
  let parsed = null;
  switch (typeExpected) {
    case 'string': parsed = parseString(value); break;
    case 'number': parsed = parseNumber(value); break;
    case 'boolean': parsed = parseBoolean(value); break;
    case 'date': parsed = parseDate(value); break;
    default: parsed = value;
  }
  
  if ((parsed === null || parsed === undefined || parsed === '') && defaultValue !== undefined) {
    return defaultValue;
  }
  return parsed;
}

export function sanicast<T>(
  data: any, 
  schema: SanicastSchema, 
  options: SanicastOptions = { strict: true }
): SanicastResult<T> {
  if (!data || typeof data !== 'object') {
    return {} as SanicastResult<T>;
  }

  const result: any = options.strict ? {} : { ...data };

  for (const key in schema) {
    const typeExpected = schema[key];
    const value = data[key];

    if (typeof typeExpected === 'string') {
      result[key] = parseSingleValue(value, typeExpected as SanicastType);
    } 
    else if (isConfig(typeExpected)) {
      result[key] = parseSingleValue(value, typeExpected.type, typeExpected.default);
    }
    else if (Array.isArray(typeExpected) && typeExpected.length > 0) {
      const arrayDef = typeExpected[0];
      
      if (Array.isArray(value)) {
        result[key] = value.map(item => {
          if (typeof arrayDef === 'string') {
            return parseSingleValue(item, arrayDef as SanicastType);
          } else if (isConfig(arrayDef)) {
            return parseSingleValue(item, arrayDef.type, arrayDef.default);
          } else if (typeof arrayDef === 'object') {
            return sanicast(item, arrayDef as SanicastSchema, options);
          }
          return item;
        });
      } else {
        result[key] = []; 
      }
    }
    else if (typeof typeExpected === 'object' && typeExpected !== null && !Array.isArray(typeExpected)) {
      result[key] = sanicast(value, typeExpected as SanicastSchema, options);
    }
  }

  return result as SanicastResult<T>;
}

export * from './types';