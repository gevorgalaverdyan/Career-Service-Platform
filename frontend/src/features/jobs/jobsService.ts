import axios from 'axios';

const API_URL = '/job/';

//create a job
const createJob = async (jobData: any) => {
  const res = await axios.post(API_URL, jobData);

  return res.data;
};

const getJob = async (jobId: any) => {
  const res = await axios.get(API_URL + jobId);

  return res.data;
};

const getJobs = async () => {
  const res = await axios.get(API_URL);

  return res.data;
};

const updateJob = async (jobData: any, jobId: string) => {
  const response = await axios.put(API_URL + jobId, jobData);

  return response.data;
};

const deleteJob = async (jobId: any) => {
  const res = await axios.delete(API_URL + jobId);

  return res.data;
};

const jobsService = {
  createJob,
  getJob,
  getJobs,
  updateJob,
  deleteJob,
};

export default jobsService;
