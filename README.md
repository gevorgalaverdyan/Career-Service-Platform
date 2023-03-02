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
        <td>Mohammed Rahman [<a href="https://github.com/Afifr2001">Afifr2001</a>]</td>
        <td>"Front-End Developer / Tester"</td>
    </tr>
    <tr>
        <td>Amirhossein Tavakkoly [<a href="https://github.com/amirhossein942">amirhossein942</a>]</td>
        <td>"Backend Developer" / CI-CD (Backend-DB) </td>
    </tr>
    <tr>
        <td>Cristian Gasparasc [<a href="https://github.com/CritixGames">CritixGames</a>]</td></td>
        <td>"UI-UX/Generalist"</td>
    </tr>
    <tr>
        <td>Jay Patel [<a href="https://github.com/jp503">jp503</a>] </td>
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

![MERN stack](https://user-images.githubusercontent.com/57418717/215917734-83329c68-26b2-46ed-9bc7-34bff88de361.png)

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

TODO: 
- in DB add company for recruiter -> backend guys
- edit profile should also have this feature
- same for user profile
- recruiters shouldn't upload CV...