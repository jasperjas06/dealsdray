/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, createBrowserRouter } from 'react-router-dom'
import SignIn from '../pages/Auth/SignIn'
import SingUp from '../pages/Auth/SingUp'
import Home from '../pages/Dashboard/Home'
import EmployeePage from '../pages/Dashboard/EmployeePage'
import CreateEmployee from '../pages/Dashboard/CreateEmployee'
import App from '../App'


const routes = () => {
  // const [loading, setLoading] = React.useState([]);
  let data =[]
  const router1 = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      
    },
    {
      path: '/signin',
      element: <SignIn />
    
    },
    {
      path: '/home-page',
      element: <Home />
    },
    {
      path: '/employeelist-page',
      element: <EmployeePage />
    },
    {
      path: '/create/employee',
      element: <CreateEmployee />
    }
])
const router2 = createBrowserRouter([
  {
    path: '*',
    element: <SignIn/>
    
  },
  
])

let token = localStorage.getItem("token")
  useEffect(()=>{
    // setLoading(localStorage.getItem("token"))
    if(token){
      return data.push(router1)
    }
    else{
      return data.push(router2)
    }
  
  },[token])

  return data
}

export default routes
