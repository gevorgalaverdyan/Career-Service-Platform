import axios from 'axios';

const API_URL = '/resume';

//create a job
const getResume = async (studentId: String) => {
  const res = await axios.get(`${API_URL}/${studentId}`);

  return res.data;
};

const uploadResume = async (studentId: String, payload: any) => {
  const res = await axios.post(`${API_URL}/upload/${studentId}`, payload, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });

  return res.data;
};

const resumeService = {
  getResume,
  uploadResume,
};

export default resumeService;
