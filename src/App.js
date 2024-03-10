import './App.css';

import React from 'react';
import SignIn from './pages/Auth/SignIn';
import Index from './pages/Dashboard/Index';

function App() {
  const [token,setToken]= React.useState("");
  React.useEffect(()=>{
    setToken(localStorage.getItem("token"))
  },[token])
  return (
    <div>
    {
      !token ? <SignIn/> : <Index />
    }
    </div>
  );
}

export default App;
