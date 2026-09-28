"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  X,
  ShieldCheck,
  Terminal,
  Zap,
  RefreshCw,
  Copy,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Mail,
  Loader2,
  Coffee
} from "lucide-react";
import { BmcLogo, BuyMeACoffeeButton } from "@/components/BuyMeACoffee";

interface MockSim {
  company: string;
  role: string;
  ats: string;
  salary: string;
  location: string;
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
    location: "Remote (Global)",
    fieldsFilled: 14,
    answerPreview: "Answered 'Why Linear?': Grounded in user's 4 years of TypeScript & high-performance React UI builds.",
    timeTaken: "1.6s",
  },
  {
    company: "Supabase",
    role: "Full Stack Developer",
    ats: "Lever",
    salary: "$150,000 - $180,000",
    location: "Remote (Americas/EU)",
    fieldsFilled: 19,
    answerPreview: "Answered 'Postgres experience?': Factual history extracted: 3 years building relational database schemas.",
    timeTaken: "2.1s",
  },
  {
    company: "Vercel",
    role: "Developer Experience Engineer",
    ats: "Greenhouse",
    salary: "$160,000 - $195,000",
    location: "Remote (US/Canada)",
    fieldsFilled: 22,
    answerPreview: "Answered 'Next.js projects shipped': Pulled 3 live production apps directly from verified resume.",
    timeTaken: "1.9s",
  },
  {
    company: "Stripe",
    role: "Frontend Engineer - Billing",
    ats: "Greenhouse",
    salary: "$170,000 - $210,000",
    location: "Remote / Hybrid",
    fieldsFilled: 26,
    answerPreview: "Checked work authorization: Verified US/Canada authorized. Zero hallucinated clearance.",
    timeTaken: "2.4s",
  },
];

export default function Home() {
  const [simIndex, setSimIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const currentSim = simExamples[simIndex];

  // Quick inquiry state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const nextSim = () => {
    setSimIndex((prev) => (prev + 1) % simExamples.length);
  };

  const copyQuote = () => {
    navigator.clipboard.writeText(
      "I applied to 37 jobs today without applying to a single fucking job. https://iapplyforjobsforyou.vercel.app"
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleQuickContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          message: contactMsg,
          type: "homepage_query",
          subject: `[Homepage Inquiry] from ${contactName || contactEmail}`,
        }),
      });
      if (res.ok) {
        setSentSuccess(true);
        setContactName("");
        setContactEmail("");
        setContactMsg("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* 1. HERO SECTION */}
      <section className="w-full max-w-5xl mx-auto px-6 pt-16 pb-20">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 border-2 border-black bg-white px-3 py-1 font-mono text-[11px] font-extrabold uppercase tracking-widest brutal-shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#E2F952]" />
            <span>INTERNET UTILITY</span>
            <span className="text-stone-300">•</span>
            <span>NO CAREER-COPILOT BULLSHIT</span>
          </div>

          {/* Main Giant Headline */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-black font-mono leading-[0.95] max-w-4xl uppercase">
            I APPLY FOR JOBS FOR YOU.
          </h1>

          {/* Subheading */}
          <div className="font-mono text-xl sm:text-2xl text-stone-700 max-w-2xl leading-snug space-y-1 pt-2">
            <p>You find the job.</p>
            <p>
              <span className="bg-[#E2F952] px-2 py-0.5 border border-black font-extrabold text-black">
                I apply to it.
              </span>
            </p>
          </div>

          <p className="text-stone-600 text-sm sm:text-base max-w-xl font-mono pt-2">
            Give me your resume. Tell me what you want.
            <br />
            I&apos;ll handle the annoying shit so you can go live your life.
          </p>

          {/* Action CTAs & Upfront BMC Embed */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
            <Link
              href="/resume"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#E2F952] text-black px-8 py-4 font-mono text-sm uppercase font-extrabold tracking-wider border-2 border-black brutal-shadow hover:bg-black hover:text-[#E2F952] transition-all"
            >
              Give me your resume →
            </Link>

            <a
              href="https://buymeacoffee.com/hermanify"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#FFDD00] text-black px-7 py-4 font-mono text-sm uppercase font-black tracking-wider border-2 border-black brutal-shadow hover:bg-black hover:text-[#FFDD00] transition-all"
            >
              <BmcLogo className="w-4 h-5 text-black" />
              <span>Buy me a coffee ☕</span>
            </a>
          </div>

          {/* Mini Trust Bar */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 pt-4 font-mono text-xs text-stone-500">
            <span className="flex items-center gap-1.5 font-bold text-black">
              <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" /> 30 Applications Free
            </span>
            <span className="flex items-center gap-1.5 font-bold text-black">
              <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" /> 0% Hallucination Policy
            </span>
            <span className="flex items-center gap-1.5 font-bold text-black">
              <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" /> Greenhouse, Lever & Ashby
            </span>
          </div>
        </div>

        {/* 2. INTERACTIVE LIVE APPLICATION SIMULATOR WIDGET */}
        <div className="mt-14 border-2 border-black bg-white brutal-shadow-lg overflow-hidden font-mono">
          {/* Terminal Window Header */}
          <div className="bg-black text-white px-4 py-2.5 flex items-center justify-between border-b-2 border-black text-xs">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 border border-black" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-black" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black" />
              </div>
              <span className="font-bold tracking-wider uppercase ml-2 text-stone-300">
                LIVE DEMO // REAL APPLICATION FLOW
              </span>
            </div>

            <button
              onClick={nextSim}
              className="flex items-center gap-1.5 bg-stone-800 hover:bg-[#E2F952] hover:text-black text-white px-2.5 py-1 text-[11px] font-bold uppercase transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              Next Target Company
            </button>
          </div>

          {/* Simulator Content */}
          <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-dashed border-stone-200 pb-4">
              <div>
                <div className="text-[11px] uppercase font-bold text-stone-400">
                  TARGET OPPORTUNITY #{simIndex + 1}
                </div>
                <div className="text-xl sm:text-2xl font-black text-black">
                  {currentSim.role}
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-stone-600 mt-1">
                  <span>{currentSim.company}</span>
                  <span>•</span>
                  <span>{currentSim.ats} Board</span>
                  <span>•</span>
                  <span className="text-emerald-700">{currentSim.salary}</span>
                </div>
              </div>

              <div className="sm:text-right">
                <span className="inline-block bg-emerald-100 text-emerald-950 border border-emerald-400 px-2.5 py-1 text-xs font-extrabold uppercase">
                  ✓ SUBMITTED IN {currentSim.timeTaken}
                </span>
                <div className="text-[11px] text-stone-400 mt-1">No human intervention required</div>
              </div>
            </div>

            {/* Simulated Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="border border-black p-3 bg-stone-50 space-y-1">
                <span className="text-[10px] text-stone-500 font-bold uppercase block">
                  STEP 01: EXTRACT FORM
                </span>
                <div className="font-bold text-black">
                  {currentSim.fieldsFilled} Form Fields Parsed
                </div>
                <div className="text-stone-600 text-[11px]">
                  Greenhouse / Ashby schema mapped deterministically.
                </div>
              </div>

              <div className="border border-black p-3 bg-stone-50 space-y-1">
                <span className="text-[10px] text-stone-500 font-bold uppercase block">
                  STEP 02: GROUNDED ANSWERS
                </span>
                <div className="font-bold text-black">
                  Strictly Verified Facts
                </div>
                <div className="text-stone-600 text-[11px]">
                  {currentSim.answerPreview}
                </div>
              </div>

              <div className="border border-black p-3 bg-stone-50 space-y-1">
                <span className="text-[10px] text-stone-500 font-bold uppercase block">
                  STEP 03: SUBMISSION
                </span>
                <div className="font-bold text-emerald-800">
                  ✓ Confirmed & Logged
                </div>
                <div className="text-stone-600 text-[11px]">
                  Uploaded resume PDF, captured receipt, and synced to dashboard.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE PHILOSOPHY / FUCK LINKEDIN SECTION */}
      <section className="w-full border-y-2 border-black bg-black text-white py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-10 font-mono">
          <div className="space-y-4">
            <div className="inline-block bg-[#E2F952] text-black px-3 py-1 text-xs uppercase font-extrabold tracking-widest">
              THE UNAPOLOGETIC MOTTO
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white">
              FUCK LINKEDIN.
            </h2>
            <p className="text-stone-300 text-base sm:text-lg max-w-3xl leading-relaxed">
              Seriously. You don&apos;t need another personal branding masterclass.
              You don&apos;t need to write 8 paragraphs on &ldquo;What getting rejected taught me about B2B SaaS.&rdquo;
              You don&apos;t need to retype your work history into 40 tiny boxes.
            </p>
          </div>

          {/* Comparison Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {/* The LinkedIn Nightmare */}
            <div className="border-2 border-stone-800 bg-stone-950 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <span className="text-xs uppercase font-bold text-rose-400">
                  THE MODERN JOB HUNT NIGHTMARE
                </span>
                <X className="w-4 h-4 text-rose-500" />
              </div>
              <ul className="space-y-3 text-xs text-stone-400">
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>45 minutes spent retyping your resume into Workday or Taleo.</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>Writing fake cover letters pretending you&apos;ve loved the company since childhood.</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>Awkward cold messages: &ldquo;Hey quick question! Hope you are crushing Q3!&rdquo;</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>Getting ghosted after 60 applications with nothing to show for it.</span>
                </li>
              </ul>
            </div>

            {/* The Literal Way */}
            <div className="border-2 border-[#E2F952] bg-stone-900 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <span className="text-xs uppercase font-bold text-[#E2F952]">
                  I APPLY FOR JOBS FOR YOU
                </span>
                <Check className="w-4 h-4 text-[#E2F952]" />
              </div>
              <ul className="space-y-3 text-xs text-stone-200">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#E2F952] shrink-0 mt-0.5" />
                  <span>Upload your resume once into the Truth Database.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#E2F952] shrink-0 mt-0.5" />
                  <span>I fill every field, answer free-text questions, and upload the PDF.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#E2F952] shrink-0 mt-0.5" />
                  <span>Zero fabricated facts. If I get stuck on something unknown, I ask you.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#E2F952] shrink-0 mt-0.5" />
                  <span>You go outside, live your life, and check the dashboard for interviews.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DIVISION OF LABOR (YOU / ME / YOU) */}
      <section className="w-full max-w-5xl mx-auto px-6 py-20 font-mono">
        <div className="text-center space-y-2 mb-12">
          <div className="text-xs uppercase font-extrabold tracking-widest text-stone-500">
            HOW IT ACTUALLY WORKS
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black">
            THE DIVISION OF LABOR
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: You */}
          <div className="border-2 border-black bg-white p-6 brutal-shadow flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-block bg-black text-white px-2 py-0.5 text-xs font-bold uppercase">
                01 • YOU
              </div>
              <h3 className="text-xl font-bold uppercase text-black">
                Upload & Specify
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Drop your resume. Tell me what you want:
              </p>
              <ul className="text-xs space-y-2 text-stone-800 list-disc pl-4">
                <li>Target titles (e.g. Frontend Engineer)</li>
                <li>Workplace (Remote, Hybrid, Onsite)</li>
                <li>Minimum salary floor (e.g. $120k+)</li>
                <li>Locations you are legally allowed to work</li>
              </ul>
            </div>
            <div className="text-[11px] text-stone-400 border-t border-stone-200 pt-3">
              Takes ~60 seconds once.
            </div>
          </div>

          {/* Card 2: Me */}
          <div className="border-2 border-black bg-[#E2F952]/20 p-6 brutal-shadow flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-block bg-black text-[#E2F952] px-2 py-0.5 text-xs font-bold uppercase">
                02 • ME
              </div>
              <h3 className="text-xl font-bold uppercase text-black">
                I Do The Annoying Shit
              </h3>
              <p className="text-xs text-stone-700 leading-relaxed">
                I do everything a human recruiter-assistant would do:
              </p>
              <ol className="text-xs space-y-2 text-stone-900 list-decimal pl-4 font-bold">
                <li>Scan Greenhouse, Lever & Ashby</li>
                <li>Match descriptions with your verified history</li>
                <li>Autofill form inputs & upload resume</li>
                <li>Answer prompts grounded in verified facts</li>
                <li>Submit application and record confirmation</li>
              </ol>
            </div>
            <div className="text-[11px] text-stone-500 border-t border-stone-300 pt-3">
              Automated deterministic Playwright execution.
            </div>
          </div>

          {/* Card 3: You */}
          <div className="border-2 border-black bg-white p-6 brutal-shadow flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-block bg-black text-white px-2 py-0.5 text-xs font-bold uppercase">
                03 • YOU
              </div>
              <h3 className="text-xl font-bold uppercase text-black">
                Go Live Your Life
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Go make coffee. Play games. Hang out with your family.
              </p>
              <div className="p-3 bg-stone-100 border border-black text-xs text-stone-800 space-y-1">
                <div><strong>If I get stuck:</strong> I ping you.</div>
                <div><strong>If they reject you:</strong> I move on.</div>
                <div><strong>If you get an interview:</strong> I tell you.</div>
              </div>
            </div>
            <div className="text-[11px] text-stone-400 border-t border-stone-200 pt-3">
              Zero babysitting needed.
            </div>
          </div>
        </div>
      </section>

      {/* 5. ZERO HALLUCINATION POLICY */}
      <section className="w-full bg-white border-y-2 border-black py-16 px-6 font-mono">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center gap-2 text-xs uppercase font-extrabold text-stone-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Core Philosophy
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black">
            I WON&apos;T MAKE SHIT UP ABOUT YOU.
          </h2>
          <p className="text-stone-700 text-sm sm:text-base max-w-3xl leading-relaxed">
            If an application asks: <em>&ldquo;Do you have 5 years of Kubernetes?&rdquo;</em> and your Truth Profile says 2 years,
            I say 2 years. I will never claim you have skills you don&apos;t possess just to pass a filter.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
            <div className="border-2 border-black p-4 bg-stone-50">
              <div className="font-extrabold text-emerald-800 uppercase mb-1">
                ✓ KNOWN FACTS
              </div>
              <div className="text-stone-600">
                Safe to submit instantly (name, work authorization, verified skills, real employment dates).
              </div>
            </div>

            <div className="border-2 border-black p-4 bg-stone-50">
              <div className="font-extrabold text-amber-800 uppercase mb-1">
                ⚡ INFERRED REASONING
              </div>
              <div className="text-stone-600">
                Only genuine, low-risk answers strictly supported by your actual past projects.
              </div>
            </div>

            <div className="border-2 border-black p-4 bg-stone-50">
              <div className="font-extrabold text-rose-800 uppercase mb-1">
                ⚠ UNKNOWN / STUCK
              </div>
              <div className="text-stone-600">
                I pause immediately. I mark &ldquo;I got stuck&rdquo; on your dashboard. You answer once, I remember forever.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. UPFRONT BUY ME A COFFEE & DIRECT SALES INQUIRY */}
      <section className="w-full max-w-5xl mx-auto px-6 py-16 font-mono space-y-10">
        {/* Upfront Official BMC Card */}
        <div className="border-2 border-black bg-[#FFDD00]/20 p-8 brutal-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 bg-black text-[#FFDD00] px-3 py-1 text-xs font-black uppercase">
              <BmcLogo className="w-3.5 h-3.5" />
              OFFICIAL SUPPORT // @HERMANIFY
            </div>
            <h3 className="text-2xl font-black uppercase text-black">
              Support The Creator / Buy Me A Coffee
            </h3>
            <p className="text-xs text-stone-700 leading-relaxed">
              If this tool saved you 4 hours of filling repetitive ATS boxes, consider buying me a coffee or grabbing your next 30 applications directly.
            </p>
          </div>

          <a
            href="https://buymeacoffee.com/hermanify"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#FFDD00] text-black font-black px-7 py-4 border-2 border-black text-xs uppercase tracking-wider hover:bg-black hover:text-[#FFDD00] transition-all brutal-shadow hover:translate-x-0.5 hover:translate-y-0.5 whitespace-nowrap"
          >
            <BmcLogo className="w-4 h-5" />
            <span>buymeacoffee.com/hermanify →</span>
          </a>
        </div>

        {/* Backend Query / Contact Form -> sales@mander.tech */}
        <div className="border-2 border-black bg-white p-8 brutal-shadow space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-black pb-4 gap-2">
            <div>
              <div className="text-[10px] uppercase font-bold text-stone-500 tracking-widest">
                DIRECT INQUIRY // ROUTED TO SALES@MANDER.TECH
              </div>
              <h3 className="text-xl font-black uppercase text-black">
                Have a question or custom application request?
              </h3>
            </div>
            <div className="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-1">
              Transfer guaranteed to sales@mander.tech
            </div>
          </div>

          {sentSuccess ? (
            <div className="p-5 bg-emerald-100 border-2 border-black text-xs text-emerald-950 font-bold flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-700 stroke-[3]" />
              <span>
                Your message was successfully transferred to <strong>sales@mander.tech</strong>! I will reply directly to your email shortly.
              </span>
            </div>
          ) : (
            <form onSubmit={handleQuickContact} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase font-bold mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full border-2 border-black p-3 bg-stone-50 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block uppercase font-bold mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full border-2 border-black p-3 bg-stone-50 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase font-bold mb-1">Message / Target Job Criteria</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Ask a question, request a specific job board adapter, or describe your target role..."
                  value={contactMsg}
                  onChange={(e) => setContactMsg(e.target.value)}
                  className="w-full border-2 border-black p-3 bg-stone-50 focus:bg-white focus:outline-none font-sans text-xs"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={sending}
                className="bg-black text-[#E2F952] px-6 py-3.5 font-mono text-xs uppercase font-extrabold tracking-wider border-2 border-black brutal-shadow-sm hover:bg-stone-800 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {sending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transferring to sales@mander.tech...</span>
                  </>
                ) : (
                  <span>Send query to sales@mander.tech →</span>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 7. SHAREABLE / VIRAL QUOTE */}
      <section className="w-full max-w-4xl mx-auto px-6 py-16 text-center font-mono space-y-6">
        <h2 className="text-3xl sm:text-4xl font-black uppercase text-black">
          Ready to stop filling out job forms?
        </h2>

        {/* Viral Quote Box */}
        <div className="border-2 border-black bg-stone-100 p-8 brutal-shadow max-w-lg mx-auto space-y-4 text-left">
          <div className="text-base sm:text-lg font-bold text-black italic">
            &ldquo;I applied to 37 jobs today without applying to a single fucking job.&rdquo;
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-stone-300 text-xs text-stone-500">
            <span>Share with someone unemployed</span>
            <button
              onClick={copyQuote}
              className="inline-flex items-center gap-1.5 bg-black text-white px-2.5 py-1 text-[11px] font-bold uppercase hover:bg-stone-800"
            >
              <Copy className="w-3 h-3" />
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        <div className="pt-4">
          <Link
            href="/resume"
            className="inline-flex items-center gap-3 bg-[#E2F952] text-black px-10 py-5 font-mono text-base uppercase font-extrabold tracking-wider border-2 border-black brutal-shadow hover:bg-black hover:text-[#E2F952] transition-all"
          >
            Give me your resume →
          </Link>
        </div>
      </section>
    </div>
  );
}
