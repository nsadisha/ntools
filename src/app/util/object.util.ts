export function isAllValuesEqualTo<T extends object>(obj: T, text: string): boolean {
  const keys = Object.keys(obj) as (keyof T)[];

  for (let key of keys) {
    if (String(obj[key]) !== text) {
      return false;
    }
  }

  return true;
}

export function removeDuplicates<T>(list: T[]): T[] {
  const seen = new Set<T>();
  return list.filter((value) => {
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
}
