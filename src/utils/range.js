export function range(min, max) {
  return Array.from({ length: max - min + 1 }, (_, i) => min + i);
}
