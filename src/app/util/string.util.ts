export function toFixed(number: number, fractionDigits: number = 2): string {
  return number.toFixed(fractionDigits);
}

export function firstLetterToUpperCase(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
