"use client";

import type { EstimateInput, EstimateOutput } from "./calc";

function toNumber(moneyLike: string) {
  const cleaned = (moneyLike || "").replace(/[^0-9.]/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}
function fmtUSD(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function EstimateResult({
  input,
  result,
  highlight = false,
}: {
  input: EstimateInput;
  result: EstimateOutput;
  highlight?: boolean;
}) {
  const value = toNumber(input.propertyValue);
  const mortgage = toNumber(input.mortgageBalance);
  const equity = Math.max(0, value - mortgage);
  const maxAvailable = result.maxLoan;

  return (
    <div
      className={
        "rounded-2xl border bg-white p-6 shadow-sm " +
        (highlight ? "border-emerald-300 ring-2 ring-emerald-100" : "border-slate-200")
      }
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-slate-900">Estimated loan range</div>
          <div className="mt-1 text-xs text-slate-500">Preliminary — subject to underwriting & title.</div>
        </div>
        <div className="rounded-xl bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-700">
          {result.suggestedLtvText} LTV
        </div>
      </div>

      <div className="mt-4 text-3xl font-semibold text-slate-900">{result.rangeText}</div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Metric label="Max available (est.)" value={value ? fmtUSD(maxAvailable) : "—"} />
        <Metric label="Estimated equity" value={value ? fmtUSD(equity) : "—"} />
      </div>

      <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="text-sm font-semibold text-slate-900">Assumptions</div>
        <ul className="mt-2 space-y-1 text-sm text-slate-700">
          <li>Based on property value and stated mortgage balance.</li>
          <li>Range reflects conservative underwriting band by scenario.</li>
          <li>A clear exit plan (sell/refi/cash arrival) speeds review.</li>
        </ul>
      </div>

      <div className="mt-4 text-xs text-slate-500">
        Not a commitment to lend. Final terms depend on property review, title, and documentation.
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="text-xs font-semibold text-slate-600">{label}</div>
      <div className="mt-1 text-lg font-semibold text-slate-900">{value}</div>
    </div>
  );
}