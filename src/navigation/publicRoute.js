import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from '../pages/Auth/SignIn'
import SingUp from '../pages/Auth/SingUp'
import Home from '../pages/Dashboard/Home'
import EmployeePage from '../pages/Dashboard/EmployeePage'
import CreateEmployee from '../pages/Dashboard/CreateEmployee'
import App from '../App'

const PublicRoute = () => {
  return (
    
        <Routes>
        {/* <Route path="*" element={<SignIn to="/auth/signin" replace />} /> */}
        <Route path="/" element={<App />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/home-page" element={<Home />} />
        <Route path="/employeelist-page" element={<EmployeePage />} />
        <Route path="/create/employee" element={<CreateEmployee />} />
        </Routes>

  )
}

export default PublicRoute
