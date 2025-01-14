import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import { Avatar, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import './ProfileModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../Store/Auth/Action';
import { uploadToCloudnary } from '../../Utils/uploadToCloudnary';
import { KeyboardArrowRight } from '@mui/icons-material';
import ReactGooglePlacesAutocomplete from 'react-google-places-autocomplete';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%', // Set to full width
  maxWidth: 600, // Optional: set a max width if you want to limit the modal size
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  outline: 'none',
  borderRadius: 4,
};


export default function ProfileModal({ open, handleClose }) {
  const [uploading, setUploading] = React.useState(false);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = React.useState('');
  const { auth } = useSelector((store) => store);

  const handleSubmit = (values) => {
    dispatch(updateUserProfile(values));
    console.log('handle submit', values);
    setSelectedImage('');
  };

  const formik = useFormik({
    initialValues: {
      fullName: '',
      website: '',
      location: '',
      bio: '',
      backgroundImage: '',
      image: '',
    },
    onSubmit: handleSubmit,
  });

  // Prepopulate form when modal opens or auth data changes
  React.useEffect(() => {
    console.log('Background Image URL:', auth.user?.backgroundImage); 
    if (auth.user) {
      formik.setValues({
        fullName: auth.user.fullName || '',
        website: auth.user.website || '',
        location: auth.user.location || '',
        bio: auth.user.bio || '',
        backgroundImage: auth.user.backgroundImage || '',
        image: auth.user.image || '',
        birthDate: auth.user.birthDate || '',
      });
      setSelectedImage(auth.user.image || '');
    }
  }, [auth.user, open]);

  {/*const handleImageChange = async (event) => {
    setUploading(true);
    const { name } = event.target;
    const file = await uploadToCloudnary(event.target.files[0]);
    formik.setFieldValue(name, file);
    setSelectedImage(file);
    setUploading(false);
  };*/}

  const handleImageChange = async (event) => {
    setUploading(true);
    const { name } = event.target; // Captures the input field's name
    const file = await uploadToCloudnary(event.target.files[0]);
  
    formik.setFieldValue(name, file); // Update the correct field
  
    // Only update the selectedImage state if the input is for the profile picture
    if (name === "image") {
      setSelectedImage(file);
    }
  
    setUploading(false);
  };

  // Function to format the date to "November 12, 2000"
const formatDate = (dateString) => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const date = new Date(dateString);
  const day = date.getDate(); // Get day (1-31)
  const month = months[date.getMonth()]; // Map month number to name
  const year = date.getFullYear(); // Get full year (e.g., 2000)

  return `${month} ${day}, ${year}`;
};


  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
              <p className="text-sm">Edit Profile</p>
            </div>
            <Button type="submit">Save</Button>
          </div>
          <div className="hideScrollBar overflow-y-scroll overflow-x-hidden h-[80vh]">
            <React.Fragment>
              <div className="w-full">
                <div className="relative">
                

                <img
  className="w-full h-[12rem] object-cover object-center"
  src={formik.values.backgroundImage || "https://cdn.pixabay.com/photo/2023/12/06/08/41/mountain-8433234_1280.jpg"}
  alt="Background"
/>


                  
                  {/*<input
                    type="file"
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                    name="backGroundImage"
                  />*/}
                  <input
  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
  onChange={handleImageChange}
  name="backgroundImage" /* Correct name for cover photo */
  type="file"
  />
                </div>
              </div>
              <div className="w-full transform -translate-y-20 ml-4 h-[6rem]">
                <div className="relative">
                  <Avatar
                    sx={{ width: '10rem', height: '10rem', border: '4px solid white' }}
                    src={
                      selectedImage ||
                      auth.user?.image 
                    }
                  />
                  {/*<input
                    className="absolute top-0 left-0 w-[10rem] h-full opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                    name="image"
                    type="file"
                  />*/}
                  
<input
  className="absolute top-0 left-0 w-[10rem] h-full opacity-0 cursor-pointer"
  onChange={handleImageChange}
  name="image" /* Correct name for profile picture */
  type="file"
/>

                </div>
              </div>
            </React.Fragment>
            <div className="space-y-3">
              <TextField
                fullWidth
                id="fullName"
                name="fullName"
                label="Full Name"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                helperText={formik.touched.fullName && formik.errors.fullName}
              />

              <TextField
                fullWidth
                multiline
                rows={4}
                id="bio"
                name="bio"
                label="Bio"
                value={formik.values.bio}
                onChange={formik.handleChange}
                error={formik.touched.bio && Boolean(formik.errors.bio)}
                helperText={formik.touched.bio && formik.errors.bio}
              />

              <TextField
                fullWidth
                id="website"
                name="website"
                label="Website"
                value={formik.values.website}
                onChange={formik.handleChange}
                error={formik.touched.website && Boolean(formik.errors.website)}
                helperText={formik.touched.website && formik.errors.website}
              />

              {/*<TextField
                fullWidth
                id="location"
                name="location"
                label="Location"
                value={formik.values.location}
                onChange={formik.handleChange}
                error={formik.touched.location && Boolean(formik.errors.location)}
                helperText={formik.touched.location && formik.errors.location}
              />*/}

<TextField
  fullWidth
  id="location"
  name="location"
  label="Location"
  value={formik.values.location}
  onChange={formik.handleChange}
  error={formik.touched.location && Boolean(formik.errors.location)}
  helperText={formik.touched.location && formik.errors.location}
/>

{/*
<ReactGooglePlacesAutocomplete
  apiKey="AIzaSyCoB3uCF-v8LEBo_PlfLA0ESQakQRwuvEo" // Replace with your API key
  selectProps={{
    value: formik.values.location,
    onChange: (value) => formik.setFieldValue("location", value?.label || ""), // Update formik with the selected address
  }}
  debounce={500} // Optional: debounce the suggestions for better UX
  placeholder="Search for your location"
/>*/}

<div className="my-3">
  <p className="text-lg">Birth date . Edit</p>
  <p className="text-2xl">
    {auth.user?.birthDate ? formatDate(auth.user.birthDate) : ""}
  </p>
</div>


<div className="flex justify-between py-3 text-lg hover:bg-gray-200 hover:cursor-pointer">
  <span>Create expanded bio</span>
  <span>&gt;</span>
</div>
<div className="flex justify-between py-3 text-lg hover:bg-gray-200 hover:cursor-pointer">
  <span>Switch to professional</span>
  <span>&gt;</span>
</div>

            </div>
          </div>
        </form>
      </Box>
    </Modal>
  );
}
