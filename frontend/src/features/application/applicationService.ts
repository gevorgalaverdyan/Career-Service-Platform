import axios from 'axios';

const API_URL = '/application/';

//add
const createApplication = async (applicationIDs: any) => {
  const res = await axios.post(API_URL, applicationIDs);
  return res.data;
};

//get :id
const getJobApplication = async () => {};

//delete :id
const removeJobApplication = async () => {};

const applicationService = {
  createApplication,
  getJobApplication,
  removeJobApplication,
};
export default applicationService;
