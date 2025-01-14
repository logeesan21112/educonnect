import React from 'react';
import * as Yup from 'yup';
import { Grid, TextField, Button, InputLabel, Select, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../Store/Auth/Action';

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is Required'),
  email: Yup.string().email('Invalid email').required('Email is Required'),
  password: Yup.string().required('Password is required'),
});

// Generate arrays for date selection
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' }
];

const SignupForm = () => {
  const dispatch = useDispatch();

  // Initialize formik with form state and validation
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      dateOfBirth: {
        day: '', // Empty string ensures it's controlled
        month: '', // Empty string ensures it's controlled
        year: '' // Empty string ensures it's controlled
      }
    },
    validationSchema,
    onSubmit: (values) => {
      const { day, month, year } = values.dateOfBirth;
      const dateOfBirth = `${year}-${month}-${day}`; 
      values.dateOfBirth = dateOfBirth;

      dispatch(registerUser(values));
      console.log('form values', values);
    }
  });

  // Handler for date of birth fields
  const handleDateChange = (name) => (event) => {
    formik.setFieldValue("dateOfBirth", {
      ...formik.values.dateOfBirth,
      [name]: event.target.value,
    });
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            variant="outlined"
            size="large"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />
        </Grid>

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

        <Grid item xs={4}>
          <InputLabel>Date</InputLabel>
          <Select
            name="day"
            onChange={handleDateChange("day")}
            onBlur={formik.handleBlur}
            value={formik.values.dateOfBirth.day || ''} // Ensures controlled
            fullWidth
          >
            {days.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={4}>
          <InputLabel>Month</InputLabel>
          <Select
            name="month"
            onChange={handleDateChange("month")}
            onBlur={formik.handleBlur}
            value={formik.values.dateOfBirth.month || ''} // Ensures controlled
            fullWidth
          >
            {months.map((month) => (
              <MenuItem key={month.value} value={month.value}>
                {month.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={4}>
          <InputLabel>Year</InputLabel>
          <Select
            name="year"
            onChange={handleDateChange("year")}
            onBlur={formik.handleBlur}
            value={formik.values.dateOfBirth.year || ''} // Ensures controlled
            fullWidth
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid className="mt-20" item xs={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
          >
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignupForm;
