import React from 'react';
import { navigationMenu } from './NavigationMenu';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Store/Auth/Action';

const Navigation = () => {
    const { auth } = useSelector((store) => store);  // Accessing user info from the Redux store
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);  // Set the menu anchor element
    };

    const handleClose = () => {
        setAnchorEl(null);  // Close the menu
    };

    const handleLogout = () => {
        handleClose();
        dispatch(logout());  // Dispatch logout action
    };

    return (
        <div className="h-screen sticky top-0">
            <div>
                {/* Logo Section */}
                <div className="py-5 flex items-center space-x-2">
                    <img
                        src="images/Blue and White Vintage School Logo.png"
                        alt="EduConnect Logo"
                        className="h-16 w-auto"
                    />
                    <span className="text-lg font-bold">EduConnect</span>
                </div>

                {/* Navigation Menu */}
                <div className="space-y-6">
                    {navigationMenu.map((item) => (
                        <div
                            key={item.title}
                            className="cursor-pointer flex space-x-3 items-center"
                            onClick={() =>
                                item.title === 'Profile'
                                    ? navigate(`/profile/${auth.user?.id}`)
                                    : navigate(item.path)
                            }
                        >
                            {item.icon}
                            <p>{item.title}</p>
                        </div>
                    ))}
                </div>

                {/* Connect Button */}
                <div className="py-10">
                    <Button
                        sx={{
                            width: '80%',
                            borderRadius: '29px',
                            py: '12px',
                            bgcolor: '#1e88e5',
                        }}
                        variant="contained"
                    >
                        Connect
                    </Button>
                </div>
            </div>

            {/* User Info and Dropdown */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    {/* Avatar and User Info */}
                    <Avatar
                        onClick={() => navigate(`/profile/${auth.user?.id}`)}
                        className="cursor-pointer"
                        alt="username"
                        src={auth.user?.image}
                    />
                    <div>
                        <span className="whitespace-nowrap block">{auth.user?.fullName}</span>
                        <span className="opacity-70 block">@{auth.user?.fullName.split(' ').join('_').toLowerCase()}</span>
                    </div>

                    {/* More Options Dropdown */}
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
                        <MenuItem onClick={handleLogout} sx={{ color: '#000' }}>
                            Logout
                        </MenuItem>
                    </Menu>
                </div>
            </div>
        </div>
    );
};

export default Navigation;
