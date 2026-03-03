import EstimateForm from "./EstimateForm";

export default function EstimatePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Header */}
        <div className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
            Secure • Privacy-first • No obligation
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Full Estimate
          </h1>

          <p className="mt-2 max-w-2xl text-slate-600">
            Enter your property details to generate a preliminary loan range. Final terms depend on
            underwriting, title, and documentation.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 text-sm text-slate-700 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
              <div className="text-xs font-semibold text-slate-500">Time</div>
              <div className="mt-1 font-semibold text-slate-900">2–3 minutes</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
              <div className="text-xs font-semibold text-slate-500">Credit</div>
              <div className="mt-1 font-semibold text-slate-900">No impact to estimate</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
              <div className="text-xs font-semibold text-slate-500">Output</div>
              <div className="mt-1 font-semibold text-slate-900">Estimated range + next steps</div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="mt-8">
          <EstimateForm />
        </div>

        {/* Footer note */}
        <div className="mt-10 text-xs text-slate-500">
          This page provides an initial estimate only and does not constitute an offer to lend.
        </div>
      </div>
    </main>
  );
}