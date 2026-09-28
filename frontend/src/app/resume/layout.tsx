import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upload & Verify Resume Facts | IApplyForJobsForYou",
  description:
    "Extract and verify your ground-truth employment facts, work authorization, and compensation preferences before automated submissions.",
  alternates: {
    canonical: "/resume",
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
