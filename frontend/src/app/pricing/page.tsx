import type { Metadata } from "next";
import Link from "next/link";
import { Check, Coffee, ShieldCheck, Zap, ArrowRight } from "lucide-react";
import { BmcLogo } from "@/components/BuyMeACoffee";

export const metadata: Metadata = {
  title: "Pricing | Free 30 Applications & Pay-What-You-Can",
  description:
    "First 30 job applications are completely free. Ongoing packs available through simple Buy Me a Coffee support. Transparent pricing, no recurring lock-in.",
  alternates: {
    canonical: "/pricing",
  },
};

export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-12 font-mono">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-block bg-black text-[#E2F952] px-3 py-0.5 text-xs font-bold uppercase tracking-widest">
          TRANSPARENT & HONEST
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-black uppercase tracking-tight">
          PRICING
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          No enterprise demo calls. No 14-day &ldquo;free trials&rdquo; that ask for your credit card.
          <br />
          Your first 30 applications are completely complimentary.
        </p>
      </div>

      {/* The 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Complimentary Tier */}
        <div className="border-2 border-black bg-white p-7 flex flex-col justify-between space-y-8 brutal-shadow">
          <div className="space-y-4">
            <div className="text-xs uppercase tracking-wider text-stone-500 font-extrabold">
              COMPLIMENTARY
            </div>
            <div className="text-5xl font-black text-black">$0</div>
            <p className="text-xs text-stone-600 leading-relaxed">
              First 30 job applications are 100% on the house. Test if I actually do the work.
            </p>

            <ul className="space-y-3 text-xs text-stone-800 pt-4 border-t-2 border-black">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                <span><strong>30 applications</strong> submitted</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                <span>Truth Database (0% hallucination)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                <span>Greenhouse, Lever & Ashby support</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                <span>Real-time tracking dashboard</span>
              </li>
            </ul>
          </div>

          <Link
            href="/resume"
            className="w-full text-center py-3.5 px-4 bg-stone-100 hover:bg-black hover:text-[#E2F952] border-2 border-black text-black text-xs uppercase font-extrabold transition-all"
          >
            Start with 30 free →
          </Link>
        </div>

        {/* $10 for 30 Tier */}
        <div className="border-2 border-black bg-[#E2F952]/20 p-7 flex flex-col justify-between space-y-8 brutal-shadow relative">
          <div className="absolute -top-3.5 right-4 bg-black text-[#E2F952] text-[10px] uppercase font-black px-2.5 py-0.5 border border-black">
            MOST POPULAR
          </div>

          <div className="space-y-4">
            <div className="text-xs uppercase tracking-wider text-black font-extrabold">
              THE NEXT 30
            </div>
            <div className="text-5xl font-black text-black">
              $10 <span className="text-xs font-normal text-stone-600">/ 30 apps</span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed">
              Ran through your first 30? Pay $10 and I will keep applying for another 30 openings.
            </p>

            <ul className="space-y-3 text-xs text-stone-900 pt-4 border-t-2 border-black">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-black stroke-[3]" />
                <span><strong>+30 more</strong> applications submitted</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-black stroke-[3]" />
                <span><strong>Weekly personal audit report</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-black stroke-[3]" />
                <span>Custom answers tailored per prompt</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-black stroke-[3]" />
                <span>Priority ATS form queue</span>
              </li>
            </ul>
          </div>

          <a
            href="https://buymeacoffee.com/hermanify"
            target="_blank"
            rel="noreferrer"
            className="w-full text-center py-3.5 px-4 bg-black hover:bg-stone-800 text-[#E2F952] text-xs uppercase font-black transition-all border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2"
          >
            <span>Get 30 more for $10 →</span>
          </a>
        </div>

        {/* Weekly Report Tier */}
        <div className="border-2 border-black bg-white p-7 flex flex-col justify-between space-y-8 brutal-shadow">
          <div className="space-y-4">
            <div className="text-xs uppercase tracking-wider text-stone-500 font-extrabold">
              WEEKLY PERSONAL REPORT
            </div>
            <div className="text-5xl font-black text-black">
              FREE
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Delivered automatically after 1 full week of applications.
            </p>

            <ul className="space-y-3 text-xs text-stone-800 pt-4 border-t-2 border-black">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                <span>Full breakdown of every application URL</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                <span>Response rate & interview alert analysis</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                <span>Salary and title distribution</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                <span>Action items for stalled applications</span>
              </li>
            </ul>
          </div>

          <Link
            href="/dashboard"
            className="w-full text-center py-3.5 px-4 bg-stone-100 hover:bg-stone-200 border-2 border-black text-black text-xs uppercase font-extrabold transition-all"
          >
            View report on dashboard →
          </Link>
        </div>
      </div>

      {/* Buy Me A Coffee Official Banner */}
      <div className="border-2 border-black bg-[#FFDD00]/25 p-8 brutal-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 bg-black text-[#FFDD00] px-3 py-1 text-xs uppercase font-extrabold">
            <BmcLogo className="w-3.5 h-3.5" />
            Buy Me A Coffee // @hermanify
          </div>
          <h2 className="text-2xl font-black uppercase text-black">
            Liking the honesty? Support the robot.
          </h2>
          <p className="text-xs text-stone-700 leading-relaxed">
            I build and maintain these job automation adapters so you never have to retype your work history on Workday again.
            Buy me a coffee or pay for your next batch of 30 applications directly.
          </p>
        </div>

        <a
          href="https://buymeacoffee.com/hermanify"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2.5 bg-[#FFDD00] text-black font-black px-7 py-4 border-2 border-black text-xs uppercase tracking-wider hover:bg-amber-400 transition-all brutal-shadow hover:translate-x-0.5 hover:translate-y-0.5 whitespace-nowrap"
        >
          <BmcLogo className="w-4 h-5 text-black" />
          <span>Buy me a coffee ☕</span>
        </a>
      </div>
    </div>
  );
}
