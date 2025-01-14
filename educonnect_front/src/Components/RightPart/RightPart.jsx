import React, { useState, useEffect } from 'react'; 
import SearchIcon from '@mui/icons-material/Search';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { Button } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SubscriptionModal from '../SubscriptionModal/SubscriptionModal';

const RightPart = () => {
    const [openSubscriptionModal, setOpenSubscriptionModal] = React.useState(false);
    const [currentAdIndex, setCurrentAdIndex] = useState(0);  // Declare state correctly for currentAdIndex
    
    const handleOpenSubscriptionModal = () => setOpenSubscriptionModal(true);
    const handleCloseSubscriptionModal = () => setOpenSubscriptionModal(false);

    const handleChangeTheam = () => {
        console.log("handle change theme");
    };

    const ads = [
        'https://i.pinimg.com/736x/45/e7/ab/45e7ab719f8f6d04cff6e91bcd32d368.jpg',  // Online image
        'https://i.pinimg.com/736x/31/9d/31/319d3106319075e16bfdb9404c9e23de.jpg',  // Online image
        '/images/food creative add.jpeg',  // Local image in public/images
    ];
    

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);  // Update currentAdIndex correctly
        }, 3000); // Change ad every 3 seconds

        return () => clearInterval(interval); // Cleanup the interval on unmount
    }, []);

    return (
        <div className="py-5 sticky top">
            <div className="relative flex items-center">
                <input type="text" className="py-3 rounded-full text-gray-500 w-full pl-12" />
                <div className="absolute top-0 left-0 pl-3 pt-3">
                    <SearchIcon className="text-gray-500" />
                </div>
                <Brightness4Icon className="ml-3 cursor-pointer" onClick={handleChangeTheam} />
            </div>
            <section className="my-5">
                <h1 className="text-xl font-bold">Get Verified</h1>
                <h1 className="font-bold my-2">Subscribe to unlock new Features</h1>
                <Button
                    variant="contained"
                    sx={{ padding: "10px", paddingX: "20px", borderRadius: "25px" }}
                    onClick={handleOpenSubscriptionModal}
                >
                    Get Verified
                </Button>
            </section>
            <div className="my-4">
        <hr className="border-t border-gray-300" />  {/* Adds a horizontal line */}
    </div>
            <section className="mt-7 space-y-5">
                <h1 className="font-bold text-xl py-1">What's happening</h1>
                <div>
                    <p className="text-sm">FOTSS Faculty of Technology Studies Sports Meet. Live</p>
                    <p className="font-bold">3rd Year vs 4th Year. Cricket</p>
                </div>
                {[1, 1, 1].map((item) => (
                    <div className="flex justify-between w-full" key={item}>
                        <div>
                        <p>Starlink's Entry into Sri Lanka</p>
<p className="font-bold">#IEEE Publication</p>
<p>34.3k Connects</p>

                        </div>
                        <MoreHorizIcon />
                    </div>
                ))}
            </section>
            <section>
                <SubscriptionModal open={openSubscriptionModal} handleClose={handleCloseSubscriptionModal} />
            </section>
            <div className="my-4">
        <hr className="border-t border-gray-300" />  {/* Adds a horizontal line */}
    </div>

            {/* Advertisement Slideshow Section */}
            <section className="mt-7">
    <h1 className="text-xl font-bold mb-4">Ads.</h1>
    <div className="w-full bg-gray-100 overflow-hidden">
        <img
            src={ads[currentAdIndex]}  // Use currentAdIndex to display the current ad
            alt={`Advertisement ${currentAdIndex + 1}`}
            style={{
                width: '100%',  // Adjust width to 100% of the container
                height: 'auto', // Adjust height automatically to maintain aspect ratio
                objectFit: 'contain' // Ensure the entire image is visible
            }}
        />
    </div>
</section>

        </div>
    );
};

export default RightPart;
