import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import icon from '../../images/Logo.png';
import { scroller } from 'react-scroll';

const TopBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const scrollToSection = (section) => {
        scroller.scrollTo(section, {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart',
        });
    };

    const handleClick = (section) => {
        const targetPage = '/'; // Replace with your actual path

        if (location.pathname === targetPage) {
            scrollToSection(section);
        } else {
            navigate(`${targetPage}#${section}`);
           
            setTimeout(() => {
              scrollToSection(section);
          }, 100);
          
            
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            p={2}
            sx={{
                background: "linear-gradient(to right, #DEE0E3, #7A7B7D)",
            }}
        >
            <Box>
                <Box display="flex" alignItems="center">
                    <img
                        alt="rms-icon"
                        width="50px"
                        height="48px"
                        src={icon}
                        style={{ borderRadius: "10%" }}
                    />
                    <Typography variant="h5" fontWeight="500" sx={{ m: "0 0 5px 15px" }}>
                        <span>PetAi</span>
                        <span style={{ color: "white" }}>Care</span>
                    </Typography>
                </Box>
            </Box>
            <Box display="flex" justifyContent={'space-between'}>
                <IconButton onClick={() => handleClick('dashboard')}>
                    <Typography color='black'>Home</Typography>
                </IconButton>
                <IconButton onClick={() => handleClick('about-us')}>
                    <Typography color='black'>About Us</Typography>
                </IconButton>
                <IconButton onClick={() => handleClick('our-service')}>
                    <Typography color='black'>Our Service</Typography>
                </IconButton>
                <IconButton onClick={() => handleClick('feedback')}>
                    <Typography color='black'>Feedback</Typography>
                </IconButton>
                <IconButton onClick={() => handleClick('contact-us')}>
                    <Typography color='black'>Contact Us</Typography>
                </IconButton>
            </Box>
        </Box>
    );
}

export default TopBar;
