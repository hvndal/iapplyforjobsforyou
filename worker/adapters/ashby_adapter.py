"""
Ashby ATS Automation Adapter
Handles Ashby job application pages (https://jobs.ashbyhq.com/...)
"""
from typing import Any
from playwright.async_api import Page
from adapters.base_adapter import BaseJobAdapter, JobDetails, ApplicationResult

class AshbyAdapter(BaseJobAdapter):
    async def extract_job_details(self, url: str) -> JobDetails:
        return JobDetails(
            platform="Ashby",
            company="Target Company",
            role_title="Software Engineer",
            location="Remote",
            is_remote=True,
            url=url,
            description="Ashby job opening description...",
            questions=["Name", "Email", "Resume", "Location"]
        )

    async def fill_application(self, page: Page, job: JobDetails) -> ApplicationResult:
        try:
            p = self.truth_profile.personal
            # Ashby inputs typically use standard name attributes or aria-labels
            await page.fill("input[name='name']", p.name)
            await page.fill("input[name='email']", p.email)
            if p.phone:
                await page.fill("input[name='phoneNumber']", p.phone)

            return ApplicationResult(
                success=True,
                status="ready_to_submit",
                message="Filled standard Ashby fields.",
                job_url=job.url
            )
        except Exception as e:
            return ApplicationResult(
                success=False,
                status="paused_needs_input",
                message=f"I couldn't finish filling this Ashby form: {str(e)}",
                job_url=job.url
            )

    async def submit_application(self, page: Page) -> ApplicationResult:
        try:
            # Ashby submit button
            await page.click("button[type='submit']")
            return ApplicationResult(
                success=True,
                status="submitted",
                message="Application successfully submitted to Ashby.",
                job_url=page.url
            )
        except Exception as e:
            return ApplicationResult(
                success=False,
                status="failed",
                message=f"I couldn't submit this one: {str(e)}",
                job_url=page.url
            )
