import { StabilityState } from "../bluetooth/types";

export function formatWeight(grams: number | null | undefined): string {
  if (typeof grams !== "number" || !Number.isFinite(grams)) {
    return "--.- g";
  }

  return `${grams.toFixed(1)} g`;
}

export function formatTimestamp(isoTimestamp: string | null | undefined): string {
  if (!isoTimestamp) {
    return "--";
  }

  return new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(isoTimestamp));
}

export function formatStability(stable: boolean | null | undefined): StabilityState {
  if (stable === true) {
    return "stable";
  }

  if (stable === false) {
    return "unstable";
  }

  return "unknown";
}
