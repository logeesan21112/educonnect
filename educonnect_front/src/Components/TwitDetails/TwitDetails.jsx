import React, { useEffect } from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate, useParams } from 'react-router-dom';
import TweetCard from '../HomeSection/TweetCard';
import { Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { findTwitsById } from '../../Store/Twit/Action';

const TwitDetails = () => {
    const navigate = useNavigate();
    const handleBack = () => navigate(-1);
    const dispatch = useDispatch();
    const { id } = useParams();
    const twit = useSelector(store => store.twit || { twit: null }); // Add a fallback

    useEffect(() => {
        if (id) {
            dispatch(findTwitsById(id));
        }
    }, [id, dispatch]);

    // Check if twit and twit.twit are defined
    if (!twit || !twit.twit) {
        return <div>Loading...</div>; // Display a loading message
    }

    return (
        <React.Fragment>
            <section className={"bg-white z-50 flex items-center sticky top-0 bg-opacity-95"}>
                <KeyboardBackspaceIcon
                    className="cursor-pointer"
                    onClick={handleBack}
                />
                <h1 className="py-5 text-xl font-bold opacity-90 ml-5">
                    Connect
                </h1>
            </section>
            <section>
                <TweetCard item={twit.twit} /> {/* Pass the twit item */}
                <Divider sx={{ margin: "2rem 0rem" }} />
            </section>
            <section>
                {twit.twit?.replyTwits && twit.twit.replyTwits.length > 0 ? (
                    twit.twit.replyTwits.map((item, index) => (
                        <TweetCard key={index} item={item} /> // Ensure unique key
                    ))
                ) : (
                    <div>No replies yet.</div> // Message if no replies
                )}
            </section>
        </React.Fragment>
    );
};

export default TwitDetails;
