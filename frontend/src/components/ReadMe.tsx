import React from 'react';

function ReadMe() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        border: 'solid black 2px',
        padding: '10px',
        borderRadius: '5px',
      }}
    >
      <h1> Career-Service-Platform</h1>
      <hr />
      <h2> Objective </h2>
      <p>Develop a Career service platform</p>
      <h2>Description</h2>
      <p>
        This web application connects job seekers and employers by providing
        features such as browsing available job postings, adding and managing
        job postings by employers, allowing candidates to apply and receive
        notifications if selected, and creating and managing student profiles.
        Candidates can search and view job postings based on their skills,
        experience and location and student profile feature helps to match with
        relevant job opportunities.
      </p>
      <a href='https://app.codacy.com?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade'>
        <img
          src='https://app.codacy.com/project/badge/Grade/9bdb8e4eb6c64769ae5b79016e422cb7'
          alt='codacy'
        />
      </a>
      <a href='https://app.codacy.com?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_coverage'>
        <img
          src='https://app.codacy.com/project/badge/Coverage/9bdb8e4eb6c64769ae5b79016e422cb7'
          alt='codacy'
        />
      </a>
      <h2> Members & Roles</h2>
      <hr />
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Role</th>
          </tr>
          <tr>
            <td>
              Gevorg Alaverdyan [
              <a
                href='https://github.com/gevorgalaverdyan'
                style={{ color: 'blue' }}
              >
                gevorgalaverdyan
              </a>
              ]
            </td>
            <td>"Front-end Developer/UI-UX" (Backend-DB)</td>
          </tr>
          <tr>
            <td>
              Khashayar Azad [
              <a href='https://github.com/khashazad' style={{ color: 'blue' }}>
                khashazad
              </a>
              ]
            </td>
            <td>"Developer / Technician Lead"</td>
          </tr>
          <tr>
            <td>
              Mohammed Rahman [
              <a href='https://github.com/Afifr2001' style={{ color: 'blue' }}>
                Afifr2001
              </a>
              ]
            </td>
            <td>"Front-End Developer / Tester"</td>
          </tr>
          <tr>
            <td>
              Amirhossein Tavakkoly [
              <a
                href='https://github.com/amirhossein942'
                style={{ color: 'blue' }}
              >
                amirhossein942
              </a>
              ]
            </td>
            <td>"Backend Developer" / CI-CD (Backend-DB) </td>
          </tr>
          <tr>
            <td>
              Cristian Gasparasc [
              <a
                href='https://github.com/CritixGames'
                style={{ color: 'blue' }}
              >
                CritixGames
              </a>
              ]
            </td>
            <td>"UI-UX/Generalist"</td>
          </tr>
          <tr>
            <td>
              Jay Patel [
              <a href='https://github.com/jp503' style={{ color: 'blue' }}>
                jp503
              </a>
              ]
            </td>
            <td>"Full-Stack Developer"</td>
          </tr>
        </tbody>
      </table>
      <h2>Project Approach & Technology</h2>
      <p>MERN stack application.</p>
      <ul>
        <li>MongoDB: NoSQL database</li>
        <li>Express JS: Express framework</li>
        <li>React JS: Front End user app</li>
        <li>Node JS: Server environment</li>
      </ul>

      <img
        src='https://user-images.githubusercontent.com/57418717/215917734-83329c68-26b2-46ed-9bc7-34bff88de361.png'
        alt='MERN stack'
      />
    </div>
  );
}

export default ReadMe;
