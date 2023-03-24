import React from 'react';
import './styles/notFound.css';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <section className='page_404'>
        <div className='box'>
          <div className='row'>
            <div className='col-sm-12 '>
              <div className='col-sm-10 col-sm-offset-1 text-center'>
                <div className='four_zero_four_bg'>
                  <h1 className='text-container'>404</h1>
                </div>

                <div className='contant_box_404'>
                  <h3 className='h2'>Look like you're lost</h3>
                  <p>The page that you are looking for is not avaible!</p>
                  <Link to={'/'} className='link_404'>
                    Go to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default NotFound;
