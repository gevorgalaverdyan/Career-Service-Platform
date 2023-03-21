import axios from 'axios';
import React from 'react';
import { GrStatusGoodSmall } from 'react-icons/gr';
import { MdWork } from 'react-icons/md';
import { useSelector } from 'react-redux';

function UserApplications() {
  
  return (
    <>
      <h1
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <MdWork />
        My Applications
      </h1>
      <div className='tickets'>
        <div className='ticket-headings'>
          <div>Job Title</div>
          <div>Company</div>
          <div>Deadline</div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            Status
            <GrStatusGoodSmall style={{ color: 'green', marginLeft: '5px' }} />
          </div>
        </div>
        {/* MAP */}
      </div>

      <button onClick={async(e:any)=>{
        e.preventDefault();
        const res = await axios.get('application/user/42');
        const applications = res.data;
        applications.map(async (application:any)=>{
          const { applicationId, jobId, userId, status } = application;
          const job = await axios.get(`/job/${jobId}`)
          const jobInfo = job.data;
          console.log(jobInfo);
        })
        
      }}>get</button>
    </>
  );
}

export default UserApplications;
