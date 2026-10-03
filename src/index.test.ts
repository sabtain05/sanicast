import { describe, it, expect } from 'vitest';
import { sanicast } from './index';

describe('sanicast core functionality', () => {
  it('should handle default values and strict mode (v2.0.0)', () => {
    const dirtyData = {
      age: "unknown_string",
      role: null,           
      hacker_code: "drop_me!" 
    };

    const schema = {
      age: { type: 'number', default: 18 },
      role: { type: 'string', default: 'guest' }
    } as const;

    const strictResult = sanicast(dirtyData, schema);
    expect((strictResult as any).age).toBe(18);
    expect((strictResult as any).role).toBe('guest'); 
    expect((strictResult as any).hacker_code).toBeUndefined(); 

    const looseResult = sanicast(dirtyData, schema, { strict: false });
    expect((looseResult as any).hacker_code).toBe('drop_me!'); 
  });
});