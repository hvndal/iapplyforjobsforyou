import React from "react";

export function BmcLogo({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 763 1080"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M626.5 440.5C642.5 440.5 674.5 433.5 690 410C712 376.5 714 308.5 714 278C714 246.5 706 182.5 667 154.5C635 131.5 588 131.5 572 131.5H197C162.5 131.5 137.5 159 137.5 193.5V606.5C137.5 675.5 193.5 731.5 262.5 731.5H457.5C533.5 731.5 596 669.5 597 593.5L597.5 440.5H626.5ZM603 234.5C611.5 234.5 628.5 237.5 636.5 251C646.5 268 646 312 642 329C638.5 344 624 353 613 354.5L598 356V234.5H603Z"
        fill="currentColor"
      />
      <path
        d="M260.5 832.5H485C509.853 832.5 530 852.647 530 877.5C530 902.353 509.853 922.5 485 922.5H260.5C235.647 922.5 215.5 902.353 215.5 877.5C215.5 852.647 235.647 832.5 260.5 832.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function BuyMeACoffeeButton({
  className = "",
  text = "Buy me a coffee",
}: {
  className?: string;
  text?: string;
}) {
  return (
    <a
      href="https://buymeacoffee.com/hermanify"
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-2.5 bg-[#FFDD00] text-black font-extrabold px-5 py-3 border-2 border-black tracking-wider uppercase text-xs hover:bg-[#ffe338] transition-all brutal-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 ${className}`}
    >
      <BmcLogo className="w-4 h-5 text-black" />
      <span>{text}</span>
    </a>
  );
}

export function FloatingBmcWidget() {
  return (
    <aside
      aria-label="Support the project"
      className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-2 group"
    >
      <a
        href="https://buymeacoffee.com/hermanify"
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2.5 bg-[#FFDD00] text-black px-4 py-3 border-2 border-black brutal-shadow font-mono text-xs font-black uppercase tracking-wider hover:bg-black hover:text-[#FFDD00] transition-all"
      >
        <BmcLogo className="w-4 h-5" />
        <span>Buy me a coffee</span>
      </a>
    </aside>
  );
}
