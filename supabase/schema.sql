-- I APPLY FOR JOBS FOR YOU - Database Schema
-- Supabase / PostgreSQL schema with Row Level Security (RLS)

-- 1. PROFILES & VERIFIED TRUTH FACTS
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    location TEXT,
    linkedin_url TEXT,
    portfolio_url TEXT,
    github_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. VERIFIED FACTS (The non-hallucination source of truth)
CREATE TABLE IF NOT EXISTS public.verified_facts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    category TEXT NOT NULL, -- 'work_auth', 'experience', 'education', 'skills', 'custom_qa'
    fact_key TEXT NOT NULL,  -- e.g. 'authorized_canada', 'years_experience', 'requires_sponsorship'
    fact_value JSONB NOT NULL,
    is_user_verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, category, fact_key)
);

-- 3. JOB PREFERENCES & AUTOMATION MODES
CREATE TABLE IF NOT EXISTS public.job_preferences (
    user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    desired_roles TEXT[] NOT NULL DEFAULT '{}',
    target_locations TEXT[] NOT NULL DEFAULT '{}',
    remote_only BOOLEAN DEFAULT TRUE,
    minimum_salary INTEGER,
    currency TEXT DEFAULT 'USD',
    application_mode TEXT DEFAULT 'approval_required', -- 'approval_required', 'assisted', 'automatic'
    max_applications_per_day INTEGER DEFAULT 10,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. JOBS DISCOVERED
CREATE TABLE IF NOT EXISTS public.jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_platform TEXT NOT NULL, -- 'greenhouse', 'lever', 'ashby'
    company_name TEXT NOT NULL,
    role_title TEXT NOT NULL,
    location TEXT,
    is_remote BOOLEAN DEFAULT FALSE,
    external_url TEXT NOT NULL UNIQUE,
    salary_range TEXT,
    description_text TEXT,
    parsed_requirements JSONB DEFAULT '{}',
    discovered_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. SHIT I'VE APPLIED TO (Applications tracking)
CREATE TYPE application_status AS ENUM (
    'discovered',
    'preparing',
    'i_got_stuck', -- Needs user answer to proceed without hallucinating
    'ready_for_review',
    'applied',
    'i_couldnt_submit', -- Blocked by CAPTCHA / bot detection
    'they_rejected_you',
    'they_ghosted_you',
    'you_got_an_interview'
);

CREATE TABLE IF NOT EXISTS public.applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
    status application_status DEFAULT 'discovered',
    stuck_question TEXT, -- If status = 'i_got_stuck', what did the company ask?
    stuck_reason TEXT,
    user_provided_answer TEXT,
    submission_notes TEXT,
    applied_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. COMMUNITY CONTRIBUTIONS / "HELP ME BUILD THIS"
CREATE TABLE IF NOT EXISTS public.contributions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contributor_name TEXT NOT NULL,
    contributor_handle TEXT,
    type TEXT NOT NULL, -- 'adapter', 'bug_report', 'prompt_tweak', 'job_board'
    description TEXT NOT NULL,
    pull_request_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verified_facts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view and edit own profile"
    ON public.profiles FOR ALL
    USING (auth.uid() = id);

CREATE POLICY "Users can manage own verified facts"
    ON public.verified_facts FOR ALL
    USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own job preferences"
    ON public.job_preferences FOR ALL
    USING (auth.uid() = user_id);

CREATE POLICY "Users can view own applications"
    ON public.applications FOR ALL
    USING (auth.uid() = user_id);
