const express = require('express');
const multer = require('multer');

const modelController = require("../controllers/modelController");

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/identify',upload.single('image'),modelController.animalClassification);
router.post('/skinpredict',upload.single('image'),modelController.skinDiseases);
router.post('/diseasePredict',modelController.predictDisease);


module.exports = router;