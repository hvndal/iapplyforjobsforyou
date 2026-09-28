import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In | IApplyForJobsForYou",
  description: "Log in with your magic link to manage your job application queue and dispatch audit logs.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
