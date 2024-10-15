import React, { useEffect, useState } from "react";
import { Box, Button, Typography, useMediaQuery, ThemeProvider, createTheme, Card, CardContent, } from "@mui/material";
import { Element } from "react-scroll";
import dashboard from "../../images/dashboard.png";
import aboutUs from "../../images/aboutUs.png";
import aboutUs2 from "../../images/aboutUs2.png";
import '../../css/card.css';
import image0 from "../../images/image0.png";
import image1 from "../../images/image1.png";
import image2 from "../../images/image2.png";
import '@fontsource/mansalva';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import axios from "axios";

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <>
      {Array.from({ length: fullStars }).map((_, i) => (
        <StarIcon key={`full-${i}`} sx={{ color: "gold" }} />
      ))}
      {halfStar && <StarHalfIcon sx={{ color: "gold" }} />}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <StarBorderIcon key={`empty-${i}`} sx={{ color: "gold"  }} />
      ))}
    </>
  );
};

const theme = createTheme();
const cardData = [
  {
    name: 'Symptom checker',
    image: image0,
    description: 'Quickly identify potential health concerns in your pet by entering.'
  },
  {
    name: 'Disease prediction',
    image: image1,
    description: 'pet ailments based on symptoms and risk factors to stay proactive about their health.'
  },
  {
    name: 'Image Symptom Checker',
    image: image2,
    description: 'Upload images of your pet\'s symptoms for accurate early disease detection.'
  }
];

const Dashboard = () => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const isLargeScreen = useMediaQuery(theme.breakpoints.up("xl"));
    const [feedbacks,setFeedbacks] = useState([]);

    const [hoveredCard, setHoveredCard] = useState(null);

    const handleMouseEnter = (index) => {
      setHoveredCard(index);
    };
    
    const handleMouseLeave = () => {
      setHoveredCard(null);
    };

    const handleClick = () =>{
      window.location.href = "/upload";
    }

    useEffect(()=>{
      getfeedbacks();
    },[]);
    async function getfeedbacks(){
      try {
        axios.get("http://localhost:3001/feedback/get")
        .then((response)=>{
          setFeedbacks(response.data);
          
        })
      } catch (error) {
        
      }
    }
    

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Element name="dashboard">
          <Box
            sx={{
              background: "linear-gradient(to right, #DEE0E3, #7A7B7D)",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              // flexDirection: isSmallScreen ? "column" : "row",
              // textAlign: isSmallScreen ? "center" : "left",
            }}
          >
            <Box display="flex" justifyContent="flex-start">
              <img
                alt="rms-icon"
                width={isLargeScreen ? "1200px" : "800px"}
                height={isLargeScreen ? "1300px" :"900px"}
                src={dashboard}
                style={{ borderRadius: "10%" }}
              />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems={isSmallScreen ? "center" : "flex-start"}
              sx={{ padding: isSmallScreen ? "20px" : "0" }}
            >
              <Typography variant={isSmallScreen ? "h3" : "h2"}sx={{ fontFamily: "Mansalva, IM FELL Great Primer SC" }}>
                Love your Pets
              </Typography>
              <Typography variant={isSmallScreen ? "h3" : "h2"}sx={{ fontFamily: "Mansalva, IM FELL Great Primer SC" }} color="white">
                Give Them Care...
              </Typography>
              <Button
                variant="contained"
                style={{ backgroundColor: "#313242", margin: "80px" }}
                onClick={handleClick}
                
              >
                <Typography variant="h5"  >Get Started</Typography>
              </Button>
            </Box>
          </Box>
        </Element>
        <Element name="about-us">
          <Box
            sx={{
              height: "120vh",
              display: "flex",
              alignItems: "center",
              backgroundColor: "#FFFFFF",
              flexDirection: isSmallScreen ? "column" : "row",
              textAlign: isSmallScreen ? "center" : "left",
            }}
          >
            <Box
              display="flex"
              sx={{
                marginLeft: isSmallScreen ? "0" : "150px",
                marginTop: isSmallScreen ? "20px" : "150px",
                position: "relative",
              }}
            >
              <Box sx={{ position: "absolute", top: 0, left: 0 }}>
                <img
                  alt="background-image"
                  width={isLargeScreen ? "800px" : "400px"}
                  height={isLargeScreen ? "850px" : "450px"}
                  // width={isSmallScreen ? "100%" : "400px"}
                  // height={isSmallScreen ? "auto" : "450px"}
                  src={aboutUs2}
                  style={{ borderRadius: "10%", filter: "blur(5px)" }}
                />
              </Box>
              <Box sx={{ position: "relative" }}>
                <img
                  alt="rms-icon"
                  width={isLargeScreen ? "800px" : "400px"}
                  height={isLargeScreen ? "850px" : "450px"}
                  src={aboutUs}
                  style={{ borderRadius: "10%" }}
                />
              </Box>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-end" // Align the entire Box to the left
              sx={{
                padding: isSmallScreen ? "20px" : "150px",
                height: "100%",
                width: "100%",
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  padding: isSmallScreen ? "20px" : "200",
                  width: 600,
                }}
                mt={20}
              >
                <Typography
                  variant={isSmallScreen ? "h4" : "h2"}
                  textAlign="left"
                  width="100%"
                  sx={{ fontFamily: "Mansalva, IM FELL Great Primer SC" }}
                >
                  About US
                </Typography>

                <Typography
                  variant={isSmallScreen ? "body1" : "h6"}
                  // sx={{
                  //   fontFamily:
                  //     "'Edu Australia VIC WA NT Hand Guides', Mansalva, 'IM FELL Great Primer SC'",
                  // }}
                  textAlign="left"
                  width="100%"
                  p={10}
                >
                  Welcome to Early Disease Detection and Diagnosis for Pets,
                  where cutting-edge technology meets compassionate care. At
                  PetAI Care, we are dedicated to revolutionizing pet healthcare
                  through advanced artificial intelligence.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Element>
        <Element name="our-service">
          <Box
            sx={{
              height: "70vh",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#FFFFFF",
            }}
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="center"
              sx={{
                padding: isSmallScreen ? "20px" : "200",
                width: 600,
              }}
            >
              <Typography
                variant={isSmallScreen ? "h4" : "h2"}
                textAlign="center"
                width="100%"
                sx={{ fontFamily: "Mansalva, IM FELL Great Primer SC" }}
              >
                Our Service
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection={isSmallScreen ? "column" : "row"}
              justifyContent="space-around"
              alignItems="center"
              width="100%"
              mt={4}
            >
              {cardData.map((card, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: 2,
                  }}
                >
                  <Typography
                    variant="h5"
                    component="div"
                    textAlign="center"
                    sx={{
                      marginBottom: 1,
                      fontFamily:
                        "'Edu Australia VIC WA NT Hand Guides', Mansalva, 'IM FELL Great Primer SC'",
                    }}
                  >
                    {card.name}
                  </Typography>
                  <Card
                    className={`card ${hoveredCard === index ? "hover" : ""}`}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    sx={{
                      width: 275,
                      height: 275,
                      borderRadius: "50%",
                      position: "relative", // Ensure correct positioning for rotation
                      perspective: "1000px", // Create 3D perspective
                    }}
                  >
                    <div className="card-inner">
                      <div
                        className="card-front"
                        style={{
                          backgroundImage: `url(${card.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          textShadow: "1px 1px 2px black",
                        }}
                      >
                        <CardContent>
                          {/* You can add content here if needed */}
                        </CardContent>
                      </div>
                      <div className="card-back">
                        <CardContent>
                          <Typography
                            variant="h5"
                            component="div"
                            textAlign="center"
                            // sx={{
                            //   fontFamily:
                            //     "'Edu Australia VIC WA NT Hand Guides', Mansalva, 'IM FELL Great Primer SC'",
                            // }}
                          >
                            {card.description}
                          </Typography>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                </Box>
              ))}
            </Box>
          </Box>
        </Element>
        <Element name="feedback">
          <Box
            sx={{
              height: "50vh",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#f0f8ff",
              marginTop:isLargeScreen?0:10,
              marginBottom:isLargeScreen?0:10
            }}
          >
            <Typography
              mt={6}
              variant={isSmallScreen ? "h4" : "h2"}
              textAlign="center"
              width="100%"
              sx={{ fontFamily: "Mansalva, IM FELL Great Primer SC" }}
            >
              Feedbacks
            </Typography>
            <Box
              mt={4}
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 5,
              }}
            >
              {feedbacks.map((feedback, index) => (
                <Card key={index} sx={{ marginBottom: 2, width: "200px" }}>
                  <CardContent>
                    <Box display="flex" alignItems="flex-start" mt={2}>
                      <Typography
                        variant="body1"
                        sx={{ textTransform: "uppercase" }}
                      >
                        <strong>{feedback.name}</strong>
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mt={2}>
                      {renderStars(feedback.rating)}
                    </Box>
                    <Box display="flex" alignItems="center" mt={2}>
                      <Typography variant="body1">
                        {feedback.feedback}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </Element>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
