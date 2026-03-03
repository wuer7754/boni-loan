// components/HomeFooter.tsx
import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function HomeFooter() {
  return (
    <section id="contact" className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="text-2xl font-semibold tracking-tight">Talk to a specialist</h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              If you have a tight closing timeline or a complex situation, we can review the scenario and outline next steps.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/estimate"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Get an Estimate <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <a
                href="mailto:hello@boni-loan.com"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Email us
              </a>
            </div>

            <div className="mt-8 text-xs text-slate-500">
              © {new Date().getFullYear()} Boni Loan. All rights reserved.
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-slate-900">What to prepare</div>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {[
                  "Property address + estimated value",
                  "Existing mortgage balance (if any)",
                  "Your timeline + exit plan (sell/refi/cash arrival)",
                ].map((t) => (
                  <li key={t} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-slate-900" />
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
                <div className="font-semibold">Tip</div>
                <div className="mt-1 text-amber-800">
                  A clear exit plan is the fastest way to get to a term sheet.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}