import { describe, it, expect } from 'vitest';
import { sanicast } from './index';

describe('sanicast core functionality', () => {
  it('should clean and cast messy data correctly', () => {
    const dirtyData = {
      user: {
        name: '   Sabtain Ali   ', 
        isActive: 'yes',            
      },
      transaction: {
        amount: '$1,200.50',      
        date: '2026/09/25 12:00:00',        
      },
      age: '25'                    
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
      age: 'number',
    } as const;

    const cleanData = sanicast(dirtyData, schema) as unknown as {
      user: { name: string; isActive: boolean };
      transaction: { amount: number; date: string };
      age: number;
    };

    expect(cleanData.user.name).toBe('Sabtain Ali');
    expect(cleanData.user.isActive).toBe(true);
    expect(cleanData.transaction.amount).toBe(1200.5);
    expect(cleanData.transaction.date).toContain('2026-09-25'); 
    expect(cleanData.age).toBe(25);
  });
});