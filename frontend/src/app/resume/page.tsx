"use client";

import { useState } from "react";
import { UploadCloud, Check, ShieldCheck, ArrowRight, AlertTriangle, FileText, Sparkles } from "lucide-react";
import Link from "next/link";

interface ExtractedFacts {
  name: string;
  email: string;
  location: string;
  roles: string;
  skills: string[];
  yearsExperience: number;
  authorizedCountries: string[];
  requiresSponsorship: boolean;
}

export default function ResumePage() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [facts, setFacts] = useState<ExtractedFacts | null>(null);

  // Preference fields
  const [desiredRole, setDesiredRole] = useState("Frontend Engineer");
  const [minSalary, setMinSalary] = useState("120000");
  const [remotePreference, setRemotePreference] = useState("remote_only");
  const [savedToDatabase, setSavedToDatabase] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      setIsParsing(true);

      // Simulate Gemini 3.8 Flash deterministic extraction
      setTimeout(() => {
        setIsParsing(false);
        setFacts({
          name: "Herman",
          email: "herman@example.com",
          location: "Toronto, Canada",
          roles: "Senior Frontend Engineer, Full Stack Developer",
          skills: ["TypeScript", "Next.js", "React", "Python", "Tailwind CSS", "Playwright"],
          yearsExperience: 4,
          authorizedCountries: ["Canada", "US"],
          requiresSponsorship: false,
        });
      }, 1200);
    }
  };

  const handleConfirmTruth = () => {
    setSavedToDatabase(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-12 font-mono">
      {/* Header */}
      <div className="space-y-3 border-b-2 border-black pb-8">
        <div className="inline-block bg-black text-[#E2F952] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-widest">
          STEP 1 • THE TRUTH DATABASE
        </div>
        <h1 className="text-4xl sm:text-6xl font-black uppercase text-black tracking-tight">
          GIVE ME YOUR RESUME.
        </h1>
        <p className="text-stone-700 text-sm sm:text-base max-w-2xl leading-relaxed">
          I will parse your verified history. This becomes your <strong className="text-black">Truth Profile</strong>.
          I will never hallucinate or invent qualifications you don&apos;t have.
        </p>
      </div>

      {/* Upload Box */}
      {!facts && (
        <div className="border-2 border-dashed border-black bg-white p-12 text-center hover:bg-stone-50 transition-colors relative cursor-pointer brutal-shadow">
          <input
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={handleUpload}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />

          <div className="flex flex-col items-center space-y-4 pointer-events-none">
            <div className="w-16 h-16 bg-black text-[#E2F952] flex items-center justify-center border-2 border-black">
              <UploadCloud className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <span className="text-lg font-black text-black uppercase block">
                {fileName ? fileName : "Click to select or drop your resume (PDF/DOCX)"}
              </span>
              <span className="text-xs text-stone-500 block">
                Parsed by Gemini 3.8 Flash • Strictly extracted • Max 15MB
              </span>
            </div>
            <div className="pt-2">
              <span className="inline-block bg-[#E2F952] text-black text-[11px] px-3 py-1 font-bold border border-black uppercase">
                Choose file from computer
              </span>
            </div>
          </div>
        </div>
      )}

      {isParsing && (
        <div className="border-2 border-black p-8 bg-[#E2F952] text-black text-xs font-black uppercase space-y-2 brutal-shadow animate-pulse">
          <div className="flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4" />
            <span>READING RESUME WITH GEMINI 3.8 FLASH...</span>
          </div>
          <div className="text-stone-800">
            Extracting verified work history, degrees, and confirmed skills into your Truth Profile.
          </div>
        </div>
      )}

      {/* Step 2: Review Verified Facts & Set Preferences */}
      {facts && (
        <div className="space-y-8">
          <div className="border-2 border-black bg-white p-6 brutal-shadow space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-black pb-4 gap-2">
              <div className="flex items-center gap-2 text-black font-black uppercase text-sm">
                <Check className="w-5 h-5 text-emerald-600 stroke-[3]" />
                VERIFIED FACTS EXTRACTED (EDIT IF WRONG)
              </div>
              <span className="text-xs text-stone-500 font-bold uppercase">
                Source of Truth
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-stone-500 font-bold mb-1 uppercase">Full Name</label>
                <input
                  type="text"
                  value={facts.name}
                  onChange={(e) => setFacts({ ...facts, name: e.target.value })}
                  className="w-full border-2 border-black p-2.5 bg-stone-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-stone-500 font-bold mb-1 uppercase">Email</label>
                <input
                  type="email"
                  value={facts.email}
                  onChange={(e) => setFacts({ ...facts, email: e.target.value })}
                  className="w-full border-2 border-black p-2.5 bg-stone-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-stone-500 font-bold mb-1 uppercase">Years of Experience</label>
                <input
                  type="number"
                  value={facts.yearsExperience}
                  onChange={(e) => setFacts({ ...facts, yearsExperience: parseInt(e.target.value) || 0 })}
                  className="w-full border-2 border-black p-2.5 bg-stone-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-stone-500 font-bold mb-1 uppercase">Location</label>
                <input
                  type="text"
                  value={facts.location}
                  onChange={(e) => setFacts({ ...facts, location: e.target.value })}
                  className="w-full border-2 border-black p-2.5 bg-stone-50 focus:bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-stone-500 font-bold mb-1 uppercase">Verified Skills</label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {facts.skills.map((skill, i) => (
                    <span key={i} className="border-2 border-black bg-[#E2F952]/40 px-2.5 py-1 text-xs font-bold text-black">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Zero hallucination note */}
            <div className="flex items-center gap-2.5 p-3.5 bg-stone-100 border-2 border-black text-xs text-stone-800">
              <ShieldCheck className="w-5 h-5 text-black shrink-0" />
              <span>
                These facts are authoritative. If an application asks a question not answered here, I pause and ask you.
              </span>
            </div>
          </div>

          {/* Step 3: Tell me what you're looking for */}
          <div className="border-2 border-black bg-white p-6 brutal-shadow space-y-6">
            <h2 className="text-xl font-black uppercase border-b-2 border-black pb-4 text-black">
              TELL ME WHAT YOU&apos;RE LOOKING FOR
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-stone-500 font-bold mb-1 uppercase">Target Job Title</label>
                <input
                  type="text"
                  value={desiredRole}
                  onChange={(e) => setDesiredRole(e.target.value)}
                  className="w-full border-2 border-black p-2.5 font-bold"
                />
              </div>

              <div>
                <label className="block text-stone-500 font-bold mb-1 uppercase">Minimum Salary ($ USD)</label>
                <input
                  type="number"
                  value={minSalary}
                  onChange={(e) => setMinSalary(e.target.value)}
                  className="w-full border-2 border-black p-2.5 font-bold"
                />
              </div>

              <div>
                <label className="block text-stone-500 font-bold mb-1 uppercase">Workplace Type</label>
                <select
                  value={remotePreference}
                  onChange={(e) => setRemotePreference(e.target.value)}
                  className="w-full border-2 border-black p-2.5 bg-white font-bold"
                >
                  <option value="remote_only">Remote Only</option>
                  <option value="hybrid_ok">Hybrid or Remote</option>
                  <option value="onsite">On-site OK</option>
                </select>
              </div>
            </div>

            {!savedToDatabase ? (
              <button
                onClick={handleConfirmTruth}
                className="w-full bg-[#E2F952] text-black p-4 font-black uppercase tracking-wider hover:bg-black hover:text-[#E2F952] transition-colors border-2 border-black brutal-shadow flex items-center justify-center gap-2 text-sm"
              >
                Lock Truth Profile & Start Applying (30 Free) →
              </button>
            ) : (
              <div className="space-y-4 pt-2">
                <div className="p-4 bg-emerald-100 border-2 border-black text-xs text-emerald-950 font-bold">
                  ✓ Truth Profile saved to database. I am now scanning Greenhouse, Lever, and Ashby for &ldquo;{desiredRole}&rdquo;.
                </div>

                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 bg-black text-[#E2F952] px-6 py-4 uppercase font-black text-xs tracking-wider hover:bg-stone-800 border-2 border-black brutal-shadow"
                >
                  See what I&apos;m applying to →
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
