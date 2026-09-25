export type SanicastType = 'string' | 'number' | 'boolean' | 'date';


export type SanicastSchema = {
  [key: string]: SanicastType | SanicastSchema;
};


export type SanicastResult<T> = {
  [K in keyof T]: any; 
};