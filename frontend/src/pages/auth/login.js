import { useCallback, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import { useSelector } from 'react-redux';
import { updateCustomer, updateEmployee, updateTransaction } from 'src/redux/action/modal';

const Page = () => {
  const {users} = useSelector(state=>state.users)
  const router = useRouter();
  const auth = useAuth();
  const [method, setMethod] = useState('email');
  const [error, setError] = useState(false);

  const [formData, setData] = useState({
    email: "",
    password: ""
  })

  const formik = useFormik({
    initialValues: {
      email: 'demo@devias.io',
      password: 'Password123!',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        // await auth.signIn(values.email, values.password);
        // localStorage.setItem('user', JSON.stringify(res.data));
        

      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  const handleLogin=()=>{
    let err = false;
    users.map((user,index)=>{
      if(user.email == formData.email && user.password == formData.password){
        localStorage.setItem('user', JSON.stringify(user));
        window.sessionStorage.setItem('authenticated', 'true');
        router.push('/');
        err = true;
      }
    });

    if(!err) setError(true);

    // axios.post(`${process.env.SERVER_URL}/api/users/login`, formData)
    //   .then((res) => {
    //     dispatch(updateEmployee(res.data.employees));
    //     dispatch(updateCustomer(res.data.customers));
    //     dispatch(updateTransaction(res.data.transactions));
    //     localStorage.setItem('user', JSON.stringify(res.data.myInfor));
    //     window.sessionStorage.setItem('authenticated', 'true');
    //   }).catch((err) => {
      
    //   });
  }

  const handleChange = (e) => setData({
    ...formData,
    [e.target.name]: e.target.value
  });
  const handleMethodChange = useCallback(
    (event, value) => {
      setMethod(value);
    },
    []
  );


  return (
    <>
      <Head>
        <title>
          Login | IM Serve
        </title>
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
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
                Login
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Don&apos;t have an account?
                &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                >
                  Register
                </Link>
              </Typography>
            </Stack>
            <Tabs
              onChange={handleMethodChange}
              sx={{ mb: 3 }}
              value={method}
            >
              {/* <Tab
                label="Email"
                value="email"
              /> */}
              {/* <Tab
                label="Phone Number"
                value="phoneNumber"
              /> */}
            </Tabs>
            {method === 'email' && (
              <form
                noValidate
                onSubmit={formik.handleSubmit}
              >
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label="Email Address"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={formData.email}
                  />
                  <TextField
                    error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label="Password"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={formData.password}
                  />
                </Stack>
                <FormHelperText sx={{ mt: 1 }} style={{color: "red"}}>
                  {error ? "Wrong email or password" :""}
                </FormHelperText>
                {formik.errors.submit && (
                  <Typography
                    color="error"
                    sx={{ mt: 3 }}
                    variant="body2"
                  >
                    {formik.errors.submit}
                  </Typography>
                )}
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  onClick={handleLogin}
                  variant="contained"
                >
                  Login
                </Button>
              
              </form>
            )}
            {method === 'phoneNumber' && (
              <div>
                <Typography
                  sx={{ mb: 1 }}
                  variant="h6"
                >
                  Not available in the demo
                </Typography>
                <Typography color="text.secondary">
                  To prevent unnecessary costs we disabled this feature in the demo.
                </Typography>
              </div>
            )}
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
