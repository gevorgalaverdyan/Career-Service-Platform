import React from 'react';
import { FaFilePdf } from 'react-icons/fa';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { Applicant } from '../common/types';
import { db } from '../firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import axios from 'axios';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

function JobApplicantItem(applicant: Applicant) {
  const { name, status, userId, applicationId } = applicant;
  const storage = getStorage();
  const starsRef = ref(storage, 'files/68_CV.pdf');

  const onClick = async (e: any) => {
    e.preventDefault();

    // const docRef = doc(db, 'files', `68_CV`);
    // const docSnap = await getDoc(docRef);

    getDownloadURL(starsRef)
      .then((url) => {
        window.location.href = url;
      })
      .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            break;
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
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
          <FaFilePdf size={30} />
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
