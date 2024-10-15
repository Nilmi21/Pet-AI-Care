const { PythonShell } = require("python-shell");
const path = require("path");

async function animalClassification(req, res) {
  
  if (!req.file) {
    console.error("No file selected");
    return res.status(400).send("Error: No File Selected!");
  }

  const imagePath = req.file.path;
  console.log(imagePath);

  const pythonScript = path.resolve(
    __dirname,
    "../pythonScripts/animalClassification.py"
  );

  const options = {
    pythonPath: "C:/Users/Nilu/AppData/Local/Programs/Python/Python312/python.exe",
    args: [imagePath],
    env: {
      PYTHONIOENCODING: "utf-8",
      PYTHONPATH: "C:/Users/Nilu/AppData/Local/Programs/Python/Python312/python.exe",
    },
  };

  let pyshell = new PythonShell(pythonScript, options);

  let scriptOutput = "";

  pyshell.on("message", (message) => {
    // Filter out only the final prediction message
    if (message === "Dog" || message === "Cat") {
      scriptOutput = message;
    }
  });

  pyshell.end((err, code, signal) => {
    if (err) {
      console.error("Python script error:", err);
      return res.status(500).send("Internal Server Error");
    }
    console.log(scriptOutput);

    res.send(scriptOutput);
  });
}

async function skinDiseases(req, res) {
  if (!req.file) {
    console.error("No file selected");
    return res.status(400).send("Error: No File Selected!");
  }

  const imagePath = req.file.path;
  console.log(imagePath);

  const pythonScript = path.resolve(
    __dirname,
    "../pythonScripts/skinDisease.py"
  );

  const options = {
    pythonPath: "python",
    args: [imagePath],
    env: {
      PYTHONIOENCODING: "utf-8",
      PYTHONPATH: "python", 
    },
  };
  
  let pyshell = new PythonShell(pythonScript, options);

  let scriptOutput = "";

  pyshell.on("message", (message) => {
    try {
      scriptOutput = message;
    } catch (error) {
      console.error("Error parsing JSON from Python script:", error);
      res.status(500).send("Error processing image");
      pyshell.end();
    }
  });

  pyshell.end((err, code, signal) => {
    if (err) {
      console.error("Python script error:", err);
      return res.status(500).send("Internal Server Error");
    }
    console.log(scriptOutput);

    res.send(scriptOutput);
  });
}

function predictDisease(req, res) {
  const symptoms =req.body.symptoms; 
  if (!symptoms) {
    return res.status(400).send("Bad Request: Symptoms are required");
  }

  const options = {
    pythonPath: "python",
    args: [symptoms],
    env: {
      PYTHONIOENCODING: "utf-8",
      PYTHONPATH: "python",
    },
  };

  const pythonScript = path.resolve(
    __dirname,
    "../pythonScripts/dogdiseasesPredict.py"
  );

  let pyshell = new PythonShell(pythonScript, options);

  let scriptOutput = "";

  pyshell.on("message", (message) => {
  
    try {
      const parsedMessage = JSON.parse(message);
  
      if (Array.isArray(parsedMessage) && parsedMessage.every(item => typeof item === 'string')) {
        res.send(parsedMessage);
      } else {
        throw new Error('Invalid message format');
      }
    } catch (jsonError) {
      console.error('Error parsing message as JSON:', jsonError.message);
  
      try {
        const predictions = message.split(',').map(prediction => prediction.trim());
  
        if (predictions.every(item => item.includes(' with confidence '))) {
          res.send(predictions);
        } else {
          throw new Error('Invalid message format after manual parsing');
        }
      } catch (manualError) {
        console.error('Error parsing message manually:', manualError.message);
        res.status(500).send('Error parsing message from Python script');
      }
    }
  });

  pyshell.end((err, code, signal) => {
    if (err) {
      console.error("Python script error:", err);
      return res.status(500).send("Internal Server Error");
    }
    console.log(scriptOutput);
  });

}

module.exports = {
  predictDisease: predictDisease,
  animalClassification: animalClassification,
  skinDiseases: skinDiseases,
};


