import React, { useEffect, useState } from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, Box, Button, Tab } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import TweetCard from '../HomeSection/TweetCard';
import ProfileModal from './ProfileModal';
import { useDispatch, useSelector } from 'react-redux';
import { findUserById, followUserAction } from '../../Store/Auth/Action';
import { getUsersTweets } from '../../Store/Twit/Action';

const Profile = () => {
    const [tabValue, setTabValue] = useState("1");
    const navigate = useNavigate();
    const [openProfileModel, setOpenProfileModal] = useState(false);
    const { auth, twit } = useSelector(store => store);
    const dispatch = useDispatch();
    const { id } = useParams();

    const handleBack = () => navigate(-1);

    const handleFollowUser = () => {
        dispatch(followUserAction(id))
        console.log("follow user");
    }

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
        if (newValue === "4") {
            console.log("likes twit");
        } else if (newValue === "1") {
            console.log("users twits");
        }
    }

    useEffect(() => {
        dispatch(findUserById(id));
        dispatch(getUsersTweets(id));
    }, [id, dispatch]);

    const handleClose = () => {
        setOpenProfileModal(false);
        dispatch(findUserById(id)); // Re-fetch user data after editing
    };

    return (
        <div>
            <section className={"bg-white z-50 flex items-center sticky top-0 bg-opacity-95"}>
                <KeyboardBackspaceIcon className="cursor-pointer" onClick={handleBack} />
                <h1 className="py-5 text-x1 font-bold opacity-90 ml-5">{auth.findUser?.fullName}</h1>
            </section>
            {/*<section>
                <img className="w-[100%] h-[15rem] object-cover" src="https://cdn.pixabay.com/photo/2022/01/13/00/09/austria-6934186_1280.jpg" alt=""/>
            </section>*/}

<section>
    <img
        className="w-full h-[15rem] object-cover"
        src={auth.findUser?.backgroundImage || "https://cdn.pixabay.com/photo/2022/01/13/00/09/austria-6934186_1280.jpg"}
        alt="Cover Photo"
    />
</section>


            <section className="pl-6">
                <div className="flex justify-between items-start mt-5 h-[5rem]">
                    <Avatar 
                        className="transform -translate-y-24"
                        alt={auth.findUser?.fullName}
                        src={auth.findUser?.image}
                        sx={{ width: "10rem", height: "10rem", border: "4px solid white" }}
                    />

                    {auth.findUser?.req_user ? (
                        <Button onClick={() => setOpenProfileModal(true)}
                            variant="contained" sx={{ borderRadius: "20px" }}>
                            Edit Profile
                        </Button>
                    ) : (
                        <Button onClick={handleFollowUser}
                            variant="contained" sx={{ borderRadius: "20px" }}>
                            {auth.findUser?.followed? "Unfollow" : "Follow"}
                        </Button>
                    )}
                </div>
                <div>
                    <div className="flex items-center">
                        <h1 className="font-bold text-lg">{auth.findUser?.fullName}</h1>
                        {auth.findUser?.verified && (
                            <VerifiedIcon className="text-blue-500" sx={{ fontSize: 'inherit' }} />
                        )}
                    </div>
                    <h1 className="text-gray-500">@{auth.findUser?.fullName.split(" ").join("_").toLowerCase()}</h1>
                </div>
                <div className="mt-2 space-y-3">
                    <p>{auth.findUser?.bio}</p>
                    <div className="py-1 flex space-x-5">
                        <div className="flex items-center text-gray-500">
                            <BusinessCenterIcon />
                            <p className="ml-2">Education</p>
                        </div>
                        <div className="flex items-center text-gray-500">
    <LocationOnIcon />
    <p className="ml-2">{auth.findUser?.location || "Sri Lanka"}</p>
</div>

<div className="flex items-center text-gray-500">
    <CalendarMonthIcon />
    <p className="ml-2">
        {auth.user?.birthDate ? `Born on ${new Date(auth.user.birthDate).toLocaleString('en-US', { year: 'numeric', month: 'short' })}` : 'No birthdate'}
    </p>
</div>


                    </div>
                    <div className="flex items-center space-x-5">
                        <div className="flex items-center space-x-1">
                            <span>{auth.findUser?.following?.length}</span>
                            <span className="text-gray-500">Following</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <span>{auth.findUser?.followers?.length}</span>
                            <span className="text-gray-500">Followers</span>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-5">
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={tabValue}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                                <Tab label="Tweets" value="1" />
                                <Tab label="Replies" value="2" />
                                <Tab label="Media" value="3" />
                                <Tab label="Likes" value="4" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            {twit.twits.map((item) => <TweetCard item={item} />)}
                        </TabPanel>
                        <TabPanel value="2">User replies</TabPanel>
                        <TabPanel value="3">Media</TabPanel>
                        <TabPanel value="4">Likes</TabPanel>
                    </TabContext>
                </Box>
            </section>
            <section>
                <ProfileModal handleClose={handleClose} open={openProfileModel} />
            </section>
        </div>
    );
}

export default Profile;
