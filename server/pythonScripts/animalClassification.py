import sys
import tensorflow as tf
import io
from tensorflow.keras.preprocessing import image
import numpy as np
from tensorflow.keras.models import load_model
import os

# Set UTF-8 encoding for stdout
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def preprocess_image(img_path):
    img = image.load_img(img_path, target_size=(150, 150))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0  # Rescale the image
    return img_array

def predict_image(img_path):
    img_array = preprocess_image(img_path)
    model_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../models/animalClassification.h5'))
    model = tf.keras.models.load_model(model_path)
    prediction = model.predict(img_array)
    return prediction

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python predict.py <image_path>")
        sys.exit(1)
    
    img_path = sys.argv[1]
    prediction = predict_image(img_path)
    if prediction[0][0] > 0.5:
        print("Dog")
    else:
        print("Cat")