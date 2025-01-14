import React, { useState } from 'react';
import RepeatIcon from '@mui/icons-material/Repeat';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VerifiedIcon from '@mui/icons-material/Verified';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import BarChartIcon from '@mui/icons-material/BarChart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FavoriteOutlined } from '@mui/icons-material';
import ReplayModal from './ReplayModal';
import { useDispatch } from 'react-redux';
import { createReTweet, likeTweet, deleteTweet } from '../../Store/Twit/Action';

const TweetCard = ({ item }) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [openReplayModel, setOpenReplayModal] = useState(false);
    const dispatch = useDispatch();

    const handleOpenReplayModel = () => setOpenReplayModal(true);
    const handleCloseReplayModal = () => setOpenReplayModal(false);
    
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleDeleteTweet = () => {
        dispatch(deleteTweet(item?.id));  // Dispatch the delete action
        console.log("Delete tweet");
        handleClose();  // Close the menu
    };

    const handleCreateRetweet = () => {
        dispatch(createReTweet(item?.id));
        console.log("Handle create retweet");
    };

    const handleLikeTweet = () => {
        dispatch(likeTweet(item?.id));
        console.log("Handle like tweet");
    };

    return (
        <React.Fragment>
            <div className="flex space-x-5">
                <Avatar
                    onClick={() => navigate(`/profile/${item?.user.id}`)}
                    className="cursor-pointer"
                    alt="username"
                    src={item?.user?.image}
                />
                <div className="w-full">
                    <div className="flex justify-between items-center">
                        <div className="flex cursor-pointer items-center space-x-2">
                            <span className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis max-w-xs">
                                {item?.user?.fullName}
                            </span>
                            <span className="text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis max-w-xs">
                                @{item?.user?.fullName.split(" ").join("_").toLowerCase()} . 2m
                            </span>
                            <VerifiedIcon className="text-blue-500" sx={{ fontSize: 'inherit' }} />
                        </div>
                        <div>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <MoreHorizIcon />
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleDeleteTweet}>Delete</MenuItem>
                                <MenuItem onClick={handleDeleteTweet}>Edit</MenuItem>
                            </Menu>
                        </div>
                    </div>

                    <div className="mt-2">
                        <div onClick={() => navigate(`/twit/${item?.id}`)} className="cursor-pointer">
                            <p className="mb-2 p-0">{item?.content}</p>
                            {item?.image && <img className="w-[28rem] border order-gray-400 p-5 rounded-md" src={item?.image} alt="" />}
                        </div>
                        <div className="py-5 flex flex-wrap justify-between items-center">
                            <div className="space-x-3 flex items-center text-grey-600">
                                <ChatBubbleOutlineIcon className="cursor-pointer" onClick={handleOpenReplayModel} />
                                <p>{item?.totalReplies}</p>
                            </div>
                            <div className={`${item?.retwit ? "text-pink-600" : "text-gray-600"} space-x-3 flex items-center`}>
                                <RepeatIcon onClick={handleCreateRetweet} className="cursor-pointer" />
                                <p>{item?.totalRetweets}</p>
                            </div>
                            <div className={`${item?.liked ? "text-pink-600" : "text-gray-600"} space-x-3 flex items-center`}>
                                {item?.liked ? (
                                    <FavoriteOutlined onClick={handleLikeTweet} className="cursor-pointer" />
                                ) : (
                                    <FavoriteIcon onClick={handleLikeTweet} className="cursor-pointer" />
                                )}
                                <p>{item?.totalLikes}</p>
                            </div>
                            <div className="space-x-3 flex items-center text-grey-600">
                                <BarChartIcon className="cursor-pointer" onClick={handleOpenReplayModel} />
                                <p>430</p>
                            </div>
                            <div className="space-x-3 flex items-center text-grey-600">
                                <FileUploadIcon className="cursor-pointer" onClick={handleOpenReplayModel} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ReplayModal item={item} open={openReplayModel} handleClose={handleCloseReplayModal} />
        </React.Fragment>
    );
};

export default TweetCard;
