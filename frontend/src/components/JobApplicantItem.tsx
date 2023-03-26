import React from 'react';
import { FaFilePdf } from 'react-icons/fa';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { Applicant } from '../common/types';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase.config';

function JobApplicantItem(applicant: Applicant) {
  const { name, status, userId, applicationId } = applicant;

  const starsRef = ref(storage, `files/${userId}_CV.pdf`);

  const onClick = async (e: any) => {
    e.preventDefault();

    getDownloadURL(starsRef)
      .then((url) => {
        window.location.href = url;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='ticket'>
      <div>{name}</div>
      <div>{status}</div>
      <div>
        <a onClick={onClick}>
          <FaFilePdf size={30} style={{ cursor: 'pointer' }} />
        </a>
      </div>
      <div>
        <IoCheckmarkCircle
          color='green'
          size={35}
          onClick={async () => {
            const res = await axios.put(`/application/${applicationId}`, {
              status: 'HIRED',
            });
            window.location.reload();
            console.log(res.data);
          }}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </div>
  );
}

export default JobApplicantItem;
