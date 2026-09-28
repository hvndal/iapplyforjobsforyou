"""
Greenhouse ATS Automation Adapter
Handles standard Greenhouse job application boards.
"""
from typing import Any
from playwright.async_api import Page
from adapters.base_adapter import BaseJobAdapter, JobDetails, ApplicationResult

class GreenhouseAdapter(BaseJobAdapter):
    async def extract_job_details(self, url: str) -> JobDetails:
        # Example extraction logic for Greenhouse board
        return JobDetails(
            platform="Greenhouse",
            company="Target Company",
            role_title="Software Engineer",
            location="Remote",
            is_remote=True,
            url=url,
            description="Extracted Greenhouse job description...",
            questions=["First Name", "Last Name", "Email", "Phone", "Resume"]
        )

    async def fill_application(self, page: Page, job: JobDetails) -> ApplicationResult:
        """
        Fills the standard Greenhouse application form.
        """
        try:
            # Map known profile fields safely
            p = self.truth_profile.personal
            names = p.name.split(" ", 1)
            first_name = names[0]
            last_name = names[1] if len(names) > 1 else ""

            # Standard Greenhouse form field IDs
            await page.fill("#first_name", first_name)
            await page.fill("#last_name", last_name)
            await page.fill("#email", p.email)
            if p.phone:
                await page.fill("#phone", p.phone)
            if p.linkedin_url:
                await page.fill("input[name*='linkedin' i]", p.linkedin_url)

            return ApplicationResult(
                success=True,
                status="ready_to_submit",
                message="Filled all standard Greenhouse fields.",
                job_url=job.url
            )
        except Exception as e:
            return ApplicationResult(
                success=False,
                status="paused_needs_input",
                message=f"I couldn't finish filling this Greenhouse form: {str(e)}",
                job_url=job.url
            )

    async def submit_application(self, page: Page) -> ApplicationResult:
        try:
            # Click submit button on Greenhouse
            await page.click("#submit_app")
            return ApplicationResult(
                success=True,
                status="submitted",
                message="Application successfully submitted to Greenhouse.",
                job_url=page.url
            )
        except Exception as e:
            return ApplicationResult(
                success=False,
                status="failed",
                message=f"I couldn't submit this one: {str(e)}",
                job_url=page.url
            )
