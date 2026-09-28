import type { Metadata } from "next";
import Link from "next/link";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { FloatingBmcWidget, BmcLogo } from "@/components/BuyMeACoffee";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://iapplyforjobsforyou.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "I APPLY FOR JOBS FOR YOU — The Internet's Most Literal Job Tool",
    template: "%s | I Apply For Jobs For You",
  },
  description:
    "You find the job. I apply to it. Automated job application assistant engineered with zero hallucinated qualifications. Built by Mander.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "I APPLY FOR JOBS FOR YOU — The Internet's Most Literal Job Tool",
    description:
      "You find the job. I apply to it. Automated job application assistant with zero hallucinated qualifications. Built by Mander.",
    url: siteUrl,
    siteName: "I Apply For Jobs For You",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "I APPLY FOR JOBS FOR YOU — The Internet's Most Literal Job Tool",
    description:
      "You find the job. I apply to it. Automated job application assistant with zero hallucinated qualifications. Built by Mander.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": "I Apply For Jobs For You",
        "description": "You find the job. I apply to it. The internet's most literal job application utility.",
        "publisher": {
          "@type": "Organization",
          "@id": "https://www.mander.tech/#organization",
          "name": "Mander",
          "url": "https://www.mander.tech/",
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}/#software`,
        "name": "I Apply For Jobs For You",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
        },
        "creator": {
          "@type": "Organization",
          "@id": "https://www.mander.tech/#organization",
          "name": "Mander",
          "url": "https://www.mander.tech/",
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-black selection:text-white font-sans relative">
        {/* Top Ticker Bar */}
        <div className="bg-black text-white text-[11px] font-mono py-1.5 px-4 overflow-hidden border-b border-black">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#E2F952] animate-ping" />
                <span className="w-2 h-2 rounded-full bg-[#E2F952] -ml-3.5" />
                <span className="font-bold text-[#E2F952]">STATUS:</span> READY TO APPLY
              </span>
              <span className="text-stone-500 hidden sm:inline">|</span>
              <span className="text-stone-300 hidden sm:inline">
                4,218 applications sent this week • 0 fabricated facts • First 30 free
              </span>
            </div>

            <div className="flex items-center gap-4 text-stone-400">
              <span className="hidden md:inline font-bold text-white tracking-widest uppercase">
                FUCK LINKEDIN.
              </span>
              <a
                href="https://buymeacoffee.com/hermanify"
                target="_blank"
                rel="noreferrer"
                className="text-[#FFDD00] hover:underline flex items-center gap-1 font-bold"
              >
                <BmcLogo className="w-3.5 h-3.5" />
                <span>Buy me a coffee</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <header className="sticky top-0 z-50 border-b-2 border-black bg-[#FAF8F5]/95 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link
              href="/"
              className="font-mono text-base font-extrabold uppercase tracking-tight text-black flex items-center gap-2.5 group"
            >
              <div className="w-4 h-4 bg-black group-hover:bg-[#E2F952] transition-colors border border-black" />
              <span className="tracking-tighter">I APPLY FOR JOBS FOR YOU</span>
            </Link>

            <nav className="flex items-center gap-4 sm:gap-6 font-mono text-xs uppercase tracking-wider font-bold">
              <Link href="/about-the-project" className="hidden lg:inline text-stone-700 hover:text-black hover:underline">
                About
              </Link>
              <Link href="/how-it-works" className="hidden sm:inline text-stone-700 hover:text-black hover:underline">
                How I work
              </Link>
              <Link href="/pricing" className="hidden sm:inline text-stone-700 hover:text-black hover:underline">
                Pricing
              </Link>
              <Link href="/dashboard" className="text-stone-700 hover:text-black hover:underline">
                Dashboard
              </Link>
              <Link href="/contribute" className="hidden md:inline text-stone-700 hover:text-black hover:underline">
                Community
              </Link>
              <Link href="/login" className="hidden sm:inline text-stone-700 hover:text-black hover:underline">
                Log in
              </Link>
              <Link
                href="/resume"
                className="bg-[#E2F952] text-black px-4 py-2 font-mono font-extrabold uppercase text-xs border-2 border-black brutal-shadow-sm hover:bg-black hover:text-[#E2F952] transition-colors"
              >
                Give me resume →
              </Link>
            </nav>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1">{children}</main>

        {/* Upfront Floating Buy Me A Coffee Widget */}
        <FloatingBmcWidget />

        {/* Solid Iconic Footer with Mander Attribution */}
        <footer className="border-t-2 border-black py-12 px-6 bg-white font-mono text-xs">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b-2 border-black pb-8">
              <div className="space-y-1.5">
                <div className="font-extrabold text-base text-black uppercase tracking-tight flex items-center gap-2">
                  <span>I APPLY FOR JOBS FOR YOU</span>
                  <span className="text-[10px] bg-black text-white px-2 py-0.5 font-normal">
                    v1.0.0
                  </span>
                </div>
                <div className="text-stone-600 text-xs">
                  The brutally literal job application utility. Engineered with zero hallucinated qualifications.
                </div>
                <div className="text-xs text-stone-700 pt-0.5">
                  <a
                    href="https://www.mander.tech/"
                    target="_blank"
                    rel="noopener"
                    className="font-extrabold text-black underline hover:bg-[#E2F952] px-0.5 transition-colors"
                  >
                    Built by Mander
                  </a>{" "}
                  • A small web studio building fast websites and software.
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-black font-bold uppercase">
                <Link href="/about-the-project" className="hover:underline">About</Link>
                <Link href="/how-it-works" className="hover:underline">How it works</Link>
                <Link href="/pricing" className="hover:underline">Pricing</Link>
                <Link href="/dashboard" className="hover:underline">Dashboard</Link>
                <Link href="/contribute" className="hover:underline">Community</Link>
                <a
                  href="https://buymeacoffee.com/hermanify"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#FFDD00] text-black px-3 py-1 border-2 border-black font-extrabold hover:bg-black hover:text-[#FFDD00] transition-colors"
                >
                  <BmcLogo className="w-3.5 h-3.5" />
                  <span>Buy me coffee</span>
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-stone-500 text-[11px] gap-4">
              <div>
                © {new Date().getFullYear()} I Apply For Jobs For You •{" "}
                <a
                  href="https://www.mander.tech/"
                  target="_blank"
                  rel="noopener"
                  className="hover:text-black underline font-bold"
                >
                  Built by Mander
                </a>
              </div>
              <div className="font-bold text-black uppercase tracking-widest">
                FUCK LINKEDIN.
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
