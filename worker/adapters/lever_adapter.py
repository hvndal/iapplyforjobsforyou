"""
Lever ATS Automation Adapter
Handles Lever job application pages (https://jobs.lever.co/...)
"""
from typing import Any
from playwright.async_api import Page
from adapters.base_adapter import BaseJobAdapter, JobDetails, ApplicationResult

class LeverAdapter(BaseJobAdapter):
    async def extract_job_details(self, url: str) -> JobDetails:
        return JobDetails(
            platform="Lever",
            company="Target Company",
            role_title="Software Engineer",
            location="Remote",
            is_remote=True,
            url=url,
            description="Lever job opening description...",
            questions=["Full Name", "Email", "Phone", "Resume/CV"]
        )

    async def fill_application(self, page: Page, job: JobDetails) -> ApplicationResult:
        try:
            p = self.truth_profile.personal
            # Standard Lever form input selectors
            await page.fill("input[name='name']", p.name)
            await page.fill("input[name='email']", p.email)
            if p.phone:
                await page.fill("input[name='phone']", p.phone)
            if p.linkedin_url:
                await page.fill("input[name*='urls[LinkedIn]' i]", p.linkedin_url)
            if p.github_url:
                await page.fill("input[name*='urls[GitHub]' i]", p.github_url)

            return ApplicationResult(
                success=True,
                status="ready_to_submit",
                message="Filled standard Lever fields.",
                job_url=job.url
            )
        except Exception as e:
            return ApplicationResult(
                success=False,
                status="paused_needs_input",
                message=f"I couldn't finish filling this Lever form: {str(e)}",
                job_url=job.url
            )

    async def submit_application(self, page: Page) -> ApplicationResult:
        try:
            # Lever submit application button
            await page.click("#btn-submit")
            return ApplicationResult(
                success=True,
                status="submitted",
                message="Application successfully submitted to Lever.",
                job_url=page.url
            )
        except Exception as e:
            return ApplicationResult(
                success=False,
                status="failed",
                message=f"I couldn't submit this one: {str(e)}",
                job_url=page.url
            )
