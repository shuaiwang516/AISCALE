export function calculateConsumedWeight(
  startWeightGrams: number | null,
  remainingWeightGrams: number | null,
): number | null {
  if (startWeightGrams === null || remainingWeightGrams === null) {
    return null;
  }

  return Math.max(startWeightGrams - remainingWeightGrams, 0);
}

export function parseManualWeight(input: string): number | null {
  const trimmed = input.trim();
  if (!trimmed) {
    return null;
  }

  const value = Number(trimmed);
  if (!Number.isFinite(value) || value < 0) {
    return null;
  }

  return value;
}
