"""
Gemini Intelligence Service:
- Parses user resume into structured UserTruthProfile
- Extracts structured job criteria
- Answers application questions STRICTLY grounded in facts, never hallucinating
"""
import os
import json
from google import genai
from google.genai import types
from models.truth_profile import UserTruthProfile

# Initialize Google GenAI client (uses GEMINI_API_KEY environment variable)
client = genai.Client()

MODEL_NAME = "gemini-3.8-flash"

SYSTEM_INSTRUCTION = """
You are the AI brain behind 'I Apply For Jobs For You'.
Your tone is exact, competent, and honest.
Critical Rule: You NEVER invent, manufacture, or hallucinate facts about the user.
If an application question asks for information not in the user's truth profile (e.g. visa status, security clearance, years of experience with a tech stack they never used), you MUST state clearly: UNKNOWN_NEED_USER_INPUT.
"""

def parse_resume_to_profile(resume_text: str) -> dict:
    """Parse resume text into structured profile JSON."""
    prompt = f"""
    Extract the candidate's factual details into structured JSON matching this schema:
    - personal: name, email, phone, location, linkedin_url, portfolio_url, github_url
    - work_authorization: authorized_countries, requires_sponsorship, willing_to_relocate
    - experience: list of [company, title, location, start_date, end_date, is_current, highlights]
    - education: list of [institution, degree, field_of_study, graduation_year]
    - skills: list of skills

    Resume Text:
    {resume_text}
    """
    
    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt,
        config=types.GenerateContentConfig(
            system_instruction=SYSTEM_INSTRUCTION,
            response_mime_type="application/json"
        )
    )
    return json.loads(response.text)

def answer_application_question(
    question: str,
    truth_profile: UserTruthProfile,
    job_description: str
) -> dict:
    """
    Answers an application question strictly grounded in verified facts.
    Returns:
    {
      "can_answer": bool,
      "answer": str,
      "reason": str
    }
    """
    profile_json = truth_profile.model_dump_json(indent=2)
    prompt = f"""
    Question to answer: "{question}"

    Job Description Context:
    {job_description}

    User Truth Profile (ONLY VERIFIED FACTS):
    {profile_json}

    Task:
    Provide an answer in natural, professional first-person ("I").
    CRITICAL:
    - If the question requires unknown facts (e.g. "Do you have 7 years of Rust?", "Are you authorized in UK?"), and the truth profile does not provide proof, do NOT invent it.
    Set "can_answer" to false and explain what specific input is needed.
    - If it's an open-ended question ("Why this role?"), ground the motivation strictly in their actual projects, skills, and background.
    """

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt,
        config=types.GenerateContentConfig(
            system_instruction=SYSTEM_INSTRUCTION,
            response_mime_type="application/json",
            response_schema={
                "type": "OBJECT",
                "properties": {
                    "can_answer": {"type": "BOOLEAN"},
                    "answer": {"type": "STRING"},
                    "reason": {"type": "STRING"}
                },
                "required": ["can_answer", "answer", "reason"]
            }
        )
    )
    return json.loads(response.text)
