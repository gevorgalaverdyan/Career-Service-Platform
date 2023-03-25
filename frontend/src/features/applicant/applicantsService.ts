import axios from 'axios';
import { Student } from '../../common/types';

const API_URL = '/application/';

//gets the applicants
const getApplicantsByJobId = async (jobId: any) => {
  const res = await axios.get(`${API_URL}job/${jobId}`);
  const data = res.data;

  let students: Array<Student> = [];

  for (const application of data) {
    const { userId, status, applicationId } = application;
    const student = await axios.get(`/user-info/${userId}`);
    const studentInfo = student.data;
    studentInfo.status = status;
    studentInfo.applicationId = applicationId;
    students = [...students, studentInfo];
  }

  return students;
};

const applicantService = {
  getApplicantsByJobId,
};
export default applicantService;
