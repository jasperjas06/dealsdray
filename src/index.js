import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SignIn from './pages/Auth/SignIn';
import EmployeePage from './pages/Dashboard/EmployeePage';
import CreateEmployee from './pages/Dashboard/CreateEmployee';
import Home from './pages/Dashboard/Home';
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import {routes} from "./navigation/publicRoute"
let token = localStorage.getItem("token")
let routes =[]
const router = createBrowserRouter( token?[
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
]:[
  {
    path: '*',
    element: <SignIn/>
    
  }
  
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
