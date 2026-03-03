// components/HomeSections.tsx
import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function HomeSections() {
  return (
    <>
      {/* Scenario Blocks */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Built for real-world timing gaps</h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              Banks are great for long-term financing. We exist for the moments when time, paperwork,
              or complex capital timing makes a fast bridge the practical choice.
            </p>
          </div>
          <Link href="/estimate" className="hidden text-sm font-semibold text-slate-900 hover:underline md:block">
            Get started →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <ScenarioCard
            title="Bridge to Close"
            desc="Secure a property quickly when timelines are tight."
            bullets={["Fast underwriting path", "Asset-first review", "Clear closing checklist"]}
          />
          <ScenarioCard
            title="Bridge to Refinance"
            desc="Close now, refinance later when bank approval lands."
            bullets={["Short terms", "Exit plan required", "Transparent milestones"]}
          />
          <ScenarioCard
            title="Bridge to Cash Arrival"
            desc="Funds are coming—but not in time for the closing date."
            bullets={["Structured bridging", "Documented source of funds", "Property-backed protection"]}
          />
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-semibold tracking-tight">How it works</h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            A straightforward process designed to be fast, clear, and underwriting-ready.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4">
            <StepCard step="01" title="Quick estimate" desc="Address + value + mortgage. Get an estimated range." />
            <StepCard step="02" title="Underwriting review" desc="We confirm property details and your exit plan." />
            <StepCard step="03" title="Term sheet" desc="Clear terms, fees, and conditions — no surprises." />
            <StepCard step="04" title="Close" desc="Coordinate closing with your timeline and escrow." />
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <div className="text-sm font-semibold text-slate-900">Typical timeline</div>
                <div className="mt-1 text-sm text-slate-600">
                  Day 0 estimate → Day 1–3 review → Day 7–14 close (case dependent)
                </div>
              </div>
              <Link
                href="/estimate"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Get an Estimate <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-semibold tracking-tight">Loan programs</h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Keep it simple: a few clear programs with transparent underwriting requirements.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <ProgramCard
            title="Owner-Occupied Bridge"
            desc="For homeowners needing a short-term bridge for timing gaps."
            tags={["Asset-backed", "Short term", "Exit plan required"]}
          />
          <ProgramCard
            title="Investor Bridge"
            desc="For investors bridging to refinance, sale, or incoming capital."
            tags={["Fast", "Property-first", "Clear milestones"]}
          />
          <ProgramCard
            title="Equity Access"
            desc="For owners looking to unlock equity with a structured plan."
            tags={["Structured", "Transparent terms", "Underwriting review"]}
          />
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <div className="text-sm font-semibold text-slate-900">Important</div>
          <p className="mt-2 text-sm text-slate-600">
            All estimates are preliminary and subject to underwriting, property review, and title considerations.
            This site does not offer payday loans or credit cards.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-semibold tracking-tight">FAQ</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <FaqItem
              q="Is the estimate a guaranteed offer?"
              a="No. It’s an initial range based on inputs. A final offer depends on underwriting, property review, and a documented exit plan."
            />
            <FaqItem
              q="Do you run a credit check for the estimate?"
              a="Not for the initial estimate. If you proceed to underwriting, additional verification may be requested depending on the scenario."
            />
            <FaqItem
              q="How fast can you close?"
              a="Many bridge loans close in 7–14 days, depending on property, title, and document readiness."
            />
            <FaqItem
              q="What properties do you consider?"
              a="Single-family, condos, and small multi-unit properties are common. Eligibility depends on location, condition, and underwriting."
            />
          </div>
        </div>
      </section>
    </>
  );
}

/* ----------------------------- Local helpers ----------------------------- */

function ScenarioCard({ title, desc, bullets }: { title: string; desc: string; bullets: string[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      <p className="mt-2 text-sm text-slate-600">{desc}</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-700">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-slate-900" />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

function StepCard({ step, title, desc }: { step: string; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="text-xs font-semibold text-amber-800">{step}</div>
      <div className="mt-2 text-sm font-semibold text-slate-900">{title}</div>
      <div className="mt-2 text-sm text-slate-600">{desc}</div>
    </div>
  );
}

function ProgramCard({ title, desc, tags }: { title: string; desc: string; tags: string[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      <p className="mt-2 text-sm text-slate-600">{desc}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="text-sm font-semibold text-slate-900">{q}</div>
      <div className="mt-2 text-sm text-slate-600">{a}</div>
    </div>
  );
}