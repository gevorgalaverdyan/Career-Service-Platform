# Career-Service-Platform

<hr>

## Objective 
<p>
    Develop a Career service platform

</p>

## Description
<p>
    This web application connects job seekers and employers by providing       features such as browsing available job postings, adding and managing job postings by employers, allowing candidates to apply and receive notifications if selected, and creating and managing student profiles. Candidates can search and view job postings based on their skills, experience and location and student profile feature helps to match with relevant job opportunities.

</p>

## Members & Roles

<hr>

<table>
    <tr>
        <th>Name</th>
        <th>Role</th>
    </tr>   
    <tr>
        <td>Gevorg Alaverdyan [<a href="https://github.com/gevorgalaverdyan">gevorgalaverdyan</a>]</td>
        <td>"Front-end Developer/UI-UX" (Backend-DB)</td>
    </tr>
    <tr>
        <td>Khashayar Azad [<a href="https://github.com/khashazad">khashazad</a>]</td>
        <td>"Developer / Technician Lead"</td>
    </tr>
    <tr>
        <td>Mohammed [<a href="https://github.com/Afifr2001">Afifr2001</a>]</td>
        <td>"Front-End Developer / Tester"</td>
    </tr>
    <tr>
        <td>Amir</td>
        <td>"Backend Developer" / CI-CD (Backend-DB) </td>
    </tr>
    <tr>
        <td>Cristian</td>
        <td>"UI-UX/Generalist"</td>
    </tr>
    <tr>
        <td>Jay</td>
        <td>"Full-Stack Developer"</td>
    </tr>
</table>

## Project Approach & Technology 
<p>
    MERN stack application.
    <ul>
        <li>MongoDB: NoSQL database</li>
        <li>Express JS: Express framework</li>
        <li>React JS: Front End user app</li>
        <li>Node JS: Server environment</li>
    </ul>
</p>

<br><br>
<br><br>

<hr>

## NOTE
- For ENV variables add your own and <b>DON'T PUSH IN THE REPO</b>
- Create your own working branch from master
- We can create a testing branch to not mess up master (most likely "dev")
<br><br>

### package.json explanation

These are the scripts for running frontend/backend

<pre><ul><li>"build": "tsc" → builds ts - js</li>
<li>"start": "node backend/server.ts" → starts the server(backend)</li>
<li>"server": "nodemon backend/server.ts" → starts the server(backend) but nodemon restarts your node application when it detects any changes </li>
<li>"client": "npm start --prefix frontend" → starts frontend</li>
<li>"dev": "concurrently \"npm run server\" \"npm run client\"" → starts frontend & backend</li></ul></pre>
