import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: '#f0f0f0',
  color: '#141619',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  outline: 'none',
};

export default function AuthModal({ open, handleClose, authType, setAuthType }) {
  const toggleAuthType = () => {
    setAuthType(authType === 'signup' ? 'signin' : 'signup');
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="text-center font-bold text-3xl pb-10">
            {authType === 'signup' ? 'Create your account' : 'Sign in to your account'}
          </h1>

          {authType === 'signup' ? <SignupForm /> : <SigninForm />}

          <h1 className="text-center py-5 font-semibold text-lg">
            {authType === 'signup' ? 'Already have an account?' : "Don't have an account?"}
          </h1>

          <Button
            fullWidth
            variant="outlined"
            onClick={toggleAuthType}
          >
            {authType === 'signup' ? 'Sign In' : 'Sign Up'}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}