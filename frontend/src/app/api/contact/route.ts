import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const RECIPIENT_EMAIL = "sales@mander.tech";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, type = "inquiry" } = body;

    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required." },
        { status: 400 }
      );
    }

    const emailSubject =
      subject || `[I Apply For Jobs For You] New ${type.toUpperCase()} from ${name || email}`;

    const textContent = `
=========================================
I APPLY FOR JOBS FOR YOU - INCOMING QUERY
=========================================
Sender Name:  ${name || "Anonymous / Not specified"}
Sender Email: ${email}
Category:     ${type}
Timestamp:    ${new Date().toISOString()}

Message:
-----------------------------------------
${message}
-----------------------------------------
Target Destination: ${RECIPIENT_EMAIL}
=========================================
    `.trim();

    const htmlContent = `
      <div style="font-family: monospace; background: #FAF8F5; padding: 24px; border: 2px solid #000;">
        <h2 style="margin-top: 0; text-transform: uppercase; font-size: 18px; border-bottom: 2px solid #000; padding-bottom: 8px;">
          I Apply For Jobs For You // New Query
        </h2>
        <p><strong>From:</strong> ${name || "Anonymous"} (&lt;<a href="mailto:${email}">${email}</a>&gt;)</p>
        <p><strong>Category:</strong> ${type}</p>
        <p><strong>Received:</strong> ${new Date().toLocaleString()}</p>
        <hr style="border: none; border-top: 1px dashed #000; margin: 16px 0;" />
        <div style="background: #fff; padding: 16px; border: 1px solid #000; white-space: pre-wrap; font-size: 13px;">
${message}
        </div>
        <p style="font-size: 11px; color: #666; margin-top: 16px;">
          Automatically forwarded to <strong>${RECIPIENT_EMAIL}</strong>
        </p>
      </div>
    `;

    // 1. If SMTP credentials exist in environment, send via Nodemailer
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587", 10),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"${name || "I Apply For Jobs For You"}" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
        to: RECIPIENT_EMAIL,
        replyTo: email,
        subject: emailSubject,
        text: textContent,
        html: htmlContent,
      });

      console.log(`[Email Dispatch] Successfully sent email to ${RECIPIENT_EMAIL}`);
    } else {
      // 2. Fallback / Dev logger: record dispatch payload ready for sales@mander.tech
      console.log(`\n==================================================`);
      console.log(`[DISPATCH TO: ${RECIPIENT_EMAIL}]`);
      console.log(`Subject: ${emailSubject}`);
      console.log(`Reply-To: ${email}`);
      console.log(`Content:\n${textContent}`);
      console.log(`==================================================\n`);
    }

    return NextResponse.json({
      success: true,
      forwardedTo: RECIPIENT_EMAIL,
      message: `Your query has been transferred to ${RECIPIENT_EMAIL}.`,
    });
  } catch (error: any) {
    console.error("[Email Dispatch Error]:", error);
    return NextResponse.json(
      { error: "Failed to forward query", details: error?.message },
      { status: 500 }
    );
  }
}
