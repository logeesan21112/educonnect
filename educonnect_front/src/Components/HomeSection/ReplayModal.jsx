import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import ImageIcon from '@mui/icons-material/Image';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { createTweetReply } from '../../Store/Twit/Action';
import { useSelector } from 'react-redux';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  outline:'none',
  borderRadius: 4 
};

export default function ReplayModal({handleClose, open, item}) {
const navigate = useNavigate()
const [uploadingImage, setUploadingImage] = React.useState(false);
const [selectImage, setSelectedImage] = React.useState("");
const { auth, twit } = useSelector(store => store);

const dispatch=useDispatch();

const handleSubmit=(values)=>{
    dispatch(createTweetReply(values))
    handleClose()
    console.log("handle submit", values)
}
const formik = useFormik({
    initialValues:{
        content:"",
        image:"",
        twitId: item?.id
    },
    onSubmit:handleSubmit
})

const handleSelectImage = (event) => {
    setUploadingImage(true);
    const imgUrl = event.target.files[0];
    formik.setFieldValue("image", imgUrl);
    setSelectedImage(imgUrl);
    setUploadingImage(false);
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
    <div className="flex space-x-5">
        <Avatar
            onClick={() => navigate(`/profile/${item?.user.id}`)}
            className="cursor-pointer"
            alt="username"
            src={auth?.user?.image}
        />
        <div className="flex cursor-pointer items-center space-x-2">
            <span className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis max-w-xs">
                {auth?.user?.fullName}
            </span>
            <span className="text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis max-w-xs">
                @{auth?.user?.fullName.split(" ").join("_").toLowerCase()} . 2m
            </span>
            <VerifiedIcon className="text-blue-500" sx={{ fontSize: 'inherit' }} />
        </div>
    </div>

    <section className="py-2"> {/* Reduced padding to py-2 */}
        <div className="flex space-x-5">
            <div className="w-full">
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4"> {/* Added margin-bottom to input field */}
                        <input
                            type="text"
                            name="content"
                            placeholder="Post your reply"
                            className="border-none outline-none text-xl bg-transparent w-full"
                            {...formik.getFieldProps("content")}
                        />
                        {formik.errors.content && formik.touched.content && (
                            <span className="text-red-500">{formik.errors.content}</span>
                        )}
                    </div>

                    <div className="flex justify-between items-center mt-2"> {/* Reduced margin-top */}
                        <div className="flex space-x-5 items-center">
                            <label className="flex space-x-5 items-center cursor-pointer">
                                <ImageIcon className="text-[#1d9bf0]" />
                                <input type="file" name="imageFile" className="hidden" onChange={handleSelectImage} />
                            </label>
                            <FmdGoodIcon className="text-[#1d9bf0] cursor-pointer" />
                            <TagFacesIcon className="text-[#1d9bf0] cursor-pointer" />
                        </div>
                        <div>
                            <Button
                                type="submit"
                                sx={{
                                    borderRadius: "20px",
                                    paddingY: "8px",
                                    paddingX: "20px",
                                    bgcolor: "#1e88e5",
                                }}
                                variant="contained"
                            >
                                Reply
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
</Box>

      </Modal>
    </div>
  );
}
