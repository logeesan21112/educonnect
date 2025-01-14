import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Divider from '@mui/material/Divider'; // Import Divider separately

import { School, PeopleAlt, CheckCircle, Email } from '@mui/icons-material'; // Import icons directly

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600, // Default width
  bgcolor: 'background.paper',
  border: 'none',
  outline: 'none',
  boxShadow: 24,
  borderRadius: 4, // Apply border radius to all corners
  maxHeight: '80vh', // Set max height for the modal
  overflowY: 'auto', // Allow scrolling
  padding: '16px', // Add padding to prevent the content from touching the edges
};

// Hide scrollbar but keep scrolling functionality
const hideScrollbarStyle = {
  '::-webkit-scrollbar': {
    display: 'none', // Hide the scrollbar
  },
};

const fetures = [
  "Prioritized ranking in conversations and search",
  "See approximately twice as many Tweets between ads in your For You and Following timelines.",
  "Add bold and italic text in your Tweets.",
  "Post longer videos and 1080p video uploads.",
  "All the existing Blue features, including Edit Tweet, Bookmark Folders and early access to new features.",
];

export default function SubscriptionModal({ handleClose, open }) {
  const [plan, setPlan] = React.useState("Annually");

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, ...hideScrollbarStyle }}>
          <div className="flex items-center space-x-3">
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className="flex justify-center py-10">
            <div className="w-[80%] space-y-10">
              <div className="p-5 rounded-md flex items-center justify-between bg-slate-400 shadow-lg">
                <h1 className="text-xl pr-5">
                  Undergraduates who are studying at UGC-registered universities and are eligible for verification on EduConnect will receive a blue tick once approved.
                </h1>
                <img
                  className="w-24 h-24"
                  src="https://abs.twimg.com/responsive-web/client-web/verification-card-v2@3x.8ebee01a.png"
                  alt=""
                />
              </div>

              <Typography variant="h5" align="left" sx={{ fontWeight: 'bold', mb: 0 }}>
  Requirements for Getting Verified on EduConnect
</Typography>



              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <School sx={{ color: '#1e88e5', marginRight: 2 }} />
                <Typography variant="body1">
                  <strong>Undergraduates</strong>: Must be currently studying at a UGC-registered university.
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PeopleAlt sx={{ color: '#1e88e5', marginRight: 2 }} />
                <Typography variant="body1">
                  <strong>University Leadership and Faculty</strong>: Includes Vice-Chancellors, Deans, Senior Lecturers, and Lecturers who hold respected positions within universities.
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CheckCircle sx={{ color: '#1e88e5', marginRight: 2 }} />
                <Typography variant="body1">
                  <strong>Public Figures in Education</strong>: Individuals who are publicly recognized and associated with education-related work.
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Email sx={{ color: '#1e88e5', marginRight: 2 }} />
                <Typography variant="body1">
                  <strong>Other Individuals</strong>: If you do not fall into the above categories but wish to get verified, please email us at <strong>contact.educonnect@gmail.com</strong> with a proper reason for verification. Further validation may be required, and approval is subject to review.
                </Typography>
              </Box>

              <div className="cursor-pointer flex justify-center bg-gray-900 text-white rounded-full px-5 py-3">
  <span className="text-sm italic">Fill out the form through this link</span>
  <a href="your-form-link-here" target="_blank" className="text-blue-500 ml-2 underline">Fill Form</a>
</div>

            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
