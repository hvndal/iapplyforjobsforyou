import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard & Dispatch Log | IApplyForJobsForYou",
  description: "View real-time job application queue, submission proof screenshots, and live dispatch logs.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
