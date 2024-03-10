/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button } from '@mui/material'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// Initialization for ES Users
// import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";

// initMDB({ Dropdown, Collapse });
const TopNavBar = () => {
  const [data,setData]= useState()
  const navigate= useNavigate()
  let token = localStorage.getItem("token")
  let decode = jwtDecode(token)
  // console.log(decode);
  const logout=()=>{
    localStorage.clear("token")
    navigate("/")
  }
  const getUser = async()=>{
    await axios.get(`http://localhost:2000/api/get/user?id=${decode.id}`)
    .then((response)=>{
      console.log(response.data);
      setData(response.data)
    }
    )
    .catch((error)=>{
      console.log(error.message);
    })  
  }
  useEffect(()=>{
    getUser()
  },[])
  
  return (
    <div>

<nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">

  <div className="container-fluid">

    <button
      data-mdb-collapse-init
      className="navbar-toggler"
      type="button"
      data-mdb-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i className="fas fa-bars"></i>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link" href="/home-page">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/employeelist-page">Employee List</a>
        </li>
        {/* <li className="nav-item">
          <a className="nav-link" href="#">Projects</a>
        </li> */}
      </ul>
    </div>
    <div className="d-flex align-items-center">

      {/* <a className="text-reset me-3" href="#">
        <i className="fas fa-shopping-cart"></i>
      </a> */}

      
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        
        <li className="nav-item">
          <a className="nav-link" href="#">- {data?.name}</a>
        </li>
      </ul>
        <a
          
        >
          {/* <img
            src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
            className="rounded-circle"
            height="25"
            alt="Black and White Portrait of a Man"
            loading="lazy"
          /> */}
        </a>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <Button onClick={logout}>
        LogOut
        </Button>
        {/* <li className="nav-item">
          <a className="nav-link" href="#">Projects</a>
        </li> */}
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}

export default TopNavBar
