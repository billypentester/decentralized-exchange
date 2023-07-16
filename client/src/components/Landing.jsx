import React, {useEffect} from 'react'
import gif from './../images/landingPage.png'
import {Link} from 'react-router-dom'
import Seo from './Utilities/Seo'

function Landing() {

  useEffect(() => {
    Seo({
      title: "Decentralized Exchange",
      description: "Decentralized Exchange",
    })
  }, []);

  return (
    <div className="bg-primary">
      <div className="container-lg container-fluid d-flex justify-content-around align-items-center p-5" style={{ height:'100vh' }}>
        <div className="col-10 col-md-5 py-5">
          <h1 className="text-white my-4 display-6">Welcome to the Decentralized Exchange</h1>
          <p className="text-white my-4 lead">
          Decentralized exchange is a platform for buying and selling digital assets without the need for a central authority. It also adheres to Islamic financial teachings, such as prohibition of riba (usury or interest) while taking flash loans.</p>
          <Link to="/swap" style = {{ textDecoration: 'none' }}>
            <div className='d-flex justify-content-center'>
              <button className="btn btn-light w-75">Get Started</button>
            </div>
          </Link>
        </div>
        <div className="col-6 d-none d-md-block">
          <img src={gif} className="img-fluid" alt="landing page" />
        </div>
      </div>
    </div>
  )
}

export default Landing