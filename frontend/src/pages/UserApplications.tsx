import React from 'react';
import { GrStatusGoodSmall } from 'react-icons/gr';

function UserApplications() {
  return (
    <>
      <h1>My Applications</h1>
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
