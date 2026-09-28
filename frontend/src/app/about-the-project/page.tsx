import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, ExternalLink, ShieldCheck, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About The Project — I Apply For Jobs For You",
  description:
    "The story behind I Apply For Jobs For You. An independent software utility engineered by Mander to automate repetitive ATS application flows without fake qualifications.",
  alternates: {
    canonical: "/about-the-project",
  },
};

export default function AboutTheProjectPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-12 font-mono">
      {/* Header */}
      <div className="space-y-4 border-b-2 border-black pb-8">
        <div className="inline-block bg-black text-[#E2F952] px-2.5 py-0.5 text-xs font-bold uppercase tracking-widest">
          PROJECT ORIGIN & PHILOSOPHY
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-black uppercase tracking-tight">
          ABOUT THE PROJECT
        </h1>
        <p className="text-stone-700 text-sm sm:text-base leading-relaxed max-w-2xl">
          IApplyForJobsForYou is an independent software project built by{" "}
          <a
            href="https://www.mander.tech/"
            target="_blank"
            rel="noopener"
            className="text-black font-extrabold underline hover:bg-[#E2F952] px-0.5 transition-colors"
          >
            Mander
          </a>
          , a small web studio focused on building useful websites and software.
        </p>
      </div>

      {/* Main Narrative */}
      <div className="space-y-10 text-xs sm:text-sm text-stone-800 leading-relaxed">
        {/* Section 1: The Problem */}
        <section className="space-y-4 border-2 border-black bg-white p-8 brutal-shadow">
          <h2 className="text-xl sm:text-2xl font-black uppercase text-black">
            Why Does This Exist?
          </h2>
          <p>
            Modern job applications have become an exhausting ritual. Job seekers spend
            45 minutes per application re-typing their work history from a PDF into tiny text
            boxes, creating accounts on 20 different portals, and writing cover letters filled
            with corporate jargon.
          </p>
          <p>
            Most applications are processed by software on the employer side before any human
            ever reads them. We believed job seekers deserved software on their side too—not an
            overcomplicated &ldquo;AI Career Copilot,&rdquo; but a utility that simply does what it says.
          </p>
        </section>

        {/* Section 2: The Core Rule */}
        <section className="space-y-4 border-2 border-black bg-[#E2F952]/20 p-8 brutal-shadow">
          <div className="flex items-center gap-2 text-black font-black uppercase text-xs">
            <ShieldCheck className="w-5 h-5 text-black" />
            The Non-Negotiable Rule
          </div>
          <h2 className="text-xl sm:text-2xl font-black uppercase text-black">
            Zero Fabricated Qualifications
          </h2>
          <p>
            The software uses a strict <strong>Truth Database</strong>. When you upload your resume,
            only verified facts are recorded.
          </p>
          <p>
            If an application form asks for credentials or information that isn&apos;t in your verified
            profile (like security clearances, specific visa requirements, or years with an unfamiliar
            programming language), the system pauses and asks you directly. It never manufactures
            qualifications to game an algorithm.
          </p>
        </section>

        {/* Section 3: Who Built It (Mander Attribution) */}
        <section className="space-y-4 border-2 border-black bg-white p-8 brutal-shadow">
          <div className="text-xs uppercase font-extrabold text-stone-500">
            CREATOR & STUDIO
          </div>
          <h2 className="text-xl sm:text-2xl font-black uppercase text-black">
            Built by Mander
          </h2>
          <p>
            This application was engineered by{" "}
            <a
              href="https://www.mander.tech/"
              target="_blank"
              rel="noopener"
              className="text-black font-extrabold underline hover:bg-[#E2F952] px-0.5"
            >
              Mander
            </a>
            . We specialize in building fast, high-performance web applications, custom tools, and
            clean digital experiences without corporate clutter.
          </p>
          <p>
            If you want to read more about how this project was designed, architected, and built,
            or if you need custom web development or software engineered for your business, visit our studio:
          </p>
          <div className="pt-2">
            <a
              href="https://www.mander.tech/"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 bg-black text-[#E2F952] px-5 py-3 text-xs uppercase font-black tracking-wider hover:bg-stone-800 transition-colors border-2 border-black brutal-shadow-sm"
            >
              <span>Visit Mander (www.mander.tech)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>
      </div>

      {/* Back to Application */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t-2 border-black">
        <Link
          href="/"
          className="text-xs font-black uppercase hover:underline text-black"
        >
          ← Return to homepage
        </Link>
        <Link
          href="/resume"
          className="inline-flex items-center gap-2 bg-[#E2F952] text-black px-6 py-3.5 text-xs font-black uppercase border-2 border-black brutal-shadow-sm hover:bg-black hover:text-[#E2F952] transition-colors"
        >
          <span>Give me your resume →</span>
        </Link>
      </div>
    </div>
  );
}
