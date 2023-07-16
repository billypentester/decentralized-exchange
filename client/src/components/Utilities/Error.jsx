import React from 'react'
import error from './../../images/404.png'
import {Link} from 'react-router-dom'

function Error() {
  return (
    <div className="bg-light">
        <div className="container d-flex justify-content-around align-items-center p-5" style={{ height:'100vh' }}>
            <div className="col-5 py-5">
            <h1 className="text-dark my-4">Opps! Why you're here?</h1>
            <p className="text-dark my-4">
                We are very sorry for inconvenience. It seems that you are trying to access a page that doesn't exist. Please go back to home page.
            </p>
            <Link to="/">
                <button className="btn btn-primary btn-lg w-50">Back To Home</button>
            </Link>
            </div>
            <div className="col-6">
                <img src={error} className="img-fluid" alt="error page" />
            </div>
        </div>
    </div>
  )
}

export default Error
