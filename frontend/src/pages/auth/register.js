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

const Page = () => {
  const dispatch = useDispatch();
  const {Alerts} = useSelector(state=>state);
  const router = useRouter();
  const auth = useAuth();
  const [formData, setData] = useState({
    name: '',
    email: '',
    gender: '',
    address: '',
    role: '',
    password: '',
    confirm_password: '',
  });

  useEffect(()=>{
  }, [Alerts])
  // const formik = useFormik({
  //   initialValues: {
  //     email: '',
  //     name: '',
  //     password: '',
  //     submit: null
  //   },
  //   validationSchema: Yup.object({
  //     email: Yup
  //       .string()
  //       .email('Must be a valid email')
  //       .max(255)
  //       .required('Email is required'),
  //     name: Yup
  //       .string()
  //       .max(255)
  //       .required('Name is required'),
  //     password: Yup
  //       .string()
  //       .max(255)
  //       .required('Password is required')
  //   }),
  //   onSubmit: async (values, helpers) => {
  //     try {
  //       await auth.signUp(values.email, values.name, values.password);
  //       router.push('/');
  //     } catch (err) {
  //       helpers.setStatus({ success: false });
  //       helpers.setErrors({ submit: err.message });
  //       helpers.setSubmitting(false);
  //     }
  //   }
  // });

  

  const handleChange = (e) => setData({
    ...formData,
    [e.target.name]: e.target.value
  });
  const validateData=()=>{
    if(!formData.name.length) {        
      dispatch(updateAlert('Name is required.'));
      return true;
    }
    if(formData.password!=formData.confirm_password) {        
      dispatch(updateAlert('Password not matched.'));
      return true;
    }
    return false;
  }
   
  const handleRegister = async () => { 
    if(validateData()) return;

      const body = JSON.stringify(formData);
    
      try {
  
        const res = await axios.post(`${BACKEND_URL}/api/users/`, formData);
        
      
        router.push('/auth/login');
      } catch (err) {
 
        // console.log(err)
        // const {errors} = err.response.data;
        
        if (err) {
          dispatch(updateAlert(err.toString()));
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
                Register
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Already have an account?
                &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/login"
                  underline="hover"
                  variant="subtitle2"
                >
                  Log in
                </Link>
              </Typography>
            </Stack>
            <div
              
              //onSubmit={formik.handleSubmit}
            >
              {(Alerts.error!='') ?<Alert severity="error"> {Alerts.error}</Alert>:''}
              <Stack spacing={3}>
                <TextField
                //  error={!!(formik.touched.name && formik.errors.name)}
                  fullWidth
                //  helperText={formik.touched.name && formik.errors.name}
                  label="Name"
                  name="name"
                //  onBlur={formik.handleBlur}
                  onChange={handleChange}
                  value={formData.name}
                />
                <TextField
                //  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                 // helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                //  onBlur={formik.handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={formData.email}
                />
                <TextField
                  label="Gender"
                  name="gender"
                 // onBlur={formik.handleBlur}
                  onChange={handleChange}
                  type="gender"
                  value={formData.gender}
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Role</InputLabel> 
                  <Select   
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Manager">Manager</MenuItem>
                    <MenuItem value="Normal">Normal</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                //  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                //  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                //  onBlur={formik.handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={formData.password}
                />
                <TextField
                //  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                //  helperText={formik.touched.password && formik.errors.password}
                  label="Confirm Password"
                  name="confirm_password"
                 // onBlur={formik.handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={formData.password_confirm}
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
                Register
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
