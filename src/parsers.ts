export function parseString(value: any): string {
  if (value === null || value === undefined) return '';
  return String(value).trim();
}


export function parseNumber(value: any): number | null {
  if (typeof value === 'number') return isNaN(value) ? null : value;
  
  if (typeof value === 'string') {
    const cleaned = value.replace(/[$,\s]/g, '');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? null : parsed;
  }
  
  return null;
}

export function parseBoolean(value: any): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value === 1;
  
  if (typeof value === 'string') {
    const lower = value.toLowerCase().trim();
    return ['true', '1', 'yes', 'y', 'on'].includes(lower);
  }
  
  return false;
}


export function parseDate(value: any): string | null {
  if (!value) return null;
  
  let parsedValue = value;
  
  if (typeof value === 'string' && /^\d+$/.test(value)) {
    parsedValue = parseInt(value, 10);
  }

  const date = new Date(parsedValue);
  
  if (isNaN(date.getTime())) {
    return null; 
  }
  
  return date.toISOString();
}