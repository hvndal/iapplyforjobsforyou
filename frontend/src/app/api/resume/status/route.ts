import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const id = searchParams.get("id");

    const submissionsFile = path.resolve(process.cwd(), "data", "submissions.json");

    if (!fs.existsSync(/*turbopackIgnore: true*/ submissionsFile)) {
      return NextResponse.json({ submissions: [], total: 0 });
    }

    const content = fs.readFileSync(/*turbopackIgnore: true*/ submissionsFile, "utf-8");
    const allSubmissions = JSON.parse(content);

    let filtered = allSubmissions;
    if (id) {
      filtered = filtered.filter((s: any) => s.id === id);
    } else if (email) {
      filtered = filtered.filter(
        (s: any) => (s.email || "").toLowerCase() === email.toLowerCase()
      );
    }

    return NextResponse.json({
      success: true,
      submissions: filtered.slice(0, 10),
      total: allSubmissions.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch status", details: error?.message },
      { status: 500 }
    );
  }
}
