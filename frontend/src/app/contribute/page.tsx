"use client";

import { useState } from "react";
import Link from "next/link";
import { Terminal, GitPullRequest, Bug, Code, Sparkles, Send, Check, Loader2 } from "lucide-react";

export default function ContributePage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [contributionType, setContributionType] = useState("adapter");
  const [details, setDetails] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: handle,
          email: email,
          message: details,
          type: contributionType,
          subject: `[Community Contribution] ${contributionType.toUpperCase()} from @${handle}`,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message. Please try again.");
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-12 font-mono">
      {/* Header */}
      <div className="space-y-4 border-b-2 border-black pb-8">
        <div className="inline-block bg-black text-[#E2F952] px-2.5 py-0.5 text-xs font-bold uppercase tracking-widest">
          COMMUNITY FLYWHEEL
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-black uppercase tracking-tight">
          HELP ME BUILD THIS.
        </h1>
        <p className="text-stone-700 text-sm sm:text-base max-w-2xl leading-relaxed">
          I&apos;m building a robot that applies to jobs because humans shouldn&apos;t have to suffer through 45-minute Workday forms.
          If you write code, test forms, or reverse-engineer awful job portals, help out.
          All submissions are routed straight to <strong className="text-black underline">sales@mander.tech</strong>.
        </p>
      </div>

      {/* 3 Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border-2 border-black p-6 bg-white brutal-shadow space-y-3">
          <div className="w-10 h-10 bg-black text-[#E2F952] flex items-center justify-center border-2 border-black">
            <Code className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-black uppercase text-black">Write ATS Adapters</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Build Playwright adapters for Ashby, Workday, BambooHR, and Greenhouse. Keep them deterministic and non-hallucinating.
          </p>
        </div>

        <div className="border-2 border-black p-6 bg-white brutal-shadow space-y-3">
          <div className="w-10 h-10 bg-black text-[#E2F952] flex items-center justify-center border-2 border-black">
            <Bug className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-black uppercase text-black">Report Broken Flows</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Did an ATS change a selector or block an application? Drop the job URL and logs so I can patch the adapter.
          </p>
        </div>

        <div className="border-2 border-black p-6 bg-white brutal-shadow space-y-3">
          <div className="w-10 h-10 bg-black text-[#E2F952] flex items-center justify-center border-2 border-black">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-black uppercase text-black">Prompt Guardrails</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Improve Gemini 3.8 Flash prompts to ensure 0% hallucination and crisp answers for consequential questions.
          </p>
        </div>
      </div>

      {/* Contributor Leaderboard */}
      <div className="border-2 border-black p-6 bg-stone-50 brutal-shadow space-y-4">
        <div className="flex items-center justify-between border-b-2 border-black pb-2">
          <h2 className="text-sm font-black uppercase text-black">TOP CONTRIBUTORS</h2>
          <span className="text-[11px] text-stone-500 font-bold uppercase">Hall of Fame</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="border-2 border-black p-4 bg-white space-y-1">
            <span className="font-black text-black block uppercase">Herman</span>
            <span className="text-stone-600 block">142 applications automated</span>
            <span className="text-stone-600 block">8 job boards added</span>
            <span className="text-emerald-700 font-bold block">23 bugs fixed</span>
          </div>

          <div className="border-2 border-black p-4 bg-white space-y-1">
            <span className="font-black text-black block uppercase">Alex K.</span>
            <span className="text-stone-600 block">89 applications automated</span>
            <span className="text-stone-600 block">Lever adapter maintained</span>
            <span className="text-emerald-700 font-bold block">Ashby input patch</span>
          </div>

          <div className="border-2 border-black p-4 bg-white space-y-1">
            <span className="font-black text-black block uppercase">Sarah T.</span>
            <span className="text-stone-600 block">Ashby form field testing</span>
            <span className="text-stone-600 block">12 QA prompts refined</span>
            <span className="text-emerald-700 font-bold block">0% hallucination rule</span>
          </div>
        </div>
      </div>

      {/* Contribution Form */}
      <div className="border-2 border-black p-8 bg-white brutal-shadow space-y-6">
        <div className="flex items-center justify-between border-b-2 border-black pb-4">
          <h2 className="text-xl font-black uppercase text-black">
            Submit a contribution or inquiry
          </h2>
          <span className="text-[11px] text-stone-500 font-bold uppercase hidden sm:inline">
            Directly routed to sales@mander.tech
          </span>
        </div>

        {submitted ? (
          <div className="p-6 bg-emerald-100 border-2 border-black text-xs text-emerald-950 font-bold space-y-2">
            <div className="flex items-center gap-2 text-sm font-black uppercase text-emerald-900">
              <Check className="w-5 h-5 text-emerald-800 stroke-[3]" />
              Transferred to sales@mander.tech
            </div>
            <p>
              Thanks for reaching out! Your submission has been forwarded directly to <strong>sales@mander.tech</strong>.
              I will review your code / notes and get back to you soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {errorMsg && (
              <div className="p-3 bg-rose-100 border-2 border-black text-rose-900 font-bold">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block uppercase font-bold mb-1">Your Name / GitHub Handle</label>
                <input
                  type="text"
                  required
                  placeholder="@username or your name"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  className="w-full border-2 border-black p-3 focus:outline-none"
                />
              </div>

              <div>
                <label className="block uppercase font-bold mb-1">Your Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="you@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-2 border-black p-3 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block uppercase font-bold mb-1">Contribution / Inquiry Type</label>
              <select
                value={contributionType}
                onChange={(e) => setContributionType(e.target.value)}
                className="w-full border-2 border-black p-3 bg-white focus:outline-none font-bold"
              >
                <option value="adapter">New ATS Adapter (Playwright Code)</option>
                <option value="bug">Report Broken Job Board</option>
                <option value="prompt">Improve AI Reasoning / Guardrails</option>
                <option value="custom_job_request">Custom Application Strategy / Enterprise</option>
                <option value="other">General Inquiry</option>
              </select>
            </div>

            <div>
              <label className="block uppercase font-bold mb-1">Details / Link to PR / Message</label>
              <textarea
                rows={4}
                required
                placeholder="Details of the job board, PR link, question, or custom request..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full border-2 border-black p-3 focus:outline-none font-sans text-xs"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-black text-[#E2F952] px-6 py-3.5 uppercase font-black tracking-wider hover:bg-stone-800 transition-colors border-2 border-black brutal-shadow-sm flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Transferring to sales@mander.tech...</span>
                </>
              ) : (
                <span>Submit to sales@mander.tech →</span>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
