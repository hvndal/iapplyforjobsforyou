"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  ArrowRight,
  Check,
  RefreshCw,
  Sparkles,
  Zap,
  Terminal,
  ShieldCheck,
  Send,
  Coffee,
  CheckCircle2
} from "lucide-react";
import { BmcLogo } from "@/components/BuyMeACoffee";

interface MockSim {
  company: string;
  role: string;
  ats: string;
  salary: string;
  fieldsFilled: number;
  answerPreview: string;
  timeTaken: string;
}

const simExamples: MockSim[] = [
  {
    company: "Linear",
    role: "Senior Frontend Engineer",
    ats: "Ashby",
    salary: "$165,000 - $190,000",
    fieldsFilled: 14,
    answerPreview: "Answered 'Why Linear?': Grounded in user's 4 years of TypeScript & high-performance React UI builds.",
    timeTaken: "1.6s",
  },
  {
    company: "Supabase",
    role: "Full Stack Developer",
    ats: "Lever",
    salary: "$150,000 - $180,000",
    fieldsFilled: 19,
    answerPreview: "Answered 'Postgres experience?': Factual history extracted: 3 years building relational database schemas.",
    timeTaken: "2.1s",
  },
  {
    company: "Vercel",
    role: "Developer Experience Engineer",
    ats: "Greenhouse",
    salary: "$160,000 - $195,000",
    fieldsFilled: 22,
    answerPreview: "Answered 'Next.js projects shipped': Pulled 3 live production apps directly from verified resume.",
    timeTaken: "1.9s",
  },
  {
    company: "Stripe",
    role: "Frontend Engineer - Billing",
    ats: "Greenhouse",
    salary: "$170,000 - $210,000",
    fieldsFilled: 26,
    answerPreview: "Checked work authorization: Verified US/Canada authorized. Zero hallucinated clearance.",
    timeTaken: "2.4s",
  },
];

export function MotionHero() {
  const [simIndex, setSimIndex] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const currentSim = simExamples[simIndex];

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setSimIndex((prev) => (prev + 1) % simExamples.length);
      setIsSimulating(false);
      // Trigger festive confetti blast on completion
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.65 },
        colors: ["#E2F952", "#000000", "#FFDD00", "#10B981"],
      });
    }, 600);
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-6 pt-16 pb-12 font-mono">
      {/* Hero Headline & Intro */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center text-center space-y-6"
      >
        {/* Animated Badge Pill */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="inline-flex items-center gap-2 border-2 border-black bg-white px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-widest brutal-shadow-sm cursor-default"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#E2F952] border border-black animate-pulse" />
          <span>INTERNET UTILITY // NO BULLSHIT</span>
          <span className="text-stone-300">•</span>
          <span className="text-emerald-700">30 APPS FREE</span>
        </motion.div>

        {/* Hero Title */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-black leading-[0.95] max-w-4xl uppercase select-none">
          I APPLY FOR JOBS FOR YOU.
        </h1>

        {/* Subhead with highlighter accent */}
        <div className="text-xl sm:text-2xl text-stone-800 max-w-2xl leading-snug space-y-1.5">
          <p>You find the job.</p>
          <p>
            <span className="bg-[#E2F952] px-3 py-1 border-2 border-black font-black text-black inline-block -rotate-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              I apply to it.
            </span>
          </p>
        </div>

        <p className="text-stone-600 text-sm sm:text-base max-w-xl pt-2 leading-relaxed">
          Give me your resume. Tell me what you want.
          <br />
          I&apos;ll handle the annoying shit so you can go live your actual life.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
          <Link
            href="/resume"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#E2F952] text-black px-8 py-4 text-sm uppercase font-black tracking-wider border-2 border-black brutal-shadow hover:bg-black hover:text-[#E2F952] transition-all"
          >
            <span>Give me your resume →</span>
          </Link>

          <a
            href="https://buymeacoffee.com/hermanify"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#FFDD00] text-black px-7 py-4 text-sm uppercase font-black tracking-wider border-2 border-black brutal-shadow hover:bg-black hover:text-[#FFDD00] transition-all"
          >
            <BmcLogo className="w-4 h-5 text-black" />
            <span>Buy me a coffee ☕</span>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 pt-4 text-xs text-stone-600">
          <span className="flex items-center gap-1.5 font-bold text-black">
            <Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> 30 Applications Free
          </span>
          <span className="flex items-center gap-1.5 font-bold text-black">
            <Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> 0% Hallucination Policy
          </span>
          <span className="flex items-center gap-1.5 font-bold text-black">
            <Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> Greenhouse, Lever & Ashby
          </span>
        </div>
      </motion.div>

      {/* Interactive Application Terminal Widget with Motion */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-14 border-2 border-black bg-white brutal-shadow-lg overflow-hidden"
      >
        {/* Terminal Header */}
        <div className="bg-black text-white px-4 py-3 flex items-center justify-between border-b-2 border-black text-xs">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 border border-black" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-black" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black" />
            </div>
            <span className="font-bold tracking-wider uppercase ml-2 text-stone-300">
              LIVE AUTOMATION TERMINAL // REAL FLOW
            </span>
          </div>

          <button
            onClick={handleSimulate}
            disabled={isSimulating}
            className="flex items-center gap-2 bg-stone-800 hover:bg-[#E2F952] hover:text-black text-white px-3 py-1.5 text-xs font-black uppercase transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? "animate-spin" : ""}`} />
            <span>Simulate Next Application ↻</span>
          </button>
        </div>

        {/* Terminal Content Area */}
        <div className="p-6 sm:p-8 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSim.company}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-dashed border-stone-300 pb-5">
                <div>
                  <div className="text-[11px] uppercase font-bold text-stone-500">
                    TARGET JOB #{simIndex + 1}
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-black">
                    {currentSim.role}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-stone-700 mt-1">
                    <span className="text-black font-extrabold">{currentSim.company}</span>
                    <span>•</span>
                    <span className="bg-stone-100 border border-black px-1.5 py-0.5 text-[10px]">
                      {currentSim.ats}
                    </span>
                    <span>•</span>
                    <span className="text-emerald-800 font-extrabold">{currentSim.salary}</span>
                  </div>
                </div>

                <div className="sm:text-right">
                  <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-950 border-2 border-emerald-500 px-3 py-1 text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    SUBMITTED IN {currentSim.timeTaken}
                  </span>
                  <div className="text-[10px] text-stone-500 mt-1">Confirmed with receipt & logged</div>
                </div>
              </div>

              {/* 3 Step Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="border-2 border-black p-4 bg-stone-50 space-y-1 brutal-shadow-sm">
                  <span className="text-[10px] text-stone-500 font-bold uppercase block">
                    STEP 01: EXTRACT FORM
                  </span>
                  <div className="font-extrabold text-black">
                    {currentSim.fieldsFilled} Form Inputs Parsed
                  </div>
                  <div className="text-stone-600 text-[11px] leading-relaxed">
                    Deterministic Playwright selectors for {currentSim.ats}.
                  </div>
                </div>

                <div className="border-2 border-black p-4 bg-stone-50 space-y-1 brutal-shadow-sm">
                  <span className="text-[10px] text-stone-500 font-bold uppercase block">
                    STEP 02: GROUNDED REASONING
                  </span>
                  <div className="font-extrabold text-black">
                    Zero Hallucination
                  </div>
                  <div className="text-stone-600 text-[11px] leading-relaxed">
                    {currentSim.answerPreview}
                  </div>
                </div>

                <div className="border-2 border-black p-4 bg-[#E2F952]/30 space-y-1 brutal-shadow-sm">
                  <span className="text-[10px] text-black font-black uppercase block">
                    STEP 03: SUBMISSION
                  </span>
                  <div className="font-extrabold text-emerald-900">
                    ✓ Verified & Synced
                  </div>
                  <div className="text-stone-700 text-[11px] leading-relaxed">
                    Uploaded resume PDF, captured receipt, and synced to dashboard.
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
