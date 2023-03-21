import React from 'react';
import { GrStatusGoodSmall } from 'react-icons/gr';
import { MdWork } from 'react-icons/md';
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
    </>
  );
}

export default UserApplications;
