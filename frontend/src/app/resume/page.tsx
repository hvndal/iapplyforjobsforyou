"use client";

import { useState } from "react";
import {
  UploadCloud,
  Check,
  ShieldCheck,
  ArrowRight,
  AlertTriangle,
  FileText,
  Sparkles,
  Loader2,
  RefreshCw,
  Plus,
  X,
  Mail,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

interface ExtractedFacts {
  name: string;
  email: string;
  phone?: string;
  location: string;
  roles: string;
  skills: string[];
  yearsExperience: number;
  authorizedCountries: string[];
  requiresSponsorship: boolean;
}

export default function ResumePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const [facts, setFacts] = useState<ExtractedFacts | null>(null);

  // Preference fields
  const [desiredRole, setDesiredRole] = useState("Frontend Engineer");
  const [minSalary, setMinSalary] = useState("120000");
  const [remotePreference, setRemotePreference] = useState("remote_only");

  // New skill input
  const [newSkill, setNewSkill] = useState("");

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<{
    applicationId: string;
    message: string;
    forwardedTo: string;
  } | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFileName(file.name);
      setIsParsing(true);
      setParseError(null);
      setSubmissionResult(null);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/resume/parse", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to extract resume data.");
        }

        if (data.facts) {
          setFacts(data.facts);
          if (data.facts.roles) {
            setDesiredRole(data.facts.roles);
          }
        }
      } catch (err: any) {
        console.error("Resume extraction failed:", err);
        setParseError(err.message || "Could not read resume. Please try again.");
      } finally {
        setIsParsing(false);
      }
    }
  };

  const handleAddSkill = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ("key" in e && e.key !== "Enter") return;
    e.preventDefault();
    if (!newSkill.trim() || !facts) return;
    if (!facts.skills.includes(newSkill.trim())) {
      setFacts({
        ...facts,
        skills: [...facts.skills, newSkill.trim()],
      });
    }
    setNewSkill("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    if (!facts) return;
    setFacts({
      ...facts,
      skills: facts.skills.filter((s) => s !== skillToRemove),
    });
  };

  const handleConfirmTruth = async () => {
    if (!facts) return;
    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append("file", selectedFile);
      }
      formData.append("facts", JSON.stringify(facts));
      formData.append(
        "preferences",
        JSON.stringify({
          desiredRole,
          minSalary,
          remotePreference,
        })
      );

      const res = await fetch("/api/resume/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Submission failed.");
      }

      setSubmissionResult({
        applicationId: data.applicationId,
        message: data.message,
        forwardedTo: data.forwardedTo,
      });

      // Save to localStorage for client-side persistence on /dashboard
      if (data.candidate && typeof window !== "undefined") {
        localStorage.setItem(
          "iapply_current_candidate",
          JSON.stringify(data.candidate)
        );
      }
    } catch (err: any) {
      console.error("Submission failed:", err);
      setSubmissionError(
        err.message || "Failed to submit resume. Please check your connection."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-12 font-mono">
      {/* Header */}
      <div className="space-y-3 border-b-2 border-black pb-8">
        <div className="inline-block bg-black text-[#E2F952] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-widest">
          STEP 1 &bull; THE TRUTH DATABASE
        </div>
        <h1 className="text-4xl sm:text-6xl font-black uppercase text-black tracking-tight">
          GIVE ME YOUR RESUME.
        </h1>
        <p className="text-stone-700 text-sm sm:text-base max-w-2xl leading-relaxed">
          I will parse your verified history into your <strong className="text-black">Truth Profile</strong>.
          Every submission is dispatched to our execution pipeline at <code className="bg-stone-200 px-1 py-0.5 text-xs text-black">sales@mander.tech</code> with zero hallucinations.
        </p>
      </div>

      {/* Upload Box */}
      {!facts && (
        <div className="border-2 border-dashed border-black bg-white p-12 text-center hover:bg-stone-50 transition-colors relative cursor-pointer brutal-shadow">
          <input
            type="file"
            accept=".pdf,.docx,.txt,.md"
            onChange={handleUpload}
            disabled={isParsing}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full disabled:cursor-not-allowed"
          />

          <div className="flex flex-col items-center space-y-4 pointer-events-none">
            <div className="w-16 h-16 bg-black text-[#E2F952] flex items-center justify-center border-2 border-black">
              {isParsing ? (
                <Loader2 className="w-8 h-8 animate-spin" />
              ) : (
                <UploadCloud className="w-8 h-8" />
              )}
            </div>
            <div className="space-y-1">
              <span className="text-lg font-black text-black uppercase block">
                {isParsing
                  ? "Parsing resume & extracting facts..."
                  : fileName
                  ? fileName
                  : "Click to select or drop your resume (PDF / DOCX / TXT)"}
              </span>
              <span className="text-xs text-stone-500 block">
                Parsed by Gemini Flash &bull; Strictly extracted &bull; Max 20MB
              </span>
            </div>
            <div className="pt-2">
              <span className="inline-block bg-[#E2F952] text-black text-[11px] px-3 py-1 font-bold border border-black uppercase">
                {isParsing ? "Reading..." : "Choose file from computer"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Parsing progress alert */}
      {isParsing && (
        <div className="border-2 border-black p-8 bg-[#E2F952] text-black text-xs font-black uppercase space-y-2 brutal-shadow animate-pulse">
          <div className="flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>READING RESUME &bull; EXTRACTING CANDIDATE FACTS...</span>
          </div>
          <div className="text-stone-800">
            Extracting verified work history, tech skills, and authorization into your Truth Profile.
          </div>
        </div>
      )}

      {/* Parse error alert */}
      {parseError && (
        <div className="border-2 border-red-600 bg-red-50 p-6 text-red-950 text-xs font-bold space-y-2 brutal-shadow">
          <div className="flex items-center gap-2 text-sm font-black text-red-700 uppercase">
            <AlertTriangle className="w-5 h-5" />
            <span>Parsing Issue</span>
          </div>
          <p>{parseError}</p>
          <button
            onClick={() => {
              setParseError(null);
              setFacts(null);
              setFileName(null);
            }}
            className="mt-2 inline-flex items-center gap-1.5 bg-black text-white px-3 py-1.5 text-xs font-bold uppercase border border-black hover:bg-stone-800"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Try another file
          </button>
        </div>
      )}

      {/* Step 2: Review Verified Facts & Set Preferences */}
      {facts && (
        <div className="space-y-8">
          {/* File summary pill */}
          <div className="flex items-center justify-between bg-stone-100 border-2 border-black p-3 text-xs">
            <div className="flex items-center gap-2 font-bold text-black truncate">
              <FileText className="w-4 h-4 text-stone-700 shrink-0" />
              <span className="truncate">Source File: {fileName || "Resume"}</span>
            </div>
            <button
              onClick={() => {
                setFacts(null);
                setFileName(null);
                setSelectedFile(null);
                setSubmissionResult(null);
              }}
              className="text-[11px] underline font-bold hover:text-red-600 shrink-0 ml-2"
            >
              Replace file
            </button>
          </div>

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
                  className="w-full border-2 border-black p-2.5 bg-stone-50 focus:bg-white font-bold"
                />
              </div>

              <div>
                <label className="block text-stone-500 font-bold mb-1 uppercase">Email Address</label>
                <input
                  type="email"
                  value={facts.email}
                  onChange={(e) => setFacts({ ...facts, email: e.target.value })}
                  className="w-full border-2 border-black p-2.5 bg-stone-50 focus:bg-white font-bold"
                />
              </div>

              <div>
                <label className="block text-stone-500 font-bold mb-1 uppercase">Phone Number</label>
                <input
                  type="text"
                  value={facts.phone || ""}
                  placeholder="+1 (555) 000-0000"
                  onChange={(e) => setFacts({ ...facts, phone: e.target.value })}
                  className="w-full border-2 border-black p-2.5 bg-stone-50 focus:bg-white font-bold"
                />
              </div>

              <div>
                <label className="block text-stone-500 font-bold mb-1 uppercase">Location</label>
                <input
                  type="text"
                  value={facts.location}
                  onChange={(e) => setFacts({ ...facts, location: e.target.value })}
                  className="w-full border-2 border-black p-2.5 bg-stone-50 focus:bg-white font-bold"
                />
              </div>

              <div>
                <label className="block text-stone-500 font-bold mb-1 uppercase">Years of Experience</label>
                <input
                  type="number"
                  value={facts.yearsExperience}
                  onChange={(e) =>
                    setFacts({ ...facts, yearsExperience: parseInt(e.target.value) || 0 })
                  }
                  className="w-full border-2 border-black p-2.5 bg-stone-50 focus:bg-white font-bold"
                />
              </div>

              <div>
                <label className="block text-stone-500 font-bold mb-1 uppercase">Work Authorization</label>
                <input
                  type="text"
                  value={facts.authorizedCountries.join(", ")}
                  onChange={(e) =>
                    setFacts({
                      ...facts,
                      authorizedCountries: e.target.value.split(",").map((s) => s.trim()),
                    })
                  }
                  className="w-full border-2 border-black p-2.5 bg-stone-50 focus:bg-white font-bold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-stone-500 font-bold mb-1 uppercase">
                  Verified Skills ({facts.skills.length})
                </label>
                <div className="flex flex-wrap gap-2 pt-1 mb-2">
                  {facts.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="border-2 border-black bg-[#E2F952]/40 px-2.5 py-1 text-xs font-bold text-black flex items-center gap-1.5"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="hover:text-red-600 font-black text-sm"
                        title="Remove skill"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add extra skill (e.g. AWS, Docker)..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={handleAddSkill}
                    className="border-2 border-black p-2 text-xs flex-1"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="bg-black text-white px-3 py-2 text-xs font-bold uppercase flex items-center gap-1 hover:bg-stone-800"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
              </div>
            </div>

            {/* Zero hallucination note */}
            <div className="flex items-center gap-2.5 p-3.5 bg-stone-100 border-2 border-black text-xs text-stone-800">
              <ShieldCheck className="w-5 h-5 text-black shrink-0" />
              <span>
                These facts are authoritative. If an application asks a question not answered here, the engine halts and asks you rather than guessing.
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

            {/* Error display */}
            {submissionError && (
              <div className="p-4 bg-red-100 border-2 border-red-600 text-xs text-red-950 font-bold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-700 shrink-0" />
                <span>{submissionError}</span>
              </div>
            )}

            {!submissionResult ? (
              <button
                onClick={handleConfirmTruth}
                disabled={isSubmitting}
                className="w-full bg-[#E2F952] text-black p-4 font-black uppercase tracking-wider hover:bg-black hover:text-[#E2F952] transition-colors border-2 border-black brutal-shadow flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Dispatching Resume to Application Pipeline...</span>
                  </>
                ) : (
                  <>
                    <span>Lock Truth Profile & Start Applying (30 Free) &rarr;</span>
                  </>
                )}
              </button>
            ) : (
              <div className="space-y-4 pt-2">
                <div className="p-5 bg-[#E2F952] border-2 border-black text-black space-y-3 brutal-shadow">
                  <div className="flex items-center gap-2 font-black text-sm uppercase">
                    <CheckCircle2 className="w-5 h-5 text-emerald-800 shrink-0 stroke-[3]" />
                    <span>✓ RESUME RECEIVED & 30 COMPLIMENTARY APPLICATIONS QUEUED</span>
                  </div>

                  <p className="text-xs font-bold leading-relaxed text-stone-900">
                    Application ID: <code className="bg-black text-[#E2F952] px-1.5 py-0.5">{submissionResult.applicationId}</code>
                    <br />
                    Your verified resume and Truth Profile have been forwarded to Mander&apos;s review pipeline (<a href="mailto:sales@mander.tech" className="underline font-black">sales@mander.tech</a>).
                    We are now queueing live applications for <strong className="underline">&ldquo;{desiredRole}&rdquo;</strong>.
                  </p>

                  <div className="text-[11px] text-stone-800 bg-white/70 p-2.5 border border-black font-mono">
                    &bull; Complimentary quota: <strong>30 applications</strong>
                    <br />
                    &bull; Weekly personal report: Dispatches to <strong>{facts.email}</strong> &amp; <strong>sales@mander.tech</strong>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link
                    href="/dashboard"
                    className="flex-1 text-center bg-black text-[#E2F952] px-6 py-4 uppercase font-black text-xs tracking-wider hover:bg-stone-800 border-2 border-black brutal-shadow"
                  >
                    See what I&apos;m applying to &rarr;
                  </Link>

                  <button
                    onClick={() => {
                      setSubmissionResult(null);
                      setFacts(null);
                      setFileName(null);
                      setSelectedFile(null);
                    }}
                    className="bg-white text-black px-6 py-4 uppercase font-black text-xs tracking-wider hover:bg-stone-100 border-2 border-black brutal-shadow"
                  >
                    Submit another resume
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
