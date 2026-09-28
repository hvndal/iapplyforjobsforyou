"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X, Check, Flame, Coffee, Clock } from "lucide-react";

export function PhotoContrastSection() {
  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-20 font-mono">
      <div className="text-center space-y-3 mb-14">
        <div className="inline-block bg-black text-[#E2F952] px-3 py-1 text-xs font-black uppercase tracking-widest">
          A TALE OF TWO JOB HUNTERS
        </div>
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black">
          WHICH ONE ARE YOU RIGHT NOW?
        </h2>
        <p className="text-stone-600 text-sm max-w-xl mx-auto">
          One of these people spent 6 hours copying and pasting bullets into Workday.
          The other person let me apply for 30 jobs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Left: Stressed Applicant */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="border-2 border-black bg-stone-900 text-white brutal-shadow flex flex-col justify-between overflow-hidden"
        >
          <div className="relative h-64 sm:h-72 w-full overflow-hidden border-b-2 border-black">
            <Image
              src="https://images.unsplash.com/photo-1541178735493-479c1a27ed24?auto=format&fit=crop&w=800&q=80"
              alt="Stressed person applying on LinkedIn late at night"
              fill
              className="object-cover grayscale contrast-125"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Warning Stamp */}
            <div className="absolute top-4 left-4 bg-rose-600 text-white font-black text-xs px-3 py-1 uppercase border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5">
              <X className="w-3.5 h-3.5 stroke-[3]" />
              <span>THE LINKEDIN NIGHTMARE</span>
            </div>
            <div className="absolute bottom-3 right-3 bg-black/80 text-stone-300 text-[10px] px-2 py-0.5 border border-stone-700">
              3:47 AM • 4 tabs open
            </div>
          </div>

          <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="text-xl font-black uppercase text-rose-400">
                You: Suffering Alone in Dark Mode
              </h3>
              <ul className="space-y-2 text-xs text-stone-300 list-disc pl-4">
                <li>Creating your 14th Workday account with special password rules.</li>
                <li>Writing an essay about why you are passionate about medical billing software.</li>
                <li>Retyping your entire resume into 38 separate input boxes.</li>
                <li>Received 0 interviews, 4 automated rejection emails.</li>
              </ul>
            </div>

            <div className="p-3 bg-rose-950/60 border border-rose-800 text-[11px] text-rose-300 font-bold">
              Time spent: 18 hours / week • Sanity: 0%
            </div>
          </div>
        </motion.div>

        {/* Right: Relaxed Applicant */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="border-2 border-black bg-white brutal-shadow flex flex-col justify-between overflow-hidden"
        >
          <div className="relative h-64 sm:h-72 w-full overflow-hidden border-b-2 border-black">
            <Image
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
              alt="Person enjoying coffee with friends while robot applies"
              fill
              className="object-cover saturate-125"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Green Certified Stamp */}
            <div className="absolute top-4 left-4 bg-[#E2F952] text-black font-black text-xs px-3 py-1 uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>THE LITERAL WAY</span>
            </div>
            <div className="absolute bottom-3 right-3 bg-white/90 text-black text-[10px] font-bold px-2 py-0.5 border border-black">
              2:15 PM • Having an espresso
            </div>
          </div>

          <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="text-xl font-black uppercase text-black">
                You: Living Your Actual Life
              </h3>
              <ul className="space-y-2 text-xs text-stone-700 list-disc pl-4 font-bold">
                <li>Uploaded your resume once into the Truth Database.</li>
                <li>I parsed and matched 30 verified jobs across Greenhouse & Ashby.</li>
                <li>I answered prompts using only your real projects & skills.</li>
                <li>You get a notification when someone schedules an interview.</li>
              </ul>
            </div>

            <div className="p-3 bg-[#E2F952]/40 border-2 border-black text-[11px] text-black font-black flex items-center justify-between">
              <span>Time spent: 60 seconds • 30 Applications Applied</span>
              <Coffee className="w-4 h-4 text-black" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
