export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function assert(condition: unknown, msg: string): asserts condition {
  if (!condition) throw new Error(msg);
}

export function assertIsDefined<T>(val: T, msg?: string): asserts val is NonNullable<T> {
  if (val === undefined || val === null)
    throw new Error(msg ?? `Expected value to be defined, but got ${val}`);
}