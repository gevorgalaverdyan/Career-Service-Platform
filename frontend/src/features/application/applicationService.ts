import axios from 'axios';
import { AppliedJob } from '../../common/types';

const API_URL = '/application/';

//add
const createApplication = async (applicationIDs: any) => {
  const res = await axios.post(API_URL, applicationIDs);
  return res.data;
};

let appliedJobs: Array<AppliedJob> = [];
//getAppilicationForUser
const getAppilicationForUser = async (userId: any) => {
  appliedJobs.splice(0, appliedJobs.length)
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

//getJobApplicationByID() :id

const applicationService = {
  createApplication,
  getAppilicationForUser,
};
export default applicationService;
