import axios from 'axios';

const API_URL = '';

//create a job
const createJob = async (jobData: any) => {
  //const res = await axios.post(jobData)
};

const getJobs = async (/*TOKEN?*/) => {
  //const res = await axios.get(API_URL);

  const jobs = [
    {
      title: 'test',
      company: 'test',
      description: 'Great Job, please apply!',
      deadline: '2023-04-09',
      jobId: '2',
    },
    {
      title: 'test1',
      company: 'test1',
      description: 'Great J!',
      deadline: '2023-04-01',
      jobId: '3',
    },
  ];

  return jobs;
  
};

const jobsService = {
  createJob,
  getJobs,
};

export default jobsService;
