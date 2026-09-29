"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Check,
  AlertTriangle,
  X,
  ExternalLink,
  HelpCircle,
  ArrowRight,
  Search,
  Sparkles,
  Coffee,
  CheckCircle2,
  Clock
} from "lucide-react";

interface Application {
  id: string;
  role: string;
  company: string;
  platform: string;
  salary: string;
  status:
    | "applied"
    | "i_got_stuck"
    | "i_couldnt_submit"
    | "they_rejected_you"
    | "you_got_an_interview";
  statusBadge: string;
  statusBadgeColor: string;
  url: string;
  appliedDate: string;
  stuckQuestion?: string;
  stuckOptions?: string[];
}

const mockApplications: Application[] = [
  {
    id: "app-1",
    role: "Senior Frontend Engineer",
    company: "Vercel",
    platform: "Greenhouse",
    salary: "$160,000 - $190,000",
    status: "applied",
    statusBadge: "✓ I applied",
    statusBadgeColor: "bg-emerald-100 text-emerald-950 border-emerald-400 font-bold",
    url: "https://boards.greenhouse.io",
    appliedDate: "Today at 2:15 PM",
  },
  {
    id: "app-2",
    role: "Full Stack Developer",
    company: "Linear",
    platform: "Ashby",
    salary: "$150,000 - $185,000",
    status: "i_got_stuck",
    statusBadge: "⚠ I got stuck",
    statusBadgeColor: "bg-[#E2F952] text-black border-black font-extrabold animate-pulse",
    url: "https://jobs.ashbyhq.com",
    appliedDate: "Today at 1:40 PM",
    stuckQuestion: "Linear asks: 'What is your minimum expected base salary (USD)?' — I don't guess numbers.",
    stuckOptions: ["$120,000", "$140,000", "$160,000"],
  },
  {
    id: "app-3",
    role: "Staff Software Engineer",
    company: "Supabase",
    platform: "Lever",
    salary: "$170,000 - $205,000",
    status: "you_got_an_interview",
    statusBadge: "👀 YOU GOT AN INTERVIEW",
    statusBadgeColor: "bg-purple-200 text-purple-950 border-purple-500 font-extrabold",
    url: "https://jobs.lever.co",
    appliedDate: "Yesterday",
  },
  {
    id: "app-4",
    role: "Product Engineer",
    company: "Ramp",
    platform: "Greenhouse",
    salary: "$165,000 - $195,000",
    status: "i_couldnt_submit",
    statusBadge: "✗ I couldn't submit",
    statusBadgeColor: "bg-rose-100 text-rose-900 border-rose-300 font-bold",
    url: "https://boards.greenhouse.io",
    appliedDate: "2 days ago",
  },
  {
    id: "app-5",
    role: "UI Engineer",
    company: "Stripe",
    platform: "Greenhouse",
    salary: "$175,000 - $210,000",
    status: "they_rejected_you",
    statusBadge: "✗ They rejected you",
    statusBadgeColor: "bg-stone-200 text-stone-700 border-stone-400 font-medium",
    url: "https://boards.greenhouse.io",
    appliedDate: "3 days ago",
  },
];

export default function DashboardPage() {
  const [apps, setApps] = useState(mockApplications);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [customAnswer, setCustomAnswer] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [candidate, setCandidate] = useState<{
    name: string;
    email: string;
    desiredRole: string;
    minSalary: string;
    remotePreference: string;
    applicationsRemaining?: number;
  } | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("iapply_current_candidate");
      if (stored) {
        const parsed = JSON.parse(stored);
        setCandidate(parsed);

        // Customize applications dynamically to match candidate's target role
        if (parsed.desiredRole) {
          const role = parsed.desiredRole;
          setApps([
            {
              id: "app-1",
              role: `Senior ${role}`,
              company: "Vercel",
              platform: "Greenhouse",
              salary: `$${parsed.minSalary || "140000"} - $${Number(parsed.minSalary || 140000) + 30000}`,
              status: "applied",
              statusBadge: "✓ I applied",
              statusBadgeColor: "bg-emerald-100 text-emerald-950 border-emerald-400 font-bold",
              url: "https://boards.greenhouse.io",
              appliedDate: "Today at 2:15 PM",
            },
            {
              id: "app-2",
              role: role,
              company: "Linear",
              platform: "Ashby",
              salary: `$${parsed.minSalary || "135000"} - $${Number(parsed.minSalary || 135000) + 25000}`,
              status: "i_got_stuck",
              statusBadge: "⚠ I got stuck",
              statusBadgeColor: "bg-[#E2F952] text-black border-black font-extrabold animate-pulse",
              url: "https://jobs.ashbyhq.com",
              appliedDate: "Today at 1:40 PM",
              stuckQuestion: `Linear asks: 'What is your minimum expected base salary (USD)?' — I don't guess numbers.`,
              stuckOptions: [`$${parsed.minSalary}`, `$${Number(parsed.minSalary) + 15000}`, `$${Number(parsed.minSalary) + 30000}`],
            },
            {
              id: "app-3",
              role: `Staff ${role}`,
              company: "Supabase",
              platform: "Lever",
              salary: `$${Number(parsed.minSalary || 140000) + 20000} - $${Number(parsed.minSalary || 140000) + 50000}`,
              status: "you_got_an_interview",
              statusBadge: "👀 YOU GOT AN INTERVIEW",
              statusBadgeColor: "bg-purple-200 text-purple-950 border-purple-500 font-extrabold",
              url: "https://jobs.lever.co",
              appliedDate: "Yesterday",
            },
            {
              id: "app-4",
              role: role,
              company: "Ramp",
              platform: "Greenhouse",
              salary: `$${parsed.minSalary || "140000"} - $${Number(parsed.minSalary || 140000) + 35000}`,
              status: "i_couldnt_submit",
              statusBadge: "✗ I couldn't submit",
              statusBadgeColor: "bg-rose-100 text-rose-900 border-rose-300 font-bold",
              url: "https://boards.greenhouse.io",
              appliedDate: "2 days ago",
            },
            {
              id: "app-5",
              role: `Lead ${role}`,
              company: "Stripe",
              platform: "Greenhouse",
              salary: `$${Number(parsed.minSalary || 140000) + 15000} - $${Number(parsed.minSalary || 140000) + 45000}`,
              status: "they_rejected_you",
              statusBadge: "✗ They rejected you",
              statusBadgeColor: "bg-stone-200 text-stone-700 border-stone-400 font-medium",
              url: "https://boards.greenhouse.io",
              appliedDate: "3 days ago",
            },
          ]);
        }
      }
    } catch (e) {
      console.error("Failed to load candidate profile from localStorage", e);
    }
  }, []);

  const handleResolveStuck = (appId: string, answer: string) => {
    setApps((prev) =>
      prev.map((app) =>
        app.id === appId
          ? {
              ...app,
              status: "applied",
              statusBadge: "✓ I applied",
              statusBadgeColor: "bg-emerald-100 text-emerald-950 border-emerald-400 font-bold",
              stuckQuestion: undefined,
            }
          : app
      )
    );
    setToastMessage(`✓ Saved "${answer}" to Truth Database. Application submitted!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredApps = apps.filter((app) => {
    const matchesSearch =
      app.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.company.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (activeFilter === "all") return true;
    if (activeFilter === "stuck") return app.status === "i_got_stuck";
    if (activeFilter === "applied") return app.status === "applied";
    if (activeFilter === "interview") return app.status === "you_got_an_interview";
    if (activeFilter === "rejected") return app.status === "they_rejected_you";
    return true;
  });

  const stuckCount = apps.filter((a) => a.status === "i_got_stuck").length;
  const appliedCount = apps.filter((a) => a.status === "applied").length;
  const interviewCount = apps.filter((a) => a.status === "you_got_an_interview").length;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-10 font-mono">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-black text-[#E2F952] border-2 border-black p-4 text-xs font-bold uppercase brutal-shadow">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="border-b-2 border-black pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 bg-black text-white px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest">
          Me. I&apos;m the one applying.
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-black uppercase tracking-tight">
          SHIT I&apos;VE APPLIED TO
        </h1>
        <p className="text-stone-600 text-sm max-w-2xl leading-relaxed">
          You find the job. I apply. When I get stuck on something unknown, I ask you.
          When you get an interview, I tell you.
        </p>
      </div>

      {/* Candidate Profile Status Card */}
      {candidate ? (
        <div className="border-2 border-black bg-[#E2F952] p-5 brutal-shadow space-y-3 text-black">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-black pb-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-black text-[#E2F952] px-2 py-0.5 text-[10px] font-black uppercase tracking-wider">
                ACTIVE TRUTH PROFILE
              </span>
              <span className="font-black text-sm uppercase">{candidate.name || "Candidate"}</span>
              <span className="text-xs text-stone-900 font-bold">({candidate.email})</span>
            </div>
            <div className="text-xs font-bold text-black">
              Target: <strong className="underline uppercase">{candidate.desiredRole}</strong> &bull; Min: ${candidate.minSalary} USD
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs pt-1 font-bold">
            <span className="text-stone-900">
              Applications routed to Mander review pipeline: <a href="mailto:sales@mander.tech" className="underline font-black text-black">sales@mander.tech</a>
            </span>
            <div className="flex items-center gap-3">
              <Link href="/resume" className="underline text-black hover:text-stone-700">
                Update Resume / Preferences &rarr;
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="border-2 border-black bg-stone-100 p-5 brutal-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="font-black text-sm uppercase text-black">No Active Resume Loaded Yet</div>
            <p className="text-xs text-stone-600 mt-1">
              Upload your resume to extract verified facts and start your 30 complimentary applications.
            </p>
          </div>
          <Link
            href="/resume"
            className="bg-[#E2F952] text-black px-4 py-2 border-2 border-black font-black uppercase text-xs hover:bg-black hover:text-[#E2F952] transition-colors whitespace-nowrap brutal-shadow-sm"
          >
            Upload Resume Now &rarr;
          </Link>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border-2 border-black p-5 bg-white brutal-shadow-sm">
          <div className="text-[11px] uppercase text-stone-500 font-extrabold tracking-wider">
            Jobs I found
          </div>
          <div className="text-3xl sm:text-4xl font-black text-black mt-2">142</div>
          <div className="text-[10px] text-stone-500 mt-1 uppercase font-bold">
            Based on your Truth Profile
          </div>
        </div>

        <div className="border-2 border-black p-5 bg-white brutal-shadow-sm">
          <div className="text-[11px] uppercase text-stone-500 font-extrabold tracking-wider">
            I applied
          </div>
          <div className="text-3xl sm:text-4xl font-black text-emerald-800 mt-2">
            {appliedCount}
          </div>
          <div className="text-[10px] text-stone-500 mt-1 uppercase font-bold">
            Confirmed submissions
          </div>
        </div>

        <div
          className={`border-2 border-black p-5 brutal-shadow-sm transition-colors ${
            stuckCount > 0 ? "bg-[#E2F952]" : "bg-white"
          }`}
        >
          <div className="text-[11px] uppercase text-black font-extrabold tracking-wider">
            I got stuck
          </div>
          <div className="text-3xl sm:text-4xl font-black text-black mt-2">
            {stuckCount}
          </div>
          <div className="text-[10px] text-black mt-1 uppercase font-bold">
            {stuckCount > 0 ? "Needs your verified input" : "All clear"}
          </div>
        </div>

        <div className="border-2 border-black p-5 bg-purple-100 brutal-shadow-sm">
          <div className="text-[11px] uppercase text-purple-900 font-extrabold tracking-wider">
            Interviews
          </div>
          <div className="text-3xl sm:text-4xl font-black text-purple-950 mt-2">
            {interviewCount}
          </div>
          <div className="text-[10px] text-purple-900 mt-1 uppercase font-bold">
            👀 You got one!
          </div>
        </div>
      </div>

      {/* Personal Weekly Report & Refill Banner */}
      <div className="border-2 border-black bg-white p-6 brutal-shadow space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b-2 border-black pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-black text-[#E2F952] px-2 py-0.5 text-[10px] uppercase font-bold">
                WEEKLY REPORT STATUS
              </span>
              <span className="text-xs text-stone-500 uppercase font-bold">
                1 Week of Applications
              </span>
            </div>
            <div className="text-base font-extrabold text-black uppercase">
              Personal Report: 4/30 applications used (26 complimentary remaining)
            </div>
            <p className="text-xs text-stone-600">
              I deliver a comprehensive personal audit after 1 full week of applications.
              After your 30 free applications, get 30 more for $10 or buy me a coffee.
            </p>
          </div>

          <a
            href="https://buymeacoffee.com/hermanify"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#FFDD00] text-black border-2 border-black px-4 py-2.5 text-xs uppercase font-extrabold brutal-shadow-sm hover:bg-amber-400 transition-all whitespace-nowrap"
          >
            <Coffee className="w-4 h-4" />
            Buy me a coffee ☕ / $10 for 30
          </a>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] font-bold uppercase text-stone-500">
            <span>Complimentary Quota: 4 applied</span>
            <span>26 free remaining</span>
          </div>
          <div className="w-full h-3 border-2 border-black bg-stone-100 overflow-hidden">
            <div className="h-full bg-black w-[13.3%]" />
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => setActiveFilter("all")}
            className={`border-2 border-black px-3 py-1 font-bold uppercase transition-all ${
              activeFilter === "all"
                ? "bg-black text-white"
                : "bg-white text-stone-700 hover:bg-stone-100"
            }`}
          >
            All ({apps.length})
          </button>
          <button
            onClick={() => setActiveFilter("stuck")}
            className={`border-2 border-black px-3 py-1 font-bold uppercase transition-all ${
              activeFilter === "stuck"
                ? "bg-[#E2F952] text-black"
                : "bg-white text-stone-700 hover:bg-[#E2F952]/40"
            }`}
          >
            I Got Stuck ({stuckCount})
          </button>
          <button
            onClick={() => setActiveFilter("applied")}
            className={`border-2 border-black px-3 py-1 font-bold uppercase transition-all ${
              activeFilter === "applied"
                ? "bg-black text-white"
                : "bg-white text-stone-700 hover:bg-stone-100"
            }`}
          >
            Applied ({appliedCount})
          </button>
          <button
            onClick={() => setActiveFilter("interview")}
            className={`border-2 border-black px-3 py-1 font-bold uppercase transition-all ${
              activeFilter === "interview"
                ? "bg-purple-900 text-white"
                : "bg-white text-stone-700 hover:bg-purple-100"
            }`}
          >
            Interviews ({interviewCount})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search role or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border-2 border-black p-1.5 pl-8 text-xs bg-white focus:outline-none"
          />
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-stone-500" />
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApps.length === 0 ? (
          <div className="border-2 border-black p-8 bg-white text-center text-xs font-bold text-stone-500 uppercase">
            No applications match your search.
          </div>
        ) : (
          filteredApps.map((app) => (
            <div
              key={app.id}
              className={`border-2 border-black p-6 bg-white brutal-shadow transition-all ${
                app.status === "i_got_stuck" ? "border-black ring-2 ring-black" : ""
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-stone-500 font-bold uppercase">
                    <span className="text-black font-extrabold">{app.company}</span>
                    <span>•</span>
                    <span className="bg-stone-100 border border-black px-1.5 py-0.2 text-[10px]">
                      {app.platform}
                    </span>
                    <span>•</span>
                    <span className="text-emerald-800">{app.salary}</span>
                  </div>

                  <h3 className="text-xl font-black text-black uppercase">
                    {app.role}
                  </h3>

                  <div className="text-xs text-stone-500 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>{app.appliedDate}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`border-2 border-black px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${app.statusBadgeColor}`}
                  >
                    {app.statusBadge}
                  </span>

                  <a
                    href={app.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 hover:bg-stone-100 border-2 border-black text-black"
                    title="Open application URL"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* IF I GOT STUCK: ACTION INTERFACE */}
              {app.status === "i_got_stuck" && (
                <div className="mt-5 pt-4 border-t-2 border-black bg-[#E2F952]/30 -mx-6 -mb-6 p-6 space-y-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-black shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <div className="text-xs uppercase tracking-wider font-black text-black">
                        I GOT STUCK. I NEED YOU FOR THIS PART:
                      </div>
                      <div className="text-sm font-bold text-black">
                        {app.stuckQuestion}
                      </div>
                    </div>
                  </div>

                  {/* 1-Click Option Pills */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-xs text-stone-600 font-bold uppercase mr-1">
                      Quick Answer:
                    </span>
                    {app.stuckOptions?.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleResolveStuck(app.id, opt)}
                        className="border-2 border-black bg-white hover:bg-black hover:text-[#E2F952] px-3 py-1.5 text-xs font-extrabold transition-all brutal-shadow-sm"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {/* Custom Answer Input */}
                  <div className="flex gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="Or type custom verified answer..."
                      value={customAnswer}
                      onChange={(e) => setCustomAnswer(e.target.value)}
                      className="flex-1 bg-white border-2 border-black p-2.5 text-xs focus:outline-none"
                    />
                    <button
                      onClick={() => {
                        if (customAnswer.trim()) {
                          handleResolveStuck(app.id, customAnswer);
                          setCustomAnswer("");
                        }
                      }}
                      className="bg-black text-[#E2F952] px-5 py-2.5 text-xs uppercase font-extrabold hover:bg-stone-800 transition-colors border-2 border-black whitespace-nowrap"
                    >
                      Got it. Back to work →
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
