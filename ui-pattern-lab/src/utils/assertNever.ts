export function assertNever(value: never): never {
  throw new Error(`Unhandled exhaustive case: ${String(value)}`);
}
