import React, { Component,useEffect,useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import { getAPI } from '../service/api.js';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

import { styled } from '@mui/material/styles';

const getData = (username) =>{
    return getAPI("/getallusers/"+username);
}
const buttons = [
    <Button key="dashboard">Dashboard</Button>,
    <Button key="transfer">Transfer</Button>,
    <Button key="swap">Swap</Button>,
    <Button key="profile">Profile</Button>,
  ];
function Index(){
    const [age, setAge] = React.useState('');
    const [postt, setPostt] = useState([]);
    const rows = [];
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    useEffect(() => {
        const requestData = async () => {
            try {
                const result = await getData('admin');
                if (result.status === 200) {
                    setPostt(result.data['data']);
                    console.log(result.data['data']);
                }
            } catch (e) {
                console.log("error: ", e);
            }
        };
        requestData();
    }, []);
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    const columns = [
        { field: '_id', headerName: 'ID', width: 90,editable: true },
        {
            field: 'Fname',
            headerName: 'Full Name',
            width: 170,
            editable: true,
        },
        {
            field: 'username',
            headerName: 'Username',
            width: 150,
            editable: true,
        },
        {
            field: 'dateofbirth',
            headerName: 'Date Of Birth',
            width: 150,
            editable: true,
        },
        {
            field: 'gt',
            headerName: 'Gender',
            width: 90,
            editable: true,
        },
        {
            field: 'email',
            headerName: 'Email',
            sortable: false,
            width: 160,
            
        },
        {
            field: 'address',
            headerName: 'Address',
            sortable: false,
            width: 200,
            
        },
        {
            field: 'timecreated',
            headerName: 'Time Created',
            sortable: false,
            width: 260,
            
        },
      ];

    return(
        
        <div className="container"style={{'margin':'0px'}} >
            {/* <div className="header" style={{'width': '100%', 'height': '50px','display':"relative"}}>header</div> */}
            <div className='body'style={{'display': 'flex'}}>
                <div className="menu" style={{'width': '10%',"background-color": 'white','padding':"0px"}}>
                    <div className='logo' >
                        <img src={ require('../images/logo.jpg') } style={{'heigh':'20px','width':'130px'}}/>
                    </div>
                    <div className="d-grid gap-2" style={{'background-color':'#def7f7'}}>
                    <Box
                        sx={{
                            display: 'flex',
                            '& > *': {
                            m: 1,
                            },
                        }}
                        >
                        <ButtonGroup
                            orientation="vertical"
                            aria-label="vertical contained button group"
                            variant="text"
                            style={{'color':'white','font-size':'30px'}}
                        >
                            {buttons}
                        </ButtonGroup>
                        </Box>
                        </div>
                </div>
                <div className="content"style={{'padding':'5px','margin-left':'5px','display':'relative'}}>
                    <div className="nav-content">
                        <ButtonGroup  variant="contained" aria-label="outlined primary button group">
                            <div style={{'position':'absolute','height':'30px'}}>
                            <Button variant="text">
                            <img src={ require('../images/menu.png') } style={{'heigh':'30px','width':'30px'}}/>
                            </Button>
                            </div>
                            
                            <div  style={{'right':'0px','position':'absolute','height':'30px'}}>
                            <Button style={{'margin-right':'10px'}} variant="text">
                                <img src={ require('../images/email.png') } style={{'heigh':'30px','width':'30px'}}/>
                            </Button>
                            <Button style={{'margin-right':'10px','height':'30px'}}variant="text">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">
                                        <img src={ require('../images/person.png') } style={{'heigh':'20px','width':'20px'}}/>
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={age}
                                        label="Age"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={1}>Login</MenuItem>
                                        <MenuItem value={2}>Regsiter</MenuItem>
                                        <MenuItem value={3}>Logout</MenuItem>
                                    </Select>
                                </FormControl>
                            </Button>
                            </div>
                        </ButtonGroup>
                    </div>
                    <div className='content' style={{'margin-top':'50px'}}>
                    <Table striped bordered hover >
                        <thead>
                            <tr>
                            <th style={{'width':'50px'}}>ID</th>
                            <th>Full Name</th>
                            <th>Username</th>
                            <th>Gender</th>
                            <th>Date Of Birth</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>time Created</th>
                            <th colSpan={3}>Acction</th>
                            </tr>
                        </thead>
                        <tbody>
                            {postt.map((row)=>(
                                <tr>
                                <td>{row._id}</td>
                                <td>{row.Fname}</td>
                                <td>{row.username}</td>
                                <td>{row.gt}</td>
                                <td>{row.dateofbirth}</td>
                                <td>{row.address}</td>
                                <td>{row.email}</td>
                                <td>{row.timecreated}</td>
                                <td>EDIT</td>
                                <td>DELETE</td>
                                <td>DETAIL</td>
                                </tr>
                            ))}
                            
                            
                        </tbody>
                        </Table>
                    
                        
                    </div>
                    
                </div>
               

            </div>
            
        </div>
    );
}
export default Index;