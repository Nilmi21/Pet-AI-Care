import { Box, Divider, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      p={5}
      sx={{
        height: "25vh",
        backgroundColor: "#2d3559",
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "row", alignItems: "flex-start" }}
      >
        <Box
          ml={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "450px",
          }}
        >
          <Typography variant="h4" color="gray">
            Get In Touch
          </Typography>
          <Divider sx={{ width: "100%", borderColor: "white" }} />
          <Typography variant="h6" color="white" sx={{ textAlign: "left" }}>
            The website footer drives conversions by providing calls to action,
            special offers, and links to crucial conversion pages such as
            product.
          </Typography>
        </Box>
        <Box
          ml={20}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "200px",
          }}
        >
            <Typography variant="h4" color="gray"> Contact Us</Typography>
          <Typography variant="h6" color="white" sx={{ textAlign: "left" }}>
           
          Sri lanka
            <br/>
            asdns@sd.com 
            <br />
            011*******
            <br />
            071*******
          </Typography>
        </Box>
        <Box
          ml={20}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "200px",
          }}
        >
            <Typography variant="h4" color="gray"> Contact Us</Typography>
          <Typography variant="h6" color="white" sx={{ textAlign: "left" }}>
            Sri lanka
            <br/>
            asdns@sd.com 
            <br />
            011*******
            <br />
            071*******
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
