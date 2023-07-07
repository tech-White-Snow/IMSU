import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, InputLabel, Link, Stack, TextField, Typography,FormControl,  Select,  MenuItem, Alert } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { updateAlert } from 'src/redux/action/alert';
import { useDispatch, useSelector } from 'react-redux';
import {BACKEND_URL} from '../../Constant';

//register company
const Page = () => {
  const dispatch = useDispatch();
  const {Alerts} = useSelector(state=>state);
  const [alert1, setAlert] = useState(""); 
  const router = useRouter();
  const auth = useAuth();
  const [formData, setData] = useState({
    name: '',
    address: '',
  });

  useEffect(()=>{
   
  }, [])
    
  //change handle function calling if input value changed...
  const handleChange = (e) => setData({
    ...formData,
    [e.target.name]: e.target.value
  });

  //validation of input value...
  const validateData=()=>{
    if(!formData.name.length) {        
     // dispatch(updateAlert('Name is required.'));
      setAlert("Name is required");
      return true;
    }
    if(!formData.address.length) {        
      //dispatch(updateAlert('Name is required.'));
      setAlert("Address is required");
      return true;
    }

    return false;
  }
   
  //register function calling clicked register button.
  const handleRegister = async () => { 
    if(validateData()) return;

      const body = JSON.stringify(formData);
    
      try {
  
        const res = await axios.post(`${BACKEND_URL}/api/company/`, formData);
        
        
        router.push('/auth/register');
      } catch (err) {
 
        // console.log(err)
        // const {errors} = err.response.data;
        
        if (err) {
          // dispatch(updateAlert(err.toString()));
          console.log(err.data);
          let dd='';
          if(err.data.errors.errors!=null&&err.data.errors.errors!='')
           {dd = err.data.errors.errors[0].msg.toString(); console.log(dd)}
           else dd=err.data.errors.toString();
           console.log(dd)
          setAlert(dd);
        }
      }

  }

  return (
    <>
      <Head>
        <title>
          Register | IM Serve
        </title>
      </Head>
      <Box
        sx={{
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Register company
              </Typography> 
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Already registered an company?
                &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/login"
                  underline="hover"
                  variant="subtitle2"
                  margin='10px'
                >
                  Log in
                </Link>
                <Link
                  component={NextLink}
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                  margin='10px'
                >
                  Register
                </Link>
              </Typography>
            </Stack>
            <div
              
              //onSubmit={formik.handleSubmit}
            >
              {(alert1!='') ?<Alert severity="error"> {alert1}</Alert>:''}
              <Stack spacing={3}>
                <TextField
                //  error={!!(formik.touched.name && formik.errors.name)}
                  fullWidth
                //  helperText={formik.touched.name && formik.errors.name}
                  label="Name"
                  name="name"
                //  onBlur={formik.handleBlur}
                  type="text"
                  onChange={handleChange}
                  value={formData.name}
                />
                <TextField
                //  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                 // helperText={formik.touched.email && formik.errors.email}
                  label="Address"
                  name="address"
                //  onBlur={formik.handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={formData.address}
                />
              
              </Stack>
              {/* {formik.errors.submit && (
                <Typography
                  color="error"
                  sx={{ mt: 3 }}
                  variant="body2"
                >
                  {formik.errors.submit}
                </Typography>
              )} */}
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
                onClick={handleRegister}
              >
                Register company
              </Button>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
