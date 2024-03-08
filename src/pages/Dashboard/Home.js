import React, { useEffect } from 'react'
import TopNavBar from '../../navigation/navBar'
import { jwtDecode } from 'jwt-decode';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
const Home = () => {
  let token = localStorage.getItem("token")
  const [data, setData] = React.useState()
  let decode = jwtDecode(token)
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
      <TopNavBar />
      <div>
      <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage src={data?.image}
                    alt="Avatar" className="my-5" style={{ width: '80px', borderRadius:"50%" }} fluid />
                  <MDBTypography tag="h5">Marie Horwitz</MDBTypography>
                  <MDBCardText>Web Designer</MDBCardText>
                  <MDBIcon far icon="edit mb-5" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Name</MDBTypography>
                        <MDBCardText className="text-muted">{data?.name}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">{data?.mobile}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">{data?.email}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="4" className="mb-3">
                        <MDBTypography tag="h6">Gender</MDBTypography>
                        <MDBCardText className="text-muted">{data?.gender}</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <MDBTypography tag="h6">Work</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Designation</MDBTypography>
                        <MDBCardText className="text-muted">{data?.designation}</MDBCardText>
                      </MDBCol>
                      
                    </MDBRow>

                    <div className="d-flex justify-content-start">
                      <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                      <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                      <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      
      </MDBContainer>
    </section>
      </div>
    </div>
  )
}

export default Home
