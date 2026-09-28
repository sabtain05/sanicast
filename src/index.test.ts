import { describe, it, expect } from 'vitest';
import { sanicast } from './index';

describe('sanicast core functionality', () => {
  it('should handle arrays correctly (v1.5.0 feature)', () => {
    const dirtyData = {
      prices: ["$10.50", "20", "$30.99"],
      users: [
        { name: "   Ali   ", active: "yes" },
        { name: "Ahmed", active: "no" }
      ]
    };
    const schema = {
      prices: ['number'],
      users: [{
        name: 'string',
        active: 'boolean'
      }]
    } as any;

    const cleanData = sanicast(dirtyData, schema) as {
      prices: number[];
      users: { name: string; active: boolean }[];
    };


    expect(cleanData.prices).toEqual([10.5, 20, 30.99]);
    expect(cleanData.users[0].name).toBe('Ali');
    expect(cleanData.users[0].active).toBe(true);
    expect(cleanData.users[1].active).toBe(false);
  });
});