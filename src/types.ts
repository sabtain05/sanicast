export type SanicastType = 'string' | 'number' | 'boolean' | 'date';


export type SanicastSchemaValue = 
  | SanicastType 
  | [SanicastType] 
  | SanicastSchema 
  | [SanicastSchema];

export interface SanicastSchema {
  [key: string]: SanicastSchemaValue;
}

export type SanicastResult<T> = {
  [K in keyof T]: any; 
};