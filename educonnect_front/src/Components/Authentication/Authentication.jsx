import { Grid } from '@mui/material';
import React, { useState } from 'react';
import { Button } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import AuthModal from './AuthModel';

const Authentication = () => {
  const [openAuthModel, setOpenAuthModel] = useState(false);
  const [authType, setAuthType] = useState('signup');

  const handleOpenAuthModel = (type) => {
    setAuthType(type);
    setOpenAuthModel(true);
  };

  const handleCloseAuthModel = () => setOpenAuthModel(false);

  return (
    <div>
      <Grid className='overflow-y-hidden' container>
      <Grid className="hidden lg:block" item lg={7}>
  <div
    className="w-full h-screen flex flex-col justify-center items-center" // Centered the content
    style={{
      background: 'linear-gradient(to bottom, #305CDE, #1B3A8E)', // Gradient from #305CDE to a darker shade
    }}
  >
    {/* EduConnect Logo */}
    <img
      src="/images/2.png" // Path to the logo image
      alt="EduConnect Logo"
      style={{
        width: 'auto', // Adjust width as necessary
        height: 'auto', // Adjust height as necessary
        maxWidth: '100%', // Ensure the image is responsive
        maxHeight: '80vh', // Set the max height to a larger value to double the size
      }}
    />
  </div>
</Grid>








<Grid
  className="px-10"
  lg={5}
  xs={12}
  style={{
    background: 'linear-gradient(to bottom, #f1f1fc, #e4e8f8)', // Light gradient
    color: '#141619',
    height: '100vh',
  }}
>

          <div
            style={{
              padding: '20px',
              margin: '0 auto',
              width: '100%',
              maxWidth: '500px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <div className="w-full">
              <div className="flex justify-center mb-5">
                <GoogleLogin width={330} />
              </div>
              <div className="flex items-center justify-center my-5">
                <div className="border-t w-full"></div>
                <span className="px-3 text-center">OR</span>
                <div className="border-t w-full"></div>
              </div>
              <Button
                onClick={() => handleOpenAuthModel('signup')}
                fullWidth
                variant="contained"
                size="large"
              >
                Create Account
              </Button>
              <p className="text-sm mt-2">
                By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.
              </p>
            </div>

            <div className="mt-10">
              <h1 className="font-bold text-xl mb-5">Already have an account?</h1>
              <Button
                onClick={() => handleOpenAuthModel('signin')}
                fullWidth
                variant="outlined"
                size="large"
              >
                Sign In
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>

      <AuthModal open={openAuthModel} handleClose={handleCloseAuthModel} authType={authType} setAuthType={setAuthType} />
    </div>
  );
};

export default Authentication;
