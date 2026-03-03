export type EstimateInput = {
  propertyAddress: string;
  propertyValue: string;      // keep as string for inputs
  mortgageBalance: string;    // keep as string for inputs
  propertyType: string;
  timeline: string;
  email: string;
  phone: string;
  consent: boolean;
};

export type EstimateOutput = {
  minLoan: number;
  maxLoan: number;
  minLtv: number;
  maxLtv: number;
  rangeText: string;
  suggestedLtvText: string;
};

function toNumber(moneyLike: string) {
  const cleaned = (moneyLike || "").replace(/[^0-9.]/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function fmtUSD(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

// Simple, explainable first-pass rules
function ltvBand(propertyType: string, timeline: string) {
  let min = 0.60;
  let max = 0.75;

  if (propertyType === "Condo") { min = 0.58; max = 0.70; }
  if (propertyType === "2–4 units") { min = 0.58; max = 0.72; }
  if (propertyType === "Other") { min = 0.55; max = 0.68; }

  // Timeline tweak (ASAP is slightly more conservative)
  if (timeline === "ASAP") max -= 0.02;
  if (timeline === "Flexible") max += 0.01;

  max = clamp(max, 0.55, 0.78);
  min = clamp(min, 0.50, max - 0.05);

  return { min, max };
}

export function calcEstimate(input: EstimateInput): EstimateOutput {
  const value = toNumber(input.propertyValue);
  const mortgage = toNumber(input.mortgageBalance);

  const { min, max } = ltvBand(input.propertyType, input.timeline);

  // Loan = (Value * LTV) - Mortgage
  const minLoan = Math.max(0, value * min - mortgage);
  const maxLoan = Math.max(0, value * max - mortgage);

  const rangeText =
    value > 0 ? `${fmtUSD(minLoan)} – ${fmtUSD(maxLoan)}` : "Enter property value to see a range";

  return {
    minLoan,
    maxLoan,
    minLtv: min,
    maxLtv: max,
    rangeText,
    suggestedLtvText: `${Math.round(min * 100)}% – ${Math.round(max * 100)}%`,
  };
}