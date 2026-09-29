import { extractText } from "unpdf";
import { GoogleGenAI } from "@google/genai";

export interface ExtractedFacts {
  name: string;
  email: string;
  phone?: string;
  location: string;
  roles: string;
  skills: string[];
  yearsExperience: number;
  authorizedCountries: string[];
  requiresSponsorship: boolean;
}

/**
 * Extract raw text from uploaded resume buffer (PDF, TXT, DOCX, etc.)
 */
export async function extractRawText(
  buffer: Buffer,
  fileName: string,
  mimeType: string
): Promise<string> {
  const isPdf =
    fileName.toLowerCase().endsWith(".pdf") || mimeType === "application/pdf";
  const isTxt =
    fileName.toLowerCase().endsWith(".txt") ||
    fileName.toLowerCase().endsWith(".md") ||
    mimeType.startsWith("text/");

  if (isPdf) {
    try {
      const uint8 = new Uint8Array(buffer);
      const result = await extractText(uint8);
      const text = Array.isArray(result.text) ? result.text.join("\n") : String(result.text || "");
      if (text.trim().length > 0) {
        return text;
      }
    } catch (err) {
      console.warn("[unpdf extraction error, falling back to string scan]:", err);
    }
  }

  if (isTxt) {
    return buffer.toString("utf-8");
  }

  // Fallback for docx or other binaries: extract readable unicode/ascii runs
  const rawStr = buffer.toString("binary");
  const printable = rawStr.replace(/[^\x20-\x7E\t\n\r]/g, " ");
  const clean = printable.replace(/\s{2,}/g, " ").trim();
  return clean.length > 50 ? clean : buffer.toString("utf-8");
}

/**
 * Intelligent regex & heuristic candidate fact extractor (zero-API-key fallback)
 */
export function extractFactsHeuristically(
  text: string,
  fileName: string
): ExtractedFacts {
  // 1. Email extraction
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i;
  const emailMatch = text.match(emailRegex);
  const email = emailMatch ? emailMatch[1].trim() : "";

  // 2. Phone extraction
  const phoneRegex = /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?/i;
  const phoneMatch = text.match(phoneRegex);
  const phone = phoneMatch ? phoneMatch[0].trim() : undefined;

  // 3. Name extraction: examine top lines of text or file name
  let name = "";
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 1 && !/resume|curriculum|vitae|page|http|www|@/i.test(l));

  if (lines.length > 0) {
    const candidateLine = lines[0];
    // Check if line looks like a human name (2-4 words, starts with letters)
    if (/^[A-Za-zÀ-ÖØ-öø-ÿ'. -]{2,40}$/.test(candidateLine) && candidateLine.split(" ").length <= 4) {
      name = candidateLine;
    }
  }

  if (!name) {
    // Try to guess from email or file name
    const baseName = fileName.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ");
    if (baseName.length > 2 && !/resume|cv|untitled/i.test(baseName)) {
      name = baseName
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" ");
    } else if (email) {
      name = email.split("@")[0].replace(/[._-]/g, " ");
      name = name
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" ");
    } else {
      name = "Candidate";
    }
  }

  // 4. Skills extraction against comprehensive dictionary
  const skillDictionary = [
    "TypeScript", "JavaScript", "React", "Next.js", "Vue", "Angular", "Node.js", "Python",
    "Django", "FastAPI", "Go", "Golang", "Rust", "Java", "Spring Boot", "C++", "C#", ".NET",
    "SQL", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase", "Firebase",
    "GraphQL", "REST APIs", "Tailwind CSS", "HTML5", "CSS3", "Sass",
    "Docker", "Kubernetes", "AWS", "Google Cloud", "GCP", "Azure", "Terraform",
    "Git", "GitHub Actions", "CI/CD", "Playwright", "Jest", "Cypress", "Linux",
    "Machine Learning", "PyTorch", "TensorFlow", "Pandas", "NumPy"
  ];

  const lowerText = text.toLowerCase();
  const matchedSkills: string[] = [];
  for (const skill of skillDictionary) {
    const escaped = skill.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    const regex = new RegExp(`\\b${escaped}\\b`, "i");
    if (regex.test(lowerText)) {
      matchedSkills.push(skill);
      if (matchedSkills.length >= 10) break;
    }
  }

  if (matchedSkills.length === 0) {
    matchedSkills.push("Software Engineering", "Problem Solving", "Web Development");
  }

  // 5. Target role extraction
  const commonRoles = [
    "Senior Frontend Engineer",
    "Frontend Engineer",
    "Full Stack Developer",
    "Full Stack Engineer",
    "Backend Engineer",
    "Software Engineer",
    "DevOps Engineer",
    "Data Engineer",
    "Mobile Developer",
    "Product Engineer"
  ];

  let detectedRole = "Software Engineer";
  for (const role of commonRoles) {
    const escaped = role.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    if (new RegExp(`\\b${escaped}\\b`, "i").test(text)) {
      detectedRole = role;
      break;
    }
  }

  // 6. Location detection
  const locationList = [
    "Vancouver, Canada",
    "Toronto, Canada",
    "Montreal, Canada",
    "Calgary, Canada",
    "Ottawa, Canada",
    "San Francisco, USA",
    "New York, USA",
    "Seattle, USA",
    "Austin, USA",
    "Los Angeles, USA",
    "London, UK",
    "Remote"
  ];

  let detectedLocation = "Remote / Canada & USA";
  for (const loc of locationList) {
    const city = loc.split(",")[0];
    if (new RegExp(`\\b${city}\\b`, "i").test(text)) {
      detectedLocation = loc;
      break;
    }
  }

  // 7. Years of experience calculation
  let years = 3;
  const yearsMatch = text.match(/(\d+)\+?\s*years?(?:\s+of)?\s+(?:experience|work)/i);
  if (yearsMatch) {
    const parsedYears = parseInt(yearsMatch[1], 10);
    if (parsedYears > 0 && parsedYears < 40) {
      years = parsedYears;
    }
  }

  return {
    name,
    email,
    phone,
    location: detectedLocation,
    roles: detectedRole,
    skills: matchedSkills,
    yearsExperience: years,
    authorizedCountries: ["Canada", "US"],
    requiresSponsorship: false,
  };
}

/**
 * Parse resume using Gemini Flash if API key is available, else heuristic fallback
 */
export async function parseResumeWithAI(
  text: string,
  fileName: string
): Promise<ExtractedFacts> {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `
Extract the candidate's factual details strictly from this resume text into JSON format matching this schema:
{
  "name": "string (candidate full name)",
  "email": "string (candidate email address)",
  "phone": "string (candidate phone number if present)",
  "location": "string (city and country)",
  "roles": "string (primary job title / target role)",
  "skills": ["string"] (array of up to 10 verified technical skills),
  "yearsExperience": number (estimated total years of professional experience),
  "authorizedCountries": ["string"] (countries authorized to work in if stated, e.g. ["Canada", "US"]),
  "requiresSponsorship": boolean (true if stated requires visa sponsorship, false otherwise)
}

RULES:
- Do NOT hallucinate. Ground everything in the provided text.
- If email is not in text, leave as empty string.
- If candidate name cannot be identified, make best guess from header.

Resume Text:
${text.slice(0, 15000)}
`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          systemInstruction:
            "You are a strict, deterministic resume parser. You extract only verified facts and never hallucinate.",
        },
      });

      if (response && response.text) {
        const parsed = JSON.parse(response.text);
        return {
          name: parsed.name || "Candidate",
          email: parsed.email || "",
          phone: parsed.phone,
          location: parsed.location || "Remote",
          roles: parsed.roles || "Software Engineer",
          skills: Array.isArray(parsed.skills) && parsed.skills.length > 0 ? parsed.skills : ["Software Engineering"],
          yearsExperience: typeof parsed.yearsExperience === "number" ? parsed.yearsExperience : 3,
          authorizedCountries: Array.isArray(parsed.authorizedCountries) ? parsed.authorizedCountries : ["Canada", "US"],
          requiresSponsorship: Boolean(parsed.requiresSponsorship),
        };
      }
    } catch (err) {
      console.warn("[Gemini API parsing fallback]:", err);
    }
  }

  // Heuristic extraction fallback
  return extractFactsHeuristically(text, fileName);
}
