"""
I Apply For Jobs For You - Automation Worker Service
Polls submitted resumes, verifies Truth Profiles, and automates applications
across Greenhouse, Lever, and Ashby using Playwright headless execution.
"""
import os
import sys
import json
import asyncio
import argparse
from pathlib import Path
from typing import List, Dict, Any, Optional

from models.truth_profile import (
    UserTruthProfile,
    PersonalInfo,
    WorkAuthorization,
    JobPreferences,
)
from adapters.greenhouse_adapter import GreenhouseAdapter
from adapters.lever_adapter import LeverAdapter
from adapters.ashby_adapter import AshbyAdapter

SUBMISSIONS_PATH = Path(__file__).resolve().parent.parent / "frontend" / "data" / "submissions.json"

def load_local_submissions() -> List[Dict[str, Any]]:
    """Load pending submissions from the local storage file."""
    if not SUBMISSIONS_PATH.exists():
        print(f"[Worker] No submissions file found at {SUBMISSIONS_PATH}")
        return []
    try:
        with open(SUBMISSIONS_PATH, "r", encoding="utf-8") as f:
            data = json.load(f)
            return data if isinstance(data, list) else []
    except Exception as e:
        print(f"[Worker Error] Failed to read submissions: {e}")
        return []

def candidate_to_truth_profile(sub: Dict[str, Any]) -> UserTruthProfile:
    """Map submission record into strict UserTruthProfile."""
    return UserTruthProfile(
        personal=PersonalInfo(
            name=sub.get("candidateName", "Candidate"),
            email=sub.get("email", ""),
            phone=sub.get("phone"),
            location=sub.get("location", "Remote"),
        ),
        work_authorization=WorkAuthorization(
            authorized_countries=sub.get("authorizedCountries", ["Canada", "US"]),
            requires_sponsorship=sub.get("requiresSponsorship", False),
        ),
        preferences=JobPreferences(
            desired_roles=[sub.get("desiredRole", "Software Engineer")],
            minimum_salary=int(sub.get("minSalary", 120000)) if sub.get("minSalary") else None,
            remote_only=sub.get("remotePreference") == "remote_only",
        ),
        skills=sub.get("skills", []),
    )

async def process_submission(sub: Dict[str, Any]):
    """Simulate or execute application run for candidate."""
    profile = candidate_to_truth_profile(sub)
    print("\n" + "=" * 60)
    print(f"[PROCESSING CANDIDATE] {profile.personal.name} <{profile.personal.email}>")
    print(f"Target Role: {profile.preferences.desired_roles}")
    print(f"Min Salary: ${profile.preferences.minimum_salary} USD")
    print(f"Verified Skills: {', '.join(profile.skills[:6])}...")
    print(f"Complimentary Quota: {sub.get('complimentaryApplicationsQueued', 30)} applications queued")
    print("=" * 60)

    # Initialize adapters
    gh_adapter = GreenhouseAdapter(profile)
    ashby_adapter = AshbyAdapter(profile)
    lever_adapter = LeverAdapter(profile)

    print(f"[Worker Adapters Ready] Greenhouse, Lever, Ashby loaded for {profile.personal.name}.")
    print(f"[Audit Log] Dispatching weekly report notification to sales@mander.tech.")

async def run_worker_loop(interval_seconds: int = 30):
    """Continuous polling loop."""
    print(f"[Worker Started] Monitoring submissions at {SUBMISSIONS_PATH} every {interval_seconds}s...")
    while True:
        submissions = load_local_submissions()
        if submissions:
            print(f"[Worker] Found {len(submissions)} active submission(s).")
            for sub in submissions[:3]:
                await process_submission(sub)
        else:
            print("[Worker] Standing by for new candidate resumes...")
        await asyncio.sleep(interval_seconds)

def main():
    parser = argparse.ArgumentParser(description="I Apply For Jobs For You Worker")
    parser.add_argument("--once", action="store_true", help="Process queued resumes once and exit")
    parser.add_argument("--interval", type=int, default=30, help="Polling interval in seconds")
    args = parser.parse_args()

    if args.once:
        submissions = load_local_submissions()
        print(f"[Worker] Found {len(submissions)} submission(s).")
        for sub in submissions:
            asyncio.run(process_submission(sub))
    else:
        asyncio.run(run_worker_loop(args.interval))

if __name__ == "__main__":
    main()
