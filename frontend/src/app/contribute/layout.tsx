import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contribute Adapters & Code | Open-Source Job Auto-Apply",
  description:
    "Help build and maintain ATS adapters, reporting pipelines, and anti-hallucination guardrails for IApplyForJobsForYou.",
  alternates: {
    canonical: "/contribute",
  },
};

export default function ContributeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
