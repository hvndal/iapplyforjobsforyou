import Link from "next/link";
import { ArrowRight, CheckCircle, ShieldCheck, Terminal, Layers, Cpu } from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-12 font-mono">
      {/* Header */}
      <div className="space-y-4 border-b-2 border-black pb-8">
        <div className="inline-block bg-black text-[#E2F952] px-2.5 py-0.5 text-xs font-bold uppercase tracking-widest">
          UNDER THE HOOD
        </div>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-black">
          HOW I WORK
        </h1>
        <p className="text-stone-700 text-sm sm:text-base max-w-2xl leading-relaxed">
          The concept is deliberately simple: you give me your resume, and I apply to jobs for you.
          Here is how the underlying software works without hallucinating or making shit up.
        </p>
      </div>

      {/* 4 Architectural Pillars */}
      <div className="space-y-8">
        {/* Step 1 */}
        <div className="border-2 border-black bg-white p-8 brutal-shadow grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-extrabold text-stone-400 block">
              PILLAR 01
            </span>
            <h2 className="text-2xl font-black uppercase text-black">
              The Truth Profile
            </h2>
            <div className="inline-block bg-[#E2F952] px-2 py-0.5 text-[10px] font-bold uppercase border border-black">
              Deterministic Facts Only
            </div>
          </div>
          <div className="md:col-span-2 space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
            <p>
              When you upload your resume, my Gemini 3.8 Flash intelligence extracts your verified history:
              companies, roles, graduation dates, confirmed skills, and work authorization status.
            </p>
            <p>
              This is stored in your permanent <strong>Truth Database</strong>. Every single application I touch
              draws exclusively from this database. I never invent a single credential or manufacture fake experience.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="border-2 border-black bg-white p-8 brutal-shadow grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-extrabold text-stone-400 block">
              PILLAR 02
            </span>
            <h2 className="text-2xl font-black uppercase text-black">
              Modular ATS Adapters
            </h2>
            <div className="inline-block bg-black text-white px-2 py-0.5 text-[10px] font-bold uppercase">
              Playwright + Python
            </div>
          </div>
          <div className="md:col-span-2 space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
            <p>
              I don&apos;t spam random HTML forms. I connect to ATS (Applicant Tracking Systems) using structured adapters:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 pb-2">
              <div className="border border-black p-2 bg-stone-50 font-bold text-center text-xs">
                Greenhouse (Live)
              </div>
              <div className="border border-black p-2 bg-stone-50 font-bold text-center text-xs">
                Lever (Live)
              </div>
              <div className="border border-black p-2 bg-stone-50 font-bold text-center text-xs">
                Ashby (Live)
              </div>
              <div className="border border-dashed border-stone-400 p-2 text-stone-400 font-bold text-center text-xs">
                Workday (Building)
              </div>
            </div>
            <p>
              Each adapter understands the specific DOM selectors, file upload components, and question schemas of that platform.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="border-2 border-black bg-white p-8 brutal-shadow grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-extrabold text-stone-400 block">
              PILLAR 03
            </span>
            <h2 className="text-2xl font-black uppercase text-black">
              Grounded Question Answering
            </h2>
            <div className="inline-block bg-amber-200 text-black px-2 py-0.5 text-[10px] font-bold uppercase border border-black">
              Zero Hallucination
            </div>
          </div>
          <div className="md:col-span-2 space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
            <p>
              When a job asks: <em>“Why do you want to join Acme?”</em> or <em>“Describe a time you shipped under pressure”</em>,
              I draft answers strictly grounded in your actual projects and confirmed background.
            </p>
            <div className="bg-[#E2F952]/30 p-4 border-2 border-black text-xs text-stone-900 space-y-1">
              <strong className="block uppercase text-black font-extrabold">The Guardrail:</strong>
              <span>
                If an application asks a question requiring missing info (like visa sponsorship, security clearances, or unfamiliar tech),
                I pause immediately, flag it <span className="bg-black text-[#E2F952] px-1 font-bold">I GOT STUCK</span> on your dashboard, and ask you.
              </span>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="border-2 border-black bg-white p-8 brutal-shadow grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-extrabold text-stone-400 block">
              PILLAR 04
            </span>
            <h2 className="text-2xl font-black uppercase text-black">
              Application Modes
            </h2>
            <div className="inline-block bg-purple-200 text-purple-950 px-2 py-0.5 text-[10px] font-bold uppercase border border-black">
              User In Control
            </div>
          </div>
          <div className="md:col-span-2 space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
            <p>You choose how autonomous I am:</p>
            <ul className="space-y-2 text-xs">
              <li className="p-3 border border-black bg-stone-50">
                <strong>Approval Required (Default):</strong> I fill the form, pause, and wait for your 1-click confirmation before submitting.
              </li>
              <li className="p-3 border border-black bg-stone-50">
                <strong>Automatic (Opt-In):</strong> Submits applications matching 90%+ of your criteria instantly.
              </li>
              <li className="p-3 border border-black bg-stone-50">
                <strong>Assisted:</strong> Prepares cover letters and answers for you to review and copy.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="border-2 border-black bg-black text-white p-8 brutal-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-xl font-black uppercase text-[#E2F952]">
            Ready to let me apply for you?
          </h3>
          <p className="text-xs text-stone-300">
            First 30 job applications are completely on me.
          </p>
        </div>

        <Link
          href="/resume"
          className="bg-[#E2F952] text-black px-6 py-3.5 text-xs uppercase font-extrabold hover:bg-white hover:text-black border-2 border-[#E2F952] transition-colors whitespace-nowrap"
        >
          Give me your resume →
        </Link>
      </div>
    </div>
  );
}
