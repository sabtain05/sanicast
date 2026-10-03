export type SanicastType = 'string' | 'number' | 'boolean' | 'date';


export interface SanicastConfig {
  type: SanicastType;
  default?: any;
}

export type SanicastSchemaValue = 
  | SanicastType 
  | SanicastConfig
  | [SanicastType] 
  | [SanicastConfig]
  | SanicastSchema 
  | [SanicastSchema];

export interface SanicastSchema {
  [key: string]: SanicastSchemaValue;
}


export interface SanicastOptions {
  strict?: boolean; 
}

export type SanicastResult<T> = {
  [K in keyof T]: any; 
};