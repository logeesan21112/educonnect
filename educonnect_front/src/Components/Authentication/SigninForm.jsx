import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { Grid, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../Store/Auth/Action';

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is Required'),
  password: Yup.string().required('Password is required'),
});

const SigninForm = () => {
  const dispatch = useDispatch();

  // Using useFormik to handle form state and validation
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
      console.log('form value', values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            variant="outlined"
            size="large"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            name="password"
            variant="outlined"
            size="large"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>

        <Grid item xs={12} className="mt-20">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
          >
            Sign In
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SigninForm;
