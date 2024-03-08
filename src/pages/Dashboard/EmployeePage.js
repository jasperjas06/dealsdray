import {
  Box,
  Button,
  ButtonBase,
  Card,
  CardHeader,
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
  Modal,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import DataTable from "react-data-table-component";
import toast, { Toaster } from "react-hot-toast";
import TopNavBar from "../../navigation/navBar";
import { MDBInput } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { ColorRing } from "react-loader-spinner";
import { jwtDecode } from "jwt-decode";
const EmployeePage = () => {
  const navigate = useNavigate();
  const [empData, setEmpData] = useState([]);
  const [data, setData] = React.useState({});
  const [user,setUser]=React.useState()
  const [open, setOpen] = React.useState(false);
  const [img, setImg] = React.useState(null);
  const [modalData, setModalData] = React.useState({});
  const [designation, setDesignation] = React.useState([
    { value: "HR", label: "HR" },
    { value: "Manager", label: "Manager" },
    { value: "Developer", label: "Developer" },
    { value: "Sales", label: "Sales" },
    { value: "ManualTesting", label: "ManualTesting" },
  ]);
  let token = localStorage.getItem("token")
  let decode = jwtDecode(token)
  const getUser = async()=>{
    await axios.get(`http://localhost:2000/api/get/user?id=${decode.id}`)
    .then((response)=>{
      console.log(response.data);
      setUser(response.data)
    }
    )
    .catch((error)=>{
      console.log(error.message);
    })  
  }
  const handleOpen = ({ item }) => {
    setModalData(item);
    setOpen(true);
  };
  const customStyles = {
    rows: {
      style: {
        // minHeight: '72px', // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        fontSize: "14px",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };
  const handleClose = () => setOpen(false);
  const Findanddelete = async ({ id }) => {
    console.log(id);
    axios
      .post("http://localhost:2000/api/delete", { id: id })
      .then((response) => {
        toast.success(response.data.message);
        window.location.reload();
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    // height:"60vh",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const getAllEmp = async () => {
    try {
      axios
        .get("http://localhost:2000/api/allemp")
        .then((response) => {
          // console.log(response.data);
          if (response.data.length > 0) {
            // setEmpData(response.data.map);
            setEmpData(
              response.data?.map((item, index) => {
                return {
                  id: index + 1,
                  name: item.name,
                  image: (
                    <img
                      src={item.image}
                      alt="img"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                      }}
                    />
                  ),
                  email: item.email,
                  mobile: item.mobile,
                  designation: item.designation,
                  course: item.course
                    ?.map((item) => {
                      return item;
                    })
                    .join(", "),
                  date: moment(item.date).format("DD-MM-YYYY"),
                  active:
                    item.isActive === true ? (
                      <span style={{ color: "green" }}>Active</span>
                    ) : (
                      <span style={{ color: "red" }}>Inactive</span>
                    ),
                  action: [
                    <div style={{ display: "flex" }}>
                      <IconButton key={1} disabled={user.isAdmin? false: true}  onClick={() => handleOpen({ item })}>
                        <ModeEditIcon />
                      </IconButton>
                      <IconButton
                      disabled={user.isAdmin? false: true}
                        key={2}
                        onClick={() => Findanddelete({ id: item._id })}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>,
                  ],
                };
              })
            );
          }
          // console.log(response.data);
        })
        .catch((error) => {
          console.error("Error");
        });
    } catch {
      console.error("Error");
    }
  };
  const [loading, setLoading] = React.useState(false);
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
            setModalData({...modalData, image:res.data.secure_url})
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
  console.log(modalData, "modalData");
  const updateEmp = async () => {
    try {
      let id = modalData?._id
      await axios.post(`http://localhost:2000/api/update/emp?id=${id}`,modalData).then((response) => {
        // console.log(response.data);
        toast.success(response.data.message);
        setOpen(false);
        // window.location.reload();
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  getAllEmp()
  getUser();
  useEffect(() => {
    // getAllEmp();
    getUser();
  }, [empData]);
  const columns = [
    { selector: (row) => row.id, name: "ID", sortable: true },
    { selector: (row) => row.image, name: "Image" },
    { selector: (row) => row.name, name: "Name", sortable: true },

    { selector: (row) => row.mobile, name: "Mobile No" },
    { selector: (row) => row.designation, name: "Designation", sortable: true },
    { selector: (row) => row.course, name: "Course" },
    { selector: (row) => row.date, name: "Created Date", sortable: true },
    { selector: (row) => row.action, name: "Action" },
    { selector: (row) => row.active, name: "Status" },
  ];
  return (
    <div>
      <TopNavBar />
      <br />
      <br />
      <Container>
        <Button
          sx={{ float: "right" }}
          variant="contained"
          onClick={() => navigate("/create/employee")}
          disabled={user?.isAdmin? false: true}
        >
          Create Employee
        </Button>
        <br />
        <br />
        <br />
        <div style={{ height: 400, width: "100%" }}>
          <Card>
            {/* <CardHeader title="Employee List" /> */}
            <Box sx={{ padding: "20px" }}>
              <DataTable
                customStyles={customStyles}
                columns={columns}
                data={empData}
                pagination
              />
            </Box>
          </Card>
        </div>
      </Container>
      <Toaster position="top-center" reverseOrder={false} />
      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          
        >
        <Box sx={style}>
          <Container>
            
              <Typography id="modal-modal-title" variant="h6" component="h2">
                edit employee
              </Typography>
              {/* <center></center> */}
              <Grid>
                <img
                  src={modalData.image}
                  alt="img"
                  style={{
                    height: "100px",
                    width: "100px",
                    borderRadius: "50%",
                  }}
                />
                <br />
                <input type="file" accept="image/*" onChange={(e)=>{handleImageChange({image:e.target.files[0]})}}/>
              </Grid>
              <br />
              {/* <br/> */}
              
              <MDBInput
                wrapperClass="mb-4"
                label="Name"
                id="name"
                value={modalData.name}
                type="text"
                size="s"
                onChange={(e) =>
                  setModalData({ ...modalData, name: e.target.value })
                }
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                value={modalData.email}
                id="email"
                type="email"
                size="s"
                onChange={(e) =>
                  setModalData({ ...modalData, email: e.target.value })
                }
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Mobile No"
                value={modalData.mobile}
                id="mobile"
                type="text"
                size="s"
                onChange={(e) =>
                  setModalData({ ...modalData, password: e.target.value })
                }
              />
              <FormControl fullWidth variant="outlined">
                <InputLabel>Designation</InputLabel>
                <Select
                  //   labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={modalData.designation}
                  label="Designation"
                  //   variant='standard'
                  onChange={(e) =>
                    setModalData({ ...modalData, designation: e.target.value })
                  }
                >
                  {designation.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  value={modalData.gender}
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={(e) => {
                    setModalData({ ...modalData, gender: e.target.value });
                  }}
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
              <Box>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Course
                </FormLabel>

                <FormGroup
                  sx={{ display: "flex", flexDirection: "row" }}
                  defaultValue={modalData.course}
                  onChange={(e) => {
                    setModalData({
                      ...modalData,
                      course: [...modalData?.course, e.target.value],
                    });
                  }}
                >
                  {modalData.course?.map((item, index) => {
                    return (
                      <FormControlLabel
                        control={<Checkbox checked />}
                        label={item}
                        value={item}
                        isChecked={modalData.course?.includes(item)}
                      />
                    );
                  })}
                  {/* <FormControlLabel
                            control={<Checkbox />}
                            label="MCA"
                            value={"MCA"}
                            isChecked={modalData.course?.includes("MCA")}
                            
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
                          /> */}
                </FormGroup>
              </Box>
              {loading?<ColorRing height={60} width={60}/>:null}
              <Button
                variant="contained"
                onClick={updateEmp}
              >
                Submit
              </Button>
            
            </Container>
            </Box>
        </Modal>
      )}
    </div>
  );
};

export default EmployeePage;
