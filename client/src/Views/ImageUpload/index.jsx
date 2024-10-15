import {
  Box,
  Button,
  useMediaQuery,
  ThemeProvider,
  createTheme,
  Typography,
  Autocomplete,
  TextField,
  Tooltip,
  CircularProgress,
  Backdrop,
  Dialog,
  DialogTitle,
  DialogContent, 
  DialogActions, 
  Rating
} from "@mui/material";
import React, { useEffect, useState } from "react";
import a from "../../images/uplaodPage.png";
import back from "../../images/back.png";
import Uploader from "../../Common/FileUploader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const theme = createTheme();

const Upload = () => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("xl"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "xl"));
  const [result, setResult] = useState(null);
  const [skinDiseases, setSkinDiseases] = useState(null);
  const [identifyImg, setIdentifyImg] = useState(null);
  const [predictImg, setPredictImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [diseaseType, setDiseaseType] = useState(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [error, seterror] = useState(false);
  const [diseases, setDisease] = useState(null);
  const [open, setOpen] = useState(false);
  const [name,setName] =useState('');
  const [email,setEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  const handleSubmitFeedback = () => {
    if (diseaseType) {
       try {
          axios.post("http://localhost:3001/feedback/submit", {
            name: name,
            email: email,
            diseases: diseases?diseases:diseaseDetails?diseaseDetails:"",
            diseaseType:diseaseType,
            rating: rating,
            feedback: feedback
          })
        .then((response) => {
          console.log(response.status);
          
          if(response.status === 201){
            let timerInterval;
            Swal.fire({
              title: "Feedback saved Successful",
              text: "Thank you for you Feedback",
              icon: "success",
              timer:1500,
              timerProgressBar:true,
              didOpen:()=>{
              Swal.showLoading();
              },
              willClose:()=>{
                clearInterval(timerInterval);
              }
            }).then((result)=>{
              if(result.dismiss===Swal.DismissReason.timer){

              }
            });
          }
        })
       } catch (error) {
        
       }


    }

    setOpen(false);
  };

  const handleChange = (event, value) => {
    if (value.length <= 7) {
      seterror(false);

      setSelectedSymptoms(value);
    } else {
      seterror(true);
    }
  };

  const options = ["Dog", "Cat"];

  const diseasesjson = {
    diseases: [
      {
        name: "Flea Allergy",
        description:
          "Flea allergy dermatitis is a hypersensitivity to flea bites, particularly to flea saliva. This causes intense itching and inflammation.",
      },
      {
        name: "Hotspot",
        description:
          "Hotspots, or acute moist dermatitis, are areas of the skin that become inflamed, infected, and moist due to excessive scratching or licking.",
      },
      {
        name: "Mange",
        description:
          "Mange is a skin disease caused by mites. The two main types are sarcoptic mange (scabies) and demodectic mange.",
      },
      {
        name: "Ringworm",
        description:
          "Ringworm is a fungal infection that affects the skin, hair, and nails. It's highly contagious and can spread to other animals and humans.",
      },
    ],
  };

  const symptoms = [
    "Fever",
    "Nasal Discharge",
    "Loss of appetite",
    "Weight Loss",
    "Lameness",
    "Breathing Difficulty",
    "Swollen Lymph nodes",
    "Lethargy",
    "Depression",
    "Coughing",
    "Diarrhea",
    "Seizures",
    "Vomiting",
    "Eating less than usual",
    "Excessive Salivation",
    "Redness around Eye area",
    "Severe Dehydration",
    "Pain",
    "Discomfort",
    "Sepsis",
    "WeightLoss",
    "Tender abdomen",
    "Increased drinking and urination",
    "Bloated Stomach",
    "Yellow gums",
    "Constipation",
    "Paralysis",
    "Wrinkled forehead",
    "Continuously erect and stiff ears",
    "Grinning appearance",
    "Stiff and hard tail",
    "Stiffness of muscles",
    "Acute blindness",
    "Blood in urine",
    "Hunger",
    "Cataracts",
    "Losing sight",
    "Glucose in urine",
    "Burping",
    "blood in stools",
    "Passing gases",
    "Eating grass",
    "Scratching",
    "Licking",
    "Itchy skin",
    "Redness of skin",
    "Face rubbing",
    "Loss of Fur",
    "Swelling of gum",
    "Redness of gum",
    "Receding gum",
    "Bleeding of gum",
    "Plaque",
    "Bad breath",
    "Tartar",
    "Lumps",
    "Swelling",
    "Red bumps",
    "Scabs",
    "Irritation",
    "Dry Skin",
    "Fur loss",
    "Red patches",
    "Heart Complication",
    "Weakness",
    "Aggression",
    "Pale gums",
    "Coma",
    "Collapse",
    "Abdominal pain",
    "Difficulty Urinating",
    "Dandruff",
    "Anorexia",
    "Blindness",
    "excess jaw tone",
    "Urine infection",
    "Lack of energy",
    "Smelly",
    "Neurological Disorders",
    "Eye Discharge",
    "Loss of Consciousness",
    "Enlarged Liver",
    "Purging",
    "Bloody discharge",
    "Wounds",
  ];

  const symtompsDisease = [
    {
      "name": "Tick fever",
      "description": "A disease transmitted by ticks, causing fever, lethargy, and loss of appetite in animals."
    },
    {
      "name": "Distemper",
      "description": "A contagious viral disease affecting dogs, characterized by fever, coughing, and neurological symptoms."
    },
    {
      "name": "Parvovirus",
      "description": "A highly contagious viral illness, often affecting puppies, leading to severe vomiting and diarrhea."
    },
    {
      "name": "Hepatitis",
      "description": "A viral infection in animals that affects the liver, causing fever, abdominal pain, and jaundice."
    },
    {
      "name": "Tetanus",
      "description": "A bacterial infection caused by Clostridium tetani, leading to muscle stiffness and spasms."
    },
    {
      "name": "Chronic kidney disease",
      "description": "A long-term condition where the kidneys gradually lose function, leading to increased thirst and weight loss."
    },
    {
      "name": "Diabetes",
      "description": "A metabolic disorder where the body is unable to regulate blood sugar, causing excessive thirst, urination, and weight loss."
    },
    {
      "name": "Gastrointestinal Disease",
      "description": "A group of disorders affecting the stomach and intestines, causing vomiting, diarrhea, and abdominal pain."
    },
    {
      "name": "Allergies",
      "description": "An immune response to allergens, resulting in itching, skin rashes, and respiratory issues."
    },
    {
      "name": "Gingivitis",
      "description": "Inflammation of the gums, causing redness, swelling, and bleeding, often due to poor oral hygiene."
    },
    {
      "name": "Cancers",
      "description": "Abnormal cell growths in various tissues and organs, potentially leading to tumors and organ dysfunction."
    },
    {
      "name": "Skin Rashes",
      "description": "Inflammatory skin conditions that cause redness, itching, and irritation."
    }
  ]
  
  const diseaseDetails = diseasesjson.diseases.find(
    (disease) => disease.name === skinDiseases?.label
  );
  const getDiseaseDetails = (diseaseName) => {
    return symtompsDisease.find((disease) => disease.name === diseaseName);
  };
  const getFontSize = () => {
    if (isLargeScreen) return "3rem";
    if (isMediumScreen) return "2rem";
    if (isSmallScreen) return "2rem";
    return "1rem";
  };

  const handleIdentifyImgUpload = (file) => {    
    setIdentifyImg(file);
  };

  const handlePredictImgUpload = (file) => { 
    setPredictImg(file);
  };
        const handleDiseasePredictSubmit = async () => {
      if (!selectedSymptoms.length) {
        alert("Please select symptoms.");
        return;
      }
    
      setLoading(true);
      const paddedValue = [
        ...selectedSymptoms,
        ...Array(7 - selectedSymptoms.length).fill("None"),
      ];
      const symptoms = paddedValue.join(",");    
      try {
        const response = await axios.post(
          "http://localhost:3001/model/diseasePredict",
          { symptoms: symptoms },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
    
        if (response.status === 200) {
          setLoading(false);    
          const data = response.data;
    
          if (Array.isArray(data) && data.every(item => typeof item === 'string')) {
            try {
              const parsedDiseases = data.map((prediction) => {    
                const cleanPrediction = prediction.trim();
    
                const [namePart, confidencePart] = cleanPrediction.split(' with confidence ');
                if (!namePart || !confidencePart) {
                  throw new Error(`Invalid format for prediction: ${prediction}`);
                }
    
                const name = namePart.split(': ')[1]?.trim(); 
                const confidence = parseFloat(confidencePart.trim()); 
    
                if (!name || isNaN(confidence)) {
                  throw new Error(`Failed to parse name or confidence for prediction: ${prediction}`);
                }
    
                return { name, confidence };
              });
    
              setDisease(parsedDiseases);
            } catch (error) {
              console.error('Error parsing predictions:', error.message);
            }
          } else {
            console.error('Error: response.data is not a valid array of strings');
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
  

  const handlePredictSubmit = async () => {
    if (!predictImg) {
      alert("Please select a file.");
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("image", predictImg);

    try {
      const response = await axios.post(
        "http://localhost:3001/model/skinpredict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        setLoading(false);
        setSkinDiseases(response.data);

      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleIdentifySubmit = async () => {
    if (!identifyImg) {
      alert("Please select a file.");
      return;
    }
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("image", identifyImg);

    try {
      const response = await axios.post(
        "http://localhost:3001/model/identify",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setLoading(false);
        setResult(response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        {loading && (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Box>
                <CircularProgress color="inherit" />
              </Box>
              <Box>
                <Typography>Loading....</Typography>
              </Box>
            </Box>
          </Backdrop>
        )}
      </Box>
      <Box>
        <Box
          sx={{
            background: "linear-gradient(to right, #DEE0E3, #7A7B7D)",
            height: "90vh",
            display: "flex",
            alignItems: "center",
            flexDirection: isSmallScreen ? "column" : "row",
            textAlign: isSmallScreen ? "center" : "left",
            position: "relative",
            paddingTop: isLargeScreen
              ? "80px"
              : isSmallScreen
              ? "30px"
              : "70px",
          }}
        >
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            sx={{ position: "relative", width: "100%" }}
          >
            <img
              alt="rms-icon"
              style={{ width: "100%", height: "auto" }}
              src={a}
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems={isSmallScreen ? "center" : "flex-start"}
            sx={{
              position: "absolute",
              top: "50%",
              left: isSmallScreen ? "50%" : "10%",
              transform: isSmallScreen
                ? "translate(-50%, -50%)"
                : "translateY(-50%)",
              textAlign: isSmallScreen ? "center" : "left",
              padding: isSmallScreen ? "20px" : "0",
            }}
          >
            <Typography
              variant="h2"
              color="white"
              sx={{
                fontFamily: "Covered By Your Grace, cursive",
                fontSize: getFontSize(),
                position: "relative",
              }}
            >
              “Upload images of your pet's<br></br> symptoms for accurate
              <br></br> in early disease detection."
            </Typography>
          </Box>
          {!result && (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems={isSmallScreen ? "center" : "center"}
              sx={{
                position: "absolute",
                top: "50%",
                width: isSmallScreen ? "80%" : "550px",
                right: isSmallScreen ? "50%" : "10%",
                transform: isSmallScreen
                  ? "translate(50%, -50%)"
                  : "translateY(-50%)",
                padding: isSmallScreen ? "20px" : "0",
              }}
            >
              <Uploader
                lablename={"Pet's Image"}
                handleFileUpload={handleIdentifyImgUpload}
                isImage={true}
              />
              <Tooltip title="Upload your Pet's Image for Identify">
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#313242", marginTop: "10px" }}
                  onClick={handleIdentifySubmit}
                >
                  <Typography variant="h5">Upload Pet's Image</Typography>
                </Button>
              </Tooltip>
            </Box>
          )}
        </Box>
      </Box>
      <Box
        gridTemplateColumns="repeat(2, minmax(0, 1fr))"
        sx={{
          height: "70vh",
          display: "flex",
          alignItems: "center",
          flexDirection: isSmallScreen ? "column" : "row",
          textAlign: isSmallScreen ? "center" : "left",
          padding: "100px",
        }}
      >
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          sx={{ position: "relative", gridColumn: "span 1" }}
          ml={isLargeScreen ? 30 : 20}
        >
          <Box position="relative">
            <img
              alt="rms-icon"
              style={{ width: "100%", height: "auto" }}
              src={back}
            />
            <Typography
              position="absolute"
              top={0}
              left={0}
              color="black"
              p={1}
              bgcolor="rgba(255, 255, 255, 0.4)"
              variant="h6"
            >
              Quickly identify potential health concerns in your pet by entering
              symptoms and risk factors to stay proactive about their health
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          flexDirection="column"
          sx={{ height: "60vh", width: "100%", gridColumn: "span 1", mt: -8 }}
        >
          <Autocomplete
            id="PetType"
            sx={{ width: "80%", p: "10px" }}
            options={options}
            value={options.find(option => option === result) || null} // Ensure valid value
            isOptionEqualToValue={(option, value) => option === value} // Customize equality test
            onChange={(event, newValue) => setResult(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Select Your Pet"
                color="primary"
              />
            )}
          />
          

          {result && (
            <Autocomplete
              id="DiseaseType"
              sx={{ width: "80%", p: "10px" }}
              options={["Skin Disease", "Disease"]}
              onChange={(event, newValue) => {
                setDiseaseType(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Disease Type"
                  color="primary"
                />
              )}
            />
          )}
          {diseaseType && diseaseType === "Disease" && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              sx={{
                position: "relative",
                height: "40vh",
                width: "100%",
                mt: 4,
              }}
              mt={isLargeScreen ? 30 : 15}
            >
              <Box mt={2} sx={{ height: "auto", width: "80%" }}>
                <Autocomplete
                  fullWidth
                  multiple
                  id="tags-outlined"
                  options={symptoms}
                  value={selectedSymptoms}
                  onChange={handleChange}
                  getOptionDisabled={() => selectedSymptoms.length >= 7}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Select Your Pet's Symptoms"
                      color="primary"
                      error={error}
                      helperText={error ? "Only 7 Symptoms are allowed" : ""}
                    />
                  )}
                />
              </Box>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#00b359",
                  width: "150px",
                  marginTop: "30px",
                }}
                onClick={handleDiseasePredictSubmit}
              >
                Upload
              </Button>
            </Box>
          )}
          {diseaseType && diseaseType === "Skin Disease" && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              sx={{
                position: "relative",
                height: "40vh",
                width: "100%",
                mt: 4,
              }}
              mt={isLargeScreen ? 30 : 15}
            >
              <Box mt={5} sx={{ height: "auto", width: "80%" }}>
                <Uploader
                  lablename={"Pet's Skin Image"}
                  handleFileUpload={handlePredictImgUpload}
                  isImage={true}
                />
              </Box>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#00b359",
                  width: "150px",
                  marginTop: "10px",
                }}
                onClick={handlePredictSubmit}
              >
                Upload
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      <Box
        mt={4}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0f8ff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          marginTop: "10px",
          marginBottom: "60px",
        }}
      >
        <Box
          sx={{
            width: "80%",
            textAlign: "center",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: "#00b359", marginBottom: "10px" }}
          >
            Diagnosis Result
          </Typography>
          <Typography variant="body1" sx={{ color: "#333" }}>
            Your pet's condition has been analyzed. Please see the details
            below.
          </Typography>
          {diseaseDetails ? (
            <Box mt={2}>
              <Typography variant="body2" sx={{ color: "#666" }}>
                Condition: <strong>{diseaseDetails.name}</strong>
              </Typography>
              <Typography variant="body2" sx={{ color: "#666" }}>
                Description: <strong>{diseaseDetails.description}</strong>
              </Typography>
            </Box>
          ) : diseases && diseases.length > 0 ? (
            <Box mt={2}>
              {diseases.slice(0, 3).map((disease, index) => {
                const diseaseDetails = getDiseaseDetails(disease.name);
                return (
                  <Box key={index} mt={2}>
                    <Typography variant="body2" sx={{ color: "#666" }}>
                      Condition: <strong>{disease.name}</strong>
                    </Typography>
                    {diseaseDetails ? (
                      <>
                        <Typography variant="body2" sx={{ color: "#666" }}>
                          Description:{" "}
                          <strong>{diseaseDetails.description}</strong>
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#666" }}>
                          Confidence:{" "}
                          <strong>
                            {(disease.confidence * 100).toFixed(2)}%
                          </strong>
                        </Typography>
                      </>
                    ) : (
                      <Typography variant="body2" sx={{ color: "#666" }}>
                        <strong>Details not available</strong>
                      </Typography>
                    )}
                  </Box>
                );
              })}
            </Box>
          ) : (
            <Typography variant="body2" sx={{ color: "#666" }}>
              <strong>Please Input Your Pet's Details.</strong>
            </Typography>
          )}
        {(diseaseDetails || diseases)&&<Button variant="contained" color="primary" onClick={handleClickOpen} sx={{ mt: 2 }}>
        Give Feedback
      </Button>}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Give Feedback</DialogTitle>
          <DialogContent>
            <Rating
              name="feedback-rating"
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Email"
              type="text"
              fullWidth
              variant="standard"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            
            <TextField
              autoFocus
              margin="dense"
              label="Feedback"
              type="text"
              fullWidth
              variant="standard"
              value={feedback}
              onChange={(event) => setFeedback(event.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmitFeedback}>Submit</Button>
          </DialogActions>
        </Dialog>
          
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Upload;
