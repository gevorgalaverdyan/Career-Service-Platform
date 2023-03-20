import axios from 'axios';

const API_URL = '/job/';

//create a job
const createJob = async (jobData: any) => {
  const res = await axios.post(API_URL, jobData);
  
  return res.data;
};

const getJob = async (jobId: String) => {
  const res = await axios.get(API_URL + jobId);

  return res.data;
};

const getJobs = async (/*TOKEN?*/) => {
  const res = await axios.get(API_URL);

  return res.data;
};

const jobsService = {
  createJob,
  getJob,
  getJobs,
};

export default jobsService;
