import React ,{useState} from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Form from "react-bootstrap/Form"
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router';

const submitloginAPI=(data)=>{
    const url = "http://127.0.0.1:5000/api/register"
    return axios.post(url, data)
}
function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const theme = createTheme();
function Regsiter(){
    
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const [date, setDate] = useState(new Date());
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get('email'),
          password: data.get('password'),
        });
    };
    const [info,setInfo] = useState({username:'',Fname: '',password : '',email:'',sdt:'',gt:'',address:''})
    const onValueChangeUsername = (event) => {
        setInfo(prev => ({ ...prev, username: event.target.value }));
    }
    const onValueChangeFName = (event) => {
        setInfo(prev => ({ ...prev, Fname: event.target.value }));
    }
    const onValueChangePassword = (event) => {
        setInfo(prev => ({ ...prev, password: event.target.value }));
    }
    const onValueChangeEmail = (event) => {
        setInfo(prev => ({ ...prev, email: event.target.value }));
    }
    const onValueChangeSdt = (event) => {
        setInfo(prev => ({ ...prev, sdt: event.target.value }));
    }
    const onValueChangeGt = (event) => {
        setInfo(prev => ({ ...prev, gt: event.target.value }));
    }
    const onValueChangeAddress = (event) => {
        setInfo(prev => ({ ...prev, address: event.target.value }));
    }

    
    const onSubmit = async ()=>{
        const data = new FormData();
        data.append('username',info.username)
        data.append('Fname',info.Fname)
        data.append('password',info.password)
        data.append('email',info.email)
        data.append('sdt',info.sdt)
        data.append('gt',info.gt)
        data.append('address',info.address)
        data.append('datebirth',date)
        try {
            const rs = await submitloginAPI(data);
            console.log(JSON.stringify(rs))
            if (rs.status === 200) {
                enqueueSnackbar("Tạo Tài Khoản Thành Công", { variant: 'success' });
                history.push('login');
            }
            else {
                console.log(rs.data)
                enqueueSnackbar("Vui Lòng Thử Lại !", { variant: "error" });
            }
        } catch (e) {
            console.log("error: " + e);
            enqueueSnackbar("Vui Lòng Thử Lại ", { variant: 'error' });
        }
    }
    return(
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="Fname"
                    required
                    fullWidth
                    id="Fname"
                    label="Full Name"
                    onChange={onValueChangeFName}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    onChange={onValueChangeUsername}
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    onChange={onValueChangeEmail}
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={onValueChangePassword}
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="sdt"
                    required
                    fullWidth
                    id="sdt"
                    onChange={onValueChangeSdt}
                    label="Phone Number"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="gt"
                    label="Gender"
                    name="gt"
                    onChange={onValueChangeGt}
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    onChange={onValueChangeAddress}
                    
                  />
                </Grid>
                <Grid item xs={12}>
                <Form.Group controlId="duedate">
                    <Form.Control
                        type="date"
                        name="duedate"
                        placeholder="Due date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    </Form.Group>
                <small>choose your date of birth</small>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I cofrim that all infomation is trusted"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={onSubmit}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>

    );
}
export default Regsiter;