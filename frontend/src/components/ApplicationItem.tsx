import React from 'react';
import { Application } from '../common/types';

function ApplicationItem(props: Application) {
  const { title, deadline, company, status } = props;
  return (
    <div className='ticket'>
      <div>{title}</div>
      <div>{company}</div>
      <div>{deadline}</div>
      <div>{status}</div>
    </div>
  );
}

export default ApplicationItem;
