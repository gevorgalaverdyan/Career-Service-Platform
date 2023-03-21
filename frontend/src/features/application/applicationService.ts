import axios from 'axios';

const API_URL = '/application/';

//add
const createApplication = async (applicationIDs: any) => {
  const res = await axios.post(API_URL, applicationIDs);
  return res.data;
};

//getAppilicationById :id params
const getJobApplication = async () => {};

//getAppilicationForUser(userId) : localStorage

const applicationService = {
  createApplication,
  getJobApplication,
};
export default applicationService;
