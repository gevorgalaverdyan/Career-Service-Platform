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
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  company?: string;
  resume?: string;
}

export interface Job {
  title: string;
  description: string;
  company: string;
  deadline: string;
}

export interface Application {
  company: string;
  deadline: string;
  title: string;
  status: string;
}

export interface AppliedJob {
  company: string;
  deadline: string;
  description: string;
  jobId: number | string;
  status: string;
  title: string;
}

export interface Applicant {
  jobTitle: string;
  deadline: string;
  resume?: any;
  status: APPLICATION_STATUS;
}

export enum APPLICATION_STATUS {
  PENDING,
  HIRED,
  DECLINED,
}
