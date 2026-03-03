// components/HomeHero.tsx
import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Clock3,
  ShieldCheck,
  Sparkles,
  MapPin,
  BadgeCheck,
  PhoneCall,
  CheckCircle2,
} from "lucide-react";

export default function HomeHero() {
  return (
    <>
      {/* Top Announcement / Trust Bar */}
      <div className="w-full border-b border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <BadgeCheck className="h-4 w-4" />
            <span>Asset-backed bridge capital • Transparent terms • Privacy-first</span>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <PhoneCall className="h-4 w-4" />
            <span>Talk to a specialist: (xxx) xxx-xxxx</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-900 text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">Boni Loan</div>
              <div className="text-xs text-slate-500">Property-backed bridge capital</div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-slate-700 md:flex">
            <Link className="hover:text-slate-900" href="#how-it-works">
              How it works
            </Link>
            <Link className="hover:text-slate-900" href="#programs">
              Programs
            </Link>
            <Link className="hover:text-slate-900" href="#faq">
              FAQ
            </Link>
            <Link className="hover:text-slate-900" href="#contact">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/estimate"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
            >
              Get an Estimate <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-slate-100 blur-3xl" />
          <div className="absolute -right-40 -bottom-40 h-[520px] w-[520px] rounded-full bg-amber-100/60 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.04),transparent_55%)]" />
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-14 md:grid-cols-12 md:py-20">
          {/* Left copy */}
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600">
              <ShieldCheck className="h-4 w-4" />
              <span>No obligation • No credit impact for estimate</span>
            </div>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
              Fast Bridge Capital,
              <span className="block text-slate-900">Backed by Your Property</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
              Get a quick estimate in minutes. We focus on the asset, your timeline,
              and a clear exit plan—so you can close, refinance, or bridge to incoming cash.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/estimate"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
              >
                Get an Estimate <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                See How It Works
              </Link>
            </div>

            {/* Trust bullets */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <TrustPill icon={<Clock3 className="h-4 w-4" />} title="Speed" desc="Typical 7–14 days" />
              <TrustPill icon={<Building2 className="h-4 w-4" />} title="Asset-Based" desc="Property-first review" />
              <TrustPill icon={<ShieldCheck className="h-4 w-4" />} title="Transparent" desc="Clear terms & steps" />
            </div>
          </div>

          {/* Right quick estimator card */}
          <div className="md:col-span-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-semibold text-slate-900">Quick Estimate</div>
                  <div className="mt-1 text-xs text-slate-500">
                    Start with the basics — we’ll refine after review.
                  </div>
                </div>
                <div className="rounded-xl bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-800">
                  2–3 minutes
                </div>
              </div>

              <form className="mt-4 space-y-3">
                <Field
                  label="Property address"
                  placeholder="Start typing an address…"
                  icon={<MapPin className="h-4 w-4" />}
                />
                <Field label="Estimated property value" placeholder="$" />
                <Field label="Mortgage balance (if any)" placeholder="$" />
                <div className="grid grid-cols-2 gap-3">
                  <Select label="Property type" options={["Single family", "Condo", "2–4 units", "Other"]} />
                  <Select label="Timeline" options={["ASAP", "2 weeks", "30 days", "Flexible"]} />
                </div>

                <Link
                  href="/estimate"
                  className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Continue to Full Estimate <ArrowRight className="ml-2 h-4 w-4" />
                </Link>

                <p className="text-xs text-slate-500">
                  By continuing, you confirm you are the property owner or authorized agent.
                </p>
              </form>
            </div>

            {/* small proof card */}
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="text-sm font-semibold text-slate-900">What you’ll get</div>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {[
                  "Estimated loan range (not a single number)",
                  "Suggested LTV + next-step checklist",
                  "Optional call for underwriting review",
                ].map((t) => (
                  <li key={t} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-slate-900" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ----------------------------- UI Helpers ----------------------------- */

function TrustPill({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-50 text-slate-900">
        {icon}
      </div>
      <div className="leading-tight">
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-slate-500">{desc}</div>
      </div>
    </div>
  );
}

function Field({
  label,
  placeholder,
  icon,
}: {
  label: string;
  placeholder: string;
  icon?: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-slate-700">{label}</span>
      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5">
        {icon ? <span className="text-slate-400">{icon}</span> : null}
        <input
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          placeholder={placeholder}
        />
      </div>
    </label>
  );
}

function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-slate-700">{label}</span>
      <select className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none">
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}