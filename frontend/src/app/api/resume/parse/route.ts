import { NextResponse } from "next/server";
import { extractRawText, parseResumeWithAI } from "@/lib/resume-parser";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: "No resume file provided. Please upload a PDF, DOCX, or TXT file." },
        { status: 400 }
      );
    }

    const fileName = (file as any).name || "resume.pdf";
    const mimeType = file.type || "application/pdf";

    // Convert Blob to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (buffer.length === 0) {
      return NextResponse.json(
        { error: "The uploaded file is empty." },
        { status: 400 }
      );
    }

    if (buffer.length > 20 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File exceeds 20MB limit. Please upload a smaller resume." },
        { status: 400 }
      );
    }

    // 1. Extract raw text from file
    const rawText = await extractRawText(buffer, fileName, mimeType);

    // 2. Parse into structured candidate truth profile
    const facts = await parseResumeWithAI(rawText, fileName);

    return NextResponse.json({
      success: true,
      fileName,
      mimeType,
      facts,
      textLength: rawText.length,
    });
  } catch (error: any) {
    console.error("[Resume Parse Error]:", error);
    return NextResponse.json(
      {
        error: "Failed to parse resume.",
        details: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}
