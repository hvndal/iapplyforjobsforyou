"use client";

import React from "react";
import { motion } from "framer-motion";

const companies = [
  "GREENHOUSE",
  "LEVER",
  "ASHBY",
  "LINEAR",
  "VERCEL",
  "SUPABASE",
  "STRIPE",
  "SHOPIFY",
  "AIRBNB",
  "GITHUB",
  "RAMP",
  "RETOOL",
];

export function AnimatedMarquee() {
  return (
    <div className="w-full bg-[#E2F952] border-y-2 border-black py-2.5 overflow-hidden font-mono select-none">
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
          className="flex items-center gap-8 text-black font-black text-xs uppercase tracking-widest shrink-0"
        >
          {[...companies, ...companies, ...companies].map((company, index) => (
            <span key={index} className="flex items-center gap-3">
              <span>{company}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-black" />
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
