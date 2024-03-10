/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Dropdown } from "reactstrap";
import { ColorRing} from 'react-loader-spinner'
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const CreateEmployee = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({
    course:[]
  });
  const [designation, setDesignation] = React.useState([
    { value: "HR", label: "HR" },
    { value: "Manager", label: "Manager" },
    { value: "Developer", label: "Developer" },
    { value: "Sales", label: "Sales" },
    { value: "ManualTesting", label: "ManualTesting" }
  ]);
  const handleImageChange = async({image}) => {
    console.log("image",image);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "ppo86s9k");
    if(image){
        setLoading(true)
        await axios.post('https://api.cloudinary.com/v1_1/dxbes4v75/image/upload', formData)
        .then((res)=>{
            // console.log(res.data, "img");
            toast.success("Image uploaded successfully")
            setData({...data, image:res.data.secure_url})
            setLoading(false)
        })
        .catch((error)=>{
            console.log(error.message);
        })
    }
    else{
        alert("error in parsing image")
    }

  }
  const handleSubmit = async () => {
    try {
        if(!data.name || !data.email || !data.mobile || !data.designation || !data.course || !data.image || !data.gender){
            toast.error("Please fill all the fields")
            return
        }
        if(data.course.length<1){
            toast.error("Please select atleast one course")
            return
        }
        if(data.email){
            let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            let result = re.test(data.email)
            if(!result){
                toast.error("Please enter a valid email")
                return
            }
            
        }
        if(data.mobile){
            let re = /^[0-9]{10}$/;
            let result = re.test(data.mobile)
            if(!result){
                toast.error("Please enter a valid mobile number")
                return
            }
        }
        if(data){
            setLoading(true)
            await axios.post("http://localhost:2000/api/signup",data)
            .then((response) => {
                toast.success(response.data.message)
                navigate(-1)
                setLoading(false)
            })
            .catch((e)=>{
                toast.error(e.message)
                setLoading(false)
            })
        }
    } catch (error) {
        toast.error(error.message)
    }
    
  }
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", margin: "20px" }}>
        <IconButton aria-label="back" onClick={() => navigate(-1)}>
          <ArrowBackIcon sx={{ fontSize: 30 }} />
        </IconButton>
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          sx={{ marginTop: "10px" }}
        >
          CreateEmployee
        </Typography>
      </div>

      <Container>
        <Box sx={{ margin: "20px" }}>
          <Card>
            <Box>
              <Container component="main" maxWidth="xs">
                <Box
                  sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box component="form" noValidate sx={{ mt: 3 }} >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          autoComplete="name"
                          name="name"
                          required
                          fullWidth
                          id="name"
                          label="Name"
                          autoFocus
                          variant="standard"
                          onChange={(e)=>{setData({...data, name:e.target.value})}}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          variant="standard"
                          onChange={(e)=>{setData({...data, email:e.target.value})}}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          name="mobile"
                          label="Mobile no"
                          type="mobile"
                          id="mobile"
                          autoComplete="mobile"
                          variant="standard"
                          onChange={(e)=>{setData({...data, mobile:e.target.value})}}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth variant="standard">
                          <InputLabel>Designation</InputLabel>
                          <Select
                            //   labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={data.designation}
                            label="Designation"
                            
                            //   variant='standard'
                            onChange={(e) =>
                              setData({ ...data, designation: e.target.value })
                            }
                          >
                            {designation.map((item, index) => {
                                return (<MenuItem key={index} value={item.value}>{item.label}</MenuItem>)
                            })}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12}>
                        <FormControl >
                          <FormLabel id="demo-row-radio-buttons-group-label">
                            Gender
                          </FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            onChange={(e)=>{setData({...data, gender:e.target.value})}}
                          >
                            <FormControlLabel
                              value="Female"
                              control={<Radio />}
                              label="Female"
                            />
                            <FormControlLabel
                              value="Male"
                              control={<Radio />}
                              label="Male"
                            />
                            {/* <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormLabel id="demo-row-radio-buttons-group-label">
                            Course
                          </FormLabel>
                        <FormGroup sx={{display:"flex", flexDirection:"row"}} onChange={(e)=>{setData({...data, course:[...data?.course, e.target.value]})}}>
                          <FormControlLabel
                            control={<Checkbox  />}
                            label="MCA"
                            value={"MCA"}
                          />
                          <FormControlLabel
                            control={<Checkbox  />}
                            label="BCA"
                            value={"BCA"}
                          />
                          <FormControlLabel
                            control={<Checkbox  />}
                            label="BSC"
                            value={"BSC"}
                          />
                          
                        </FormGroup>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        {/* <TextField
                          required
                          fullWidth
                          id="image"
                          label="Image "
                          name="image"
                        //   autoComplete="email"
                        //   variant="standard"
                          type="file"
                        //   onChange={(e)=>{setData({...data, email:e.target.value})}}
                        /> */}
                        <input type="file" accept="image/*" onChange={(e)=>{handleImageChange({image:e.target.files[0]})}}/>
                        {loading?<ColorRing height={60} width={60}/>:null}
                      </Grid>
                    </Grid>
                    <Button
                    onClick={handleSubmit}
                    //   type="submit"
                    //   fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      create
                    </Button>
                  </Box>
                </Box>
                {/* <Copyright sx={{ mt: 5 }} /> */}
              </Container>
            </Box>
          </Card>
        </Box>
      </Container>
      <Toaster />
    </div>
  );
};

export default CreateEmployee;
