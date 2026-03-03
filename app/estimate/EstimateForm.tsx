"use client";

import { useMemo, useState } from "react";
import EstimateResult from "./EstimateResult";
import { calcEstimate, type EstimateInput } from "./calc";

type Status = null | { type: "success" | "error"; msg: string };

const initialInput: EstimateInput = {
  propertyAddress: "",
  propertyValue: "",
  mortgageBalance: "",
  propertyType: "Single family",
  timeline: "ASAP",
  email: "",
  phone: "",
  consent: false,
};

export default function EstimateForm() {
  const [input, setInput] = useState<EstimateInput>(initialInput);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  const result = useMemo(() => calcEstimate(input), [input]);

  // ✅ 统一更新入口：以后加字段不会到处写 setInput
  const update = <K extends keyof EstimateInput>(key: K, value: EstimateInput[K]) => {
    setInput((s) => ({ ...s, [key]: value }));
  };

  // ✅ 提交前校验：集中在一个地方
  const validate = () => {
    if (!input.propertyAddress.trim()) return "Please enter the property address.";
    if (!input.consent) return "Please confirm consent to continue.";
    if (!input.email.trim()) return "Please enter your email.";
    if (!input.phone.trim()) return "Please enter your phone number.";

    const valueStr = (input.propertyValue || "").replace(/[^0-9.]/g, "");
    if (!valueStr || Number(valueStr) <= 0) return "Please enter an estimated property value.";

    return null;
  };

  // ✅ 提交逻辑：集中在一个地方
  const submit = async () => {
    setStatus(null);
    const err = validate();
    if (err) return setStatus({ type: "error", msg: err });

    setSubmitting(true);
    try {
      const payload = {
        borrowerData: {
          address: input.propertyAddress,
          propertyValue: input.propertyValue,
          mortgageBalance: input.mortgageBalance,
          propertyType: input.propertyType,
          timeline: input.timeline,
          email: input.email,
          phone: input.phone,
          // ✅ 兼容你当前 route.ts 可能还在检查 contact
          contact: `${input.email} / ${input.phone}`,
        },
        calculation: {
          minLoan: result.minLoan,
          maxLoan: result.maxLoan,
          minLtv: result.minLtv,
          maxLtv: result.maxLtv,
        },
        scoreCategory: "preliminary",
        consent: input.consent,
      };

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || data?.ok !== true) {
        setStatus({ type: "error", msg: data?.error || "Submission failed. Please try again." });
        return;
      }

      setStatus({ type: "success", msg: "Submitted! We’ll reach out shortly." });
      // 可选：提交成功后是否清空？第一版先不清空，避免用户觉得内容丢了
      // setInput(initialInput);
    } catch {
      setStatus({ type: "error", msg: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
    {/* Left: form */}
    <div className="md:col-span-7">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        {/* PROPERTY */}
        <div>
          <div className="text-sm font-semibold text-slate-900">Property</div>
          <div className="mt-1 text-xs text-slate-500">
            Enter basic property details to generate a preliminary range.
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <Field
            label="Property address"
            value={input.propertyAddress}
            placeholder="123 Main St, City, State"
            onChange={(v) => update("propertyAddress", v)}
          />

          {/* money inputs: 2 columns */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field
              label="Estimated property value"
              value={input.propertyValue}
              placeholder="950,000"
              kind="money"
              onChange={(v) => update("propertyValue", v)}
            />

            <Field
              label="Mortgage balance (if any)"
              value={input.mortgageBalance}
              placeholder="420,000"
              kind="money"
              onChange={(v) => update("mortgageBalance", v)}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Select
              label="Property type"
              value={input.propertyType}
              options={["Single family", "Condo", "2–4 units", "Other"]}
              onChange={(v) => update("propertyType", v)}
            />
            <Select
              label="Timeline"
              value={input.timeline}
              options={["ASAP", "2 weeks", "30 days", "Flexible"]}
              onChange={(v) => update("timeline", v)}
            />
          </div>

          <hr className="my-2 border-slate-200" />

          {/* CONTACT */}
          <div className="pt-2">
            <div className="text-sm font-semibold text-slate-900">Contact</div>
            <div className="mt-1 text-xs text-slate-500">
              Used only to confirm details and provide next steps.
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field
                label="Email"
                value={input.email}
                kind="email"
                placeholder="you@email.com"
                onChange={(v) => update("email", v)}
              />
              <Field
                label="Phone"
                value={input.phone}
                kind="tel"
                placeholder="(408) 555-7821"
                onChange={(v) => update("phone", v)}
              />
            </div>
          </div>

          {/* consent */}
          <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4"
              checked={input.consent}
              onChange={(e) => update("consent", e.target.checked)}
            />
            <div className="text-sm text-slate-700">
              <div className="font-semibold text-slate-900">Authorization</div>
              <div className="mt-1 text-slate-700">
                I confirm I am the property owner or authorized agent, and agree to be contacted.
              </div>
            </div>
          </label>

          {/* status */}
          {status ? (
            <div
              className={`rounded-xl border p-3 text-sm ${
                status.type === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                  : "border-rose-200 bg-rose-50 text-rose-900"
              }`}
            >
              {status.msg}
            </div>
          ) : null}

          {/* submit */}
          <button
            type="button"
            disabled={submitting}
            className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
            onClick={submit}
          >
            {submitting ? "Submitting..." : "Submit for Review"}
          </button>

          <p className="text-xs text-slate-500">
            Preliminary estimate only. Final terms depend on underwriting, title, and documentation.
          </p>
        </div>
      </div>
    </div>

    {/* Right: result */}
    <div className="md:col-span-5">
      <EstimateResult input={input} result={result} />
    </div>
  </div>
);
}

/* ----------------------------- UI helpers ----------------------------- */

function formatMoney(raw: string) {
  const cleaned = (raw || "").replace(/[^0-9]/g, "");
  if (!cleaned) return "";
  const n = Number(cleaned);
  if (!Number.isFinite(n)) return "";
  return n.toLocaleString("en-US");
}

function Field({
  label,
  value,
  placeholder,
  onChange,
  kind = "text",
}: {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
  kind?: "text" | "money" | "email" | "tel";
}) {
  const inputType =
    kind === "email" ? "email" : kind === "tel" ? "tel" : "text";

  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-slate-700">{label}</span>
      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5">
        {kind === "money" ? <span className="text-slate-400">$</span> : null}
        <input
          type={inputType}
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            const v = e.target.value;
            if (kind === "money") return onChange(formatMoney(v));
            onChange(v);
          }}
        />
      </div>
    </label>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-slate-700">{label}</span>
      <select
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}