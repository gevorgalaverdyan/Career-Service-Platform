/**
 * @remarks
 * Postings list will contain posting with the following fields
 */
export interface Posting {
  job: {
    jobId: number;
    title: string;
    deadline: string;
    company: string;
  };
}
export interface UserProfile {
  role: 'recruiter' | 'student';
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  companyName?: string;
  jobTitle?: string;
  coverLetter?: string;
  transcript?: string;
  cv?: string;
}

export interface Job {
  title: string;
  description: string;
  company: string;
  deadline: string;
}

export interface Application {
  application: {
    company: string;
    deadline: string;
    title: string;
    status: string;
  };
}
