export function run<T>(block: () => T): T {
  return block()
}
