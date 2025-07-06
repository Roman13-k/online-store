export function isFromEnum<T extends string>(value: any, allowed: readonly T[]): value is T {
  return allowed.includes(value);
}
