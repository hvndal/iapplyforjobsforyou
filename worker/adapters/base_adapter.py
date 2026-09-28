"""
Modular Job Application Adapter Base Class
"""
from abc import ABC, abstractmethod
from typing import Dict, Any, Optional
from pydantic import BaseModel
from models.truth_profile import UserTruthProfile

class JobDetails(BaseModel):
    platform: str
    company: str
    role_title: str
    location: str
    is_remote: bool = False
    url: str
    description: str
    salary_range: Optional[str] = None
    questions: list[str] = []

class ApplicationResult(BaseModel):
    success: bool
    status: str  # 'submitted', 'paused_needs_input', 'failed'
    message: str
    missing_info_field: Optional[str] = None
    question_for_user: Optional[str] = None
    job_url: str

class BaseJobAdapter(ABC):
    def __init__(self, truth_profile: UserTruthProfile):
        self.truth_profile = truth_profile

    @abstractmethod
    async def extract_job_details(self, url: str) -> JobDetails:
        """Inspect and parse job description and application form fields."""
        pass

    @abstractmethod
    async def fill_application(self, page: Any, job: JobDetails) -> ApplicationResult:
        """Fill out application fields without hallucinating unknown facts."""
        pass

    @abstractmethod
    async def submit_application(self, page: Any) -> ApplicationResult:
        """Execute submission or pause for user approval."""
        pass
