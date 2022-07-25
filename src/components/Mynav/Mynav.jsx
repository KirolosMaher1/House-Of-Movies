import React from 'react'
import { Link } from 'react-router-dom'

export default function navbar({crrUser, clrUser}) {
  return <>
  <nav className="navbar navbar-expand-lg bg-transparent ">
  <div className="container-fluid">
    <Link className="navbar-brand text-white" to="home">House Of Movies</Link>
    <button className="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="bi bi-justify fw-bolder"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">


    { crrUser?       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item ">
          <Link className="nav-link text-muted" to="home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-muted" to="movies">Movies</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-muted" to="Tvshows">Tv Shows</Link>
        </li>
     
      </ul> : '' }

      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
        <li className="nav-item">
          <i className='pe-2 bi bi-facebook'></i>
          <i className='pe-2 bi bi-instagram'></i>
          <i className='pe-2 bi bi-youtube'></i>
          <i className='pe-2 bi bi-twitter'></i>
        </li>

        {crrUser?   <li className="nav-item">
          <span onClick={clrUser} className="nav-link text-muted logout">Logout</span>
        </li> : <>  <li className="nav-item">
          <Link className="nav-link text-muted" to="register">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-muted" to="login">Login</Link>
        </li> </>}

       
      
      </ul>
    </div>
  </div>
</nav>
  
  </>
}
