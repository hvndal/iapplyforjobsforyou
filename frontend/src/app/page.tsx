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
  Copy,
  Mail,
  Loader2,
  Coffee
} from "lucide-react";
import { MotionHero } from "@/components/MotionHero";
import { AnimatedMarquee } from "@/components/AnimatedMarquee";
import { PhotoContrastSection } from "@/components/PhotoContrastSection";
import { BmcLogo } from "@/components/BuyMeACoffee";

export default function Home() {
  const [copied, setCopied] = useState(false);

  // Quick inquiry form state -> sales@mander.tech
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

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
      {/* 1. MOTION HERO & INTERACTIVE SIMULATOR */}
      <MotionHero />

      {/* 2. CONTINUOUS ANIMATED MARQUEE */}
      <AnimatedMarquee />

      {/* 3. PHOTO CONTRAST SECTION (STRESSED VS CHILLING) */}
      <PhotoContrastSection />

      {/* 4. THE PHILOSOPHY / FUCK LINKEDIN SECTION */}
      <section className="w-full border-y-2 border-black bg-black text-white py-20 px-6 font-mono">
        <div className="max-w-5xl mx-auto space-y-10">
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

      {/* 5. DIVISION OF LABOR (YOU / ME / YOU) */}
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

      {/* 6. ZERO HALLUCINATION POLICY */}
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

      {/* 7. UPFRONT BUY ME A COFFEE & DIRECT SALES INQUIRY (sales@mander.tech) */}
      <section className="w-full max-w-5xl mx-auto px-6 py-16 font-mono space-y-10">
        {/* Upfront Official BMC Card */}
        <div className="border-2 border-black bg-[#FFDD00]/25 p-8 brutal-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
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

      {/* 8. SHAREABLE / VIRAL QUOTE */}
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
