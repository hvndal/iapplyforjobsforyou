import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const RECIPIENT_EMAIL = "sales@mander.tech";

// Ensure durable storage directories exist
function getStoragePaths() {
  const baseDir = path.resolve(process.cwd(), "data");
  const resumesDir = path.join(baseDir, "resumes");
  const submissionsFile = path.join(baseDir, "submissions.json");

  try {
    if (!fs.existsSync(/*turbopackIgnore: true*/ baseDir)) {
      fs.mkdirSync(/*turbopackIgnore: true*/ baseDir, { recursive: true });
    }
    if (!fs.existsSync(/*turbopackIgnore: true*/ resumesDir)) {
      fs.mkdirSync(/*turbopackIgnore: true*/ resumesDir, { recursive: true });
    }
  } catch (err) {
    console.warn("[Storage directory init warning]:", err);
  }

  return { baseDir, resumesDir, submissionsFile };
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const factsRaw = formData.get("facts") as string | null;
    const preferencesRaw = formData.get("preferences") as string | null;

    if (!factsRaw) {
      return NextResponse.json(
        { error: "Candidate verified facts are required." },
        { status: 400 }
      );
    }

    const facts = JSON.parse(factsRaw);
    const preferences = preferencesRaw
      ? JSON.parse(preferencesRaw)
      : {
          desiredRole: facts.roles || "Software Engineer",
          minSalary: "120000",
          remotePreference: "remote_only",
        };

    const submissionId = `app_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const timestamp = new Date().toISOString();

    let buffer: Buffer | null = null;
    let fileName = "resume.pdf";
    let mimeType = "application/pdf";

    if (file && file instanceof Blob) {
      fileName = (file as any).name || "candidate_resume.pdf";
      mimeType = file.type || "application/pdf";
      const arrayBuffer = await file.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    }

    // 1. Persist submission safely to local disk store
    try {
      const { resumesDir, submissionsFile } = getStoragePaths();

      let savedFilePath: string | null = null;
      if (buffer) {
        const safeName = `${submissionId}_${fileName.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
        savedFilePath = path.join(resumesDir, safeName);
        fs.writeFileSync(savedFilePath, buffer);
      }

      const submissionRecord = {
        id: submissionId,
        submittedAt: timestamp,
        candidateName: facts.name || "Anonymous Candidate",
        email: facts.email || "not-provided@example.com",
        phone: facts.phone || null,
        location: facts.location || "Remote",
        desiredRole: preferences.desiredRole,
        minSalary: preferences.minSalary,
        remotePreference: preferences.remotePreference,
        skills: facts.skills || [],
        yearsExperience: facts.yearsExperience || 0,
        authorizedCountries: facts.authorizedCountries || ["Canada", "US"],
        requiresSponsorship: Boolean(facts.requiresSponsorship),
        resumeFileName: fileName,
        savedResumePath: savedFilePath,
        status: "active_queued",
        complimentaryApplicationsQueued: 30,
      };

      let existingSubmissions: any[] = [];
      if (fs.existsSync(/*turbopackIgnore: true*/ submissionsFile)) {
        try {
          const content = fs.readFileSync(/*turbopackIgnore: true*/ submissionsFile, "utf-8");
          existingSubmissions = JSON.parse(content);
        } catch {
          existingSubmissions = [];
        }
      }
      existingSubmissions.unshift(submissionRecord);
      fs.writeFileSync(/*turbopackIgnore: true*/ submissionsFile, JSON.stringify(existingSubmissions, null, 2));
      console.log(`[Storage] Saved submission ${submissionId} to ${submissionsFile}`);
    } catch (saveErr) {
      console.warn("[Local persistence warning]:", saveErr);
    }

    // 2. Dispatch Email with Resume Attachment to sales@mander.tech
    const emailSubject = `[New Candidate Application] ${facts.name || facts.email} - Target: ${preferences.desiredRole} ($${preferences.minSalary})`;

    const emailText = `
=====================================================
I APPLY FOR JOBS FOR YOU - NEW CANDIDATE SUBMISSION
=====================================================
Application ID:      ${submissionId}
Submission Time:     ${timestamp}
Complimentary Tier:  30 Applications Activated

CANDIDATE INFORMATION:
-----------------------------------------------------
Name:                ${facts.name || "Not specified"}
Email:               ${facts.email || "Not specified"}
Phone:               ${facts.phone || "Not specified"}
Location:            ${facts.location || "Not specified"}
Work Authorization:  ${(facts.authorizedCountries || ["Canada", "US"]).join(", ")}
Requires Visa:       ${facts.requiresSponsorship ? "Yes" : "No"}

PREFERENCES & JOB TARGET:
-----------------------------------------------------
Target Job Title:    ${preferences.desiredRole}
Minimum Salary:      $${preferences.minSalary} USD
Workplace Mode:      ${preferences.remotePreference}
Years Experience:    ${facts.yearsExperience || "Not specified"}
Key Skills:          ${(facts.skills || []).join(", ")}

ACTION REQUIRED:
-----------------------------------------------------
1. Review attached resume file: ${fileName}
2. Queue top matching positions across Greenhouse, Lever, and Ashby.
3. Prepare 7-day personal job report for candidate.

Target Destination:  ${RECIPIENT_EMAIL}
=====================================================
    `.trim();

    const emailHtml = `
      <div style="font-family: monospace; background: #FAF8F5; padding: 24px; border: 2px solid #000; max-width: 650px;">
        <div style="background: #000; color: #E2F952; padding: 8px 12px; font-weight: bold; font-size: 13px; margin-bottom: 16px;">
          I APPLY FOR JOBS FOR YOU // NEW APPLICATION RECEIVED
        </div>

        <h2 style="margin: 0 0 12px; text-transform: uppercase; font-size: 18px; color: #000;">
          ${facts.name || "New Candidate"} &mdash; ${preferences.desiredRole}
        </h2>

        <div style="background: #fff; padding: 16px; border: 1px solid #000; margin-bottom: 16px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <tr><td style="padding: 4px 0; color: #666;">Candidate:</td><td style="font-weight: bold;">${facts.name || "N/A"}</td></tr>
            <tr><td style="padding: 4px 0; color: #666;">Email:</td><td><a href="mailto:${facts.email}">${facts.email}</a></td></tr>
            <tr><td style="padding: 4px 0; color: #666;">Phone:</td><td>${facts.phone || "N/A"}</td></tr>
            <tr><td style="padding: 4px 0; color: #666;">Location:</td><td>${facts.location || "Remote"}</td></tr>
            <tr><td style="padding: 4px 0; color: #666;">Target Role:</td><td style="font-weight: bold; color: #000;">${preferences.desiredRole}</td></tr>
            <tr><td style="padding: 4px 0; color: #666;">Min Salary:</td><td>$${preferences.minSalary} USD</td></tr>
            <tr><td style="padding: 4px 0; color: #666;">Workplace:</td><td>${preferences.remotePreference}</td></tr>
            <tr><td style="padding: 4px 0; color: #666;">Experience:</td><td>${facts.yearsExperience || 0} years</td></tr>
            <tr><td style="padding: 4px 0; color: #666;">Authorized in:</td><td>${(facts.authorizedCountries || []).join(", ")}</td></tr>
            <tr><td style="padding: 4px 0; color: #666;">Sponsorship:</td><td>${facts.requiresSponsorship ? "Yes" : "No"}</td></tr>
          </table>
        </div>

        <div style="background: #E2F952; padding: 12px; border: 1px solid #000; margin-bottom: 16px; font-weight: bold; font-size: 12px; color: #000;">
          Skills: ${(facts.skills || []).join(" &bull; ")}
        </div>

        <p style="font-size: 12px; color: #333; margin-top: 12px;">
          📎 Resume Attached: <strong>${fileName}</strong> (${buffer ? Math.round(buffer.length / 1024) : 0} KB)
        </p>

        <p style="font-size: 11px; color: #666; margin-top: 16px; border-top: 1px dashed #000; padding-top: 8px;">
          Forwarded automatically to <strong>${RECIPIENT_EMAIL}</strong> &bull; Application ID: ${submissionId}
        </p>
      </div>
    `;

    // Send email with attachment if SMTP is configured
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || "587", 10),
          secure: process.env.SMTP_SECURE === "true",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        const attachments = buffer
          ? [
              {
                filename: fileName,
                content: buffer,
                contentType: mimeType,
              },
            ]
          : [];

        await transporter.sendMail({
          from: `"I Apply For Jobs For You" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
          to: RECIPIENT_EMAIL,
          replyTo: facts.email || undefined,
          subject: emailSubject,
          text: emailText,
          html: emailHtml,
          attachments,
        });

        console.log(`[Email Dispatch] Successfully sent resume email to ${RECIPIENT_EMAIL}`);
      } catch (mailErr) {
        console.error("[Email Dispatch Error]:", mailErr);
      }
    } else {
      console.log(`\n======================================================`);
      console.log(`[RESUME DISPATCH LOG -> ${RECIPIENT_EMAIL}]`);
      console.log(`Subject: ${emailSubject}`);
      console.log(`File: ${fileName} (${buffer ? buffer.length : 0} bytes)`);
      console.log(`Payload:\n${emailText}`);
      console.log(`======================================================\n`);
    }

    // 3. Supabase integration (if configured)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey && !supabaseUrl.includes("placeholder-project")) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);

        // Check if profiles table exists and insert candidate profile
        const { error: profileError } = await supabase.from("profiles").upsert(
          {
            email: facts.email || `candidate-${submissionId}@iapplyforjobsforyou.local`,
            full_name: facts.name || "Candidate",
            phone: facts.phone || null,
            location: facts.location || null,
            updated_at: timestamp,
          },
          { onConflict: "email" }
        );

        if (profileError) {
          console.warn("[Supabase profiles insert warning]:", profileError.message);
        } else {
          console.log(`[Supabase] Candidate profile registered in database`);
        }
      } catch (dbErr) {
        console.warn("[Supabase sync warning]:", dbErr);
      }
    }

    // Return confirmed candidate record to client
    return NextResponse.json({
      success: true,
      applicationId: submissionId,
      forwardedTo: RECIPIENT_EMAIL,
      message: `Resume received and locked. 30 complimentary applications queued. Forwarded to ${RECIPIENT_EMAIL}.`,
      candidate: {
        id: submissionId,
        name: facts.name || "Candidate",
        email: facts.email || "",
        phone: facts.phone || "",
        location: facts.location || "Remote",
        desiredRole: preferences.desiredRole,
        minSalary: preferences.minSalary,
        remotePreference: preferences.remotePreference,
        skills: facts.skills || [],
        yearsExperience: facts.yearsExperience || 0,
        authorizedCountries: facts.authorizedCountries || ["Canada", "US"],
        requiresSponsorship: Boolean(facts.requiresSponsorship),
        resumeFileName: fileName,
        applicationsRemaining: 30,
        submittedAt: timestamp,
      },
    });
  } catch (error: any) {
    console.error("[Resume Submit Error]:", error);
    return NextResponse.json(
      {
        error: "Failed to submit resume.",
        details: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}
