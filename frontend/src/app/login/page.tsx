"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Key, ShieldCheck, Check } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20 font-mono space-y-8">
      <div className="space-y-2 border-b-2 border-black pb-6">
        <div className="inline-block bg-black text-[#E2F952] px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest">
          AUTHENTICATION
        </div>
        <h1 className="text-3xl sm:text-4xl font-black uppercase text-black">
          LOG IN
        </h1>
        <p className="text-xs text-stone-600">
          No passwords to forget. I send a magic link directly to your inbox.
        </p>
      </div>

      {sent ? (
        <div className="border-2 border-black p-6 bg-emerald-50 brutal-shadow space-y-3">
          <div className="font-black text-sm text-emerald-950 uppercase flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-700 stroke-[3]" />
            Magic link sent.
          </div>
          <p className="text-xs text-stone-700 leading-relaxed">
            Check <strong className="text-black">{email}</strong>. Click the link to log into your Truth Profile and view what I&apos;ve applied to.
          </p>
          <div className="pt-2">
            <Link
              href="/dashboard"
              className="text-xs font-black underline hover:text-black uppercase"
            >
              Go to dashboard (preview mode) →
            </Link>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="border-2 border-black p-6 bg-white brutal-shadow space-y-4"
        >
          <div>
            <label className="block text-xs uppercase font-extrabold mb-1.5 text-black">
              Your Email Address
            </label>
            <input
              type="email"
              required
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-black p-3 text-xs focus:outline-none bg-stone-50 focus:bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#E2F952] text-black border-2 border-black p-3.5 text-xs font-black uppercase tracking-wider hover:bg-black hover:text-[#E2F952] transition-colors flex items-center justify-center gap-2 brutal-shadow-sm"
          >
            Send magic login link <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2 text-[11px] text-stone-500 pt-2 border-t border-stone-200">
            <ShieldCheck className="w-4 h-4 text-black shrink-0" />
            <span>I protect your data with Row Level Security. No selling resumes.</span>
          </div>
        </form>
      )}
    </div>
  );
}
