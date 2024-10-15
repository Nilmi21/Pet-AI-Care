import sys
import tensorflow as tf
import numpy as np
import pandas as pd
from tensorflow.keras.preprocessing import image
import json
import os

# Load your pre-trained model
model_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../models/SkinDisease.h5'))
model = tf.keras.models.load_model(model_path)

def preprocess_image(img_path):
    img = image.load_img(img_path, target_size=(150, 150))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0  # Rescale the image
    return img_array

def predict_image(img_path):
    img_array = preprocess_image(img_path)
    prediction = model.predict(img_array)
    return prediction

def main():
    if len(sys.argv) < 2:
        print("Usage: python skinDisease.py <image_path>")
        sys.exit(1)
    
    img_path = sys.argv[1]
    prediction = predict_image(img_path)
    
    # Assuming you have a mapping of prediction indices to disease names
    disease_names = ['Flea Allergy', 'Hotspot', 'Mange', 'Ringworm']
    predicted_disease = disease_names[np.argmax(prediction)]
    
    result = {
        "label": predicted_disease,
        "predictions": prediction.tolist()
    }
    
    print(json.dumps(result))

if __name__ == "__main__":
    main()