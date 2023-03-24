import axios from 'axios';
import { AppliedJob } from '../../common/types';

const API_URL = '/application/';

//add application
const createApplication = async (applicationIDs: any) => {
  const res = await axios.post(API_URL, applicationIDs);
  return res.data;
};

//array of applied jobs
let appliedJobs: Array<AppliedJob> = [];
//getAppilicationForUser
const getApplicationForUser = async (userId: any) => {
  appliedJobs.splice(0, appliedJobs.length);
  const res = await axios.get(`${API_URL}user/${userId}`);
  const applications = res.data;

  applications.map(async (application: any) => {
    const { jobId, status } = application;
    const job = await axios.get(`/job/${jobId}`);
    const jobInfo = job.data;
    jobInfo.status = status;

    appliedJobs = [...appliedJobs, jobInfo];
  });

  return appliedJobs;
};

//gets the applicants
const getApplicantsByJobId = async (jobId: Number) => {
  const res = await axios.get(`${API_URL}job/${jobId}`);
  const data = res.data;

  let applicantsID: any = [];
  applicantsID.splice(0, applicantsID.length);
  data.map((application: any) => {
    const { userId } = application;
    applicantsID = [...applicantsID, userId];
  });

  let students: any = [];
  students.splice(0, students.length);

  applicantsID.map(async (id: any) => {
    const student = await axios.get(`/user-info/${id}`);
    students = [...students, student];
  });

  return students;
};

const applicationService = {
  createApplication,
  getApplicationForUser,
  getApplicantsByJobId,
};
export default applicationService;
