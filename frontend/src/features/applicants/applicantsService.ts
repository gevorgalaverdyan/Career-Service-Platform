import axios from 'axios';

const API_URL = '/application/';

//gets the applicants
const getApplicantsByJobId = async (jobId:any) => {
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

  console.log("student: "+students);
  return students;
};

const applicantService = {
  getApplicantsByJobId,
};
export default applicantService;
