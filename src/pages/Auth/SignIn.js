/* eslint-disable no-unused-vars */
import React from 'react'
import {
    MDBBtn,
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBInput,
    MDBIcon,
    MDBCheckbox
  }
  from 'mdb-react-ui-kit';
import { Container } from '@mui/material';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import {  useNavigate, useNavigation } from 'react-router-dom';
const SignIn = () => {
  const navigate = useNavigate()
    const [data, setData] = React.useState({})
    const handleSubmit = async(e) => {
        e.preventDefault()
        // console.log(data,"data")
        try {

            if(data){
                await axios.post(`http://localhost:2000/api/login`,data)
                .then((response)=>{
                    // console.log(response.data);
                    toast.success(response.data.message)
                    localStorage.setItem("token",response.data?.token)
                    navigate("home-page")
                })
                .catch((error)=>{
                    console.log(error.message);
                })
            }
        } catch (error) {
            
        }
    }
    
  return (
    <div>
    <Container sx={{marginTop:"140px"}}>
    <Container>

    
    <MDBContainer fluid className="p-3 my-5 h-custom">

<MDBRow>

  <MDBCol col='10' md='6'>
    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample_image" />
  </MDBCol>

  <MDBCol col='4' md='6'>

    <div className="d-flex flex-row align-items-center justify-content-center">

      <h1 >Sign in </h1>

    </div>

    <div className="divider d-flex align-items-center my-4">
      <p className="text-center fw-bold mx-3 mb-0"></p>
    </div>

    <MDBInput wrapperClass='mb-4' label='Email address' id='email'  type='email' size="lg" onChange={(e)=>setData({...data, email:e.target.value})}/>
    <MDBInput wrapperClass='mb-4' label='Password' id='password' type='password' size="lg" onChange={(e)=>setData({...data, password:e.target.value})}/>

    <div className="d-flex justify-content-between mb-4">
      <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
      <a href="!#">Forgot password?</a>
    </div>

    <div className='text-center text-md-start mt-4 pt-2'>
      <MDBBtn className="mb-0 px-5" size='lg' onClick={handleSubmit}>Login</MDBBtn>
      {/* <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="/auth/signup" className="link-danger">Register</a></p> */}
    </div>

  </MDBCol>

</MDBRow>



</MDBContainer>
</Container>
    </Container>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
    </div>
  )
}

export default SignIn
