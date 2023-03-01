import React from 'react'
import './styles/JobPostingStyles.css';

function JobPosting() {
    const isCompany = false;

    function applyf()
    {
        console.log("EY GEVORG");
    }

    return (
        <div>
            <section className='heading'>
                <h3 className='title'>
                    Job Item (title + Company)
                </h3>

            </section>
            

        <table>
          <tbody>

            <tr>
              <td className='boldpart'>Job Description</td>
              <td>Here we will find the job description information for the job(Location, Location type, Salary, duration, etc.)</td>
            </tr>

            <tr>
              <td className='boldpart'>Job Requirements</td>
              <td>Here we will find the job description information for the job(Location, Location type, Salary, duration, etc.)</td>
            </tr>

            <tr>
              <td className='boldpart'>Required Documents</td>
              <td>
                <ol>
                    <li>CV</li>
                    <li>Cover Letter</li>
                    <li>Transcript</li>
                </ol>
              </td>
            </tr>

            <tr>
                <td className='boldpart'>
                    Expiration Date:
                </td>
                <td>
                    10/05/2023
                </td>
            </tr>

          </tbody>
        </table>

        <div className='upload'>
        <label>Resume</label>
            <input type='file' accept='.pdf,.doc,.docx' /><br></br>
            <label>Cover Letter</label>
            <input type='file' accept='.pdf,.doc,.docx' /><br></br>
            <label>Transcript</label>
            <input type='file' accept='.pdf,.doc,.docx' /><br></br>
        </div>



        <button className='button' style={{ float: 'left' }}   onClick={applyf} > Apply</button>

        </div>
    )

}

export default JobPosting