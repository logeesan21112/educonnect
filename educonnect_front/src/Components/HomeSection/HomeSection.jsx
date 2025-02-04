import { Avatar, Button } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import ImageIcon from '@mui/icons-material/Image';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import TweetCard from './TweetCard';
import { useDispatch, useSelector } from 'react-redux';
import { createTweet, getAllTweets } from '../../Store/Twit/Action';
import { uploadToCloudnary } from '../../Utils/uploadToCloudnary';

const validationSchema = Yup.object().shape({
    content: Yup.string().required("Tweet text is required")
});

const HomeSection = ({ item }) => {
    const [uploadingImage, setUploadingImage] = useState(false);
    const [selectImage, setSelectedImage] = useState("");
    const dispatch=useDispatch();
    const {twit}=useSelector(store=>store);
    const { twits } = useSelector((store) => store.twit);
    const {auth} = useSelector(store=>store)

    console.log("twit",twit)

    const handleSubmit = (values, actions) => {
        dispatch(createTweet(values))
        actions.resetForm()
        console.log("values", values);
        setSelectedImage("")
    };

    useEffect(() => {
        dispatch(getAllTweets());
    }, [twit.like, twit.retwit]);
    

    
    const formik = useFormik({
        initialValues: {
            content: "",
            image: "",
            isTweet:true
        },
        onSubmit: handleSubmit,
        validationSchema,
    });

    const handleSelectImage = async(event) => {
        setUploadingImage(true);
        const imgUrl = await uploadToCloudnary(event.target.files[0])
        formik.setFieldValue("image", imgUrl);
        setSelectedImage(imgUrl);
        setUploadingImage(false);
    };

    return (
        <div className="space-y-5">
            <section>
                <h1 className="py-5 text-xl font-bold opacity-90">Home</h1>
            </section>
            <section className="pb-10">
                <div className="flex space-x-5">
                    <Avatar
                        alt="username"
                        src={auth.user?.image}
                    />
                    <div className="w-full">
                        <form onSubmit={formik.handleSubmit}>
                            <div>
                                <input
                                    type="text"
                                    name="content"
                                    placeholder="What's happening?"
                                    className="border-none outline-none text-xl bg-transparent w-full"
                                    {...formik.getFieldProps("content")}
                                />
                                {formik.errors.content && formik.touched.content && (
                                    <span className="text-red-500">{formik.errors.content}</span>
                                )}
                            </div>
                            {/* 
                                <div>
                                    <img src="" alt=""/>
                                </div>
                            */}
                            <div className="flex justify-between items-center mt-5">
                                <div className="flex space-x-5 items-center">
                                    <label className="flex space-x-5 items-center">
                                        <ImageIcon className="text-[#1d9bf0] cursor-pointer" />
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
                                        Connect
                                    </Button>
                                </div>
                            </div>
                        </form>
                        <div className="mt-4">
    {selectImage && <img src={selectImage} alt="" />}
</div>

                    </div>
                </div>
            </section>
            <section>
                {twit.twits.map((item)=> <TweetCard item={item}/>)}
            </section>
        </div>
    );
};

export default HomeSection;


