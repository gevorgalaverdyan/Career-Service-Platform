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

    // const docRef = doc(db, 'files', `68_CV`);
    // const docSnap = await getDoc(docRef);

    getDownloadURL(starsRef)
      .then((url) => {
        window.location.href = url;
      })
      .catch((error) => {
        switch (error.code) {
          case 'storage/object-not-found':
            break;
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;

          case 'storage/unknown':
            break;
        }
      });
    // if (docSnap.exists()) {
    //   window.location.href = docSnap.data().resume;
    // } else {
    //   toast.error('No such PDF');
    // }
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
