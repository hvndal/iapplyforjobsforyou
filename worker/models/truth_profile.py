"""
Truth Database schema and validation models.
No hallucinating qualifications:
- Known information: safe to use directly
- Inferred information: only when genuinely supported & low-risk
- Unknown: MUST pause and ask user
"""
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class PersonalInfo(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    location: Optional[str] = None
    linkedin_url: Optional[str] = None
    portfolio_url: Optional[str] = None
    github_url: Optional[str] = None

class WorkAuthorization(BaseModel):
    authorized_countries: List[str] = Field(default_factory=lambda: ["Canada", "US"])
    requires_sponsorship: bool = False
    willing_to_relocate: bool = False
    security_clearances: List[str] = Field(default_factory=list)

class WorkExperience(BaseModel):
    company: str
    title: str
    location: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = "Present"
    is_current: bool = False
    highlights: List[str] = Field(default_factory=list)

class Education(BaseModel):
    institution: str
    degree: str
    field_of_study: Optional[str] = None
    graduation_year: Optional[str] = None

class JobPreferences(BaseModel):
    desired_roles: List[str] = Field(default_factory=list)
    target_locations: List[str] = Field(default_factory=list)
    remote_only: bool = True
    minimum_salary: Optional[int] = None
    currency: str = "USD"
    mode: str = "approval_required"  # 'assisted', 'automatic', 'approval_required'

class UserTruthProfile(BaseModel):
    personal: PersonalInfo
    work_authorization: WorkAuthorization
    experience: List[WorkExperience] = Field(default_factory=list)
    education: List[Education] = Field(default_factory=list)
    skills: List[str] = Field(default_factory=list)
    preferences: JobPreferences
    custom_qa_bank: Dict[str, str] = Field(
        default_factory=dict,
        description="Verified answers supplied or approved by the user for standard application questions"
    )
