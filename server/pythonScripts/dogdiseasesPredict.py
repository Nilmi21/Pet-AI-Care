
import sys
import numpy as np
import joblib
import pandas as pd

# Load pre-trained model and label encoder
model = joblib.load('H:/Animal-Diseases-Prediction/server/models/model.h5')
le = joblib.load('H:/Animal-Diseases-Prediction/server/models/disease_label_encoder.pkl')

# Load the OneHotEncoder
ohe = joblib.load('H:/Animal-Diseases-Prediction/server/models/onehotencoder.pkl')

# Symptom columns and OneHotEncoder categories
symptom_columns = ['Symptom_1', 'Symptom_2', 'Symptom_3', 'Symptom_4', 'Symptom_5', 'Symptom_6', 'Symptom_7']

# Symptom dictionary with categories from the encoder
symptom_dict = {symptom_columns[i]: ohe.categories_[i] for i in range(len(symptom_columns))}


# Function to match input symptoms with one-hot encoding structure
def symptom_to_one_hot(symptoms_input):
    input_row = []
    for i, symptom in enumerate(symptoms_input):
        if symptom in symptom_dict[symptom_columns[i]]:
            symptom_index = list(symptom_dict[symptom_columns[i]]).index(symptom)
            # Create the one-hot encoded row for the current symptom
            one_hot_row = [0] * len(symptom_dict[symptom_columns[i]])
            one_hot_row[symptom_index] = 1
            input_row.extend(one_hot_row)
        else:
            # If symptom not found, extend with zeros for that symptom category
            input_row.extend([0] * len(symptom_dict[symptom_columns[i]]))
    return np.array(input_row).reshape(1, -1)

def predict_disease(symptoms_input):

    # Convert symptoms input into one-hot encoded format
    symptoms_encoded = symptom_to_one_hot(symptoms_input)

    # Get the predicted probabilities from the model
    probabilities = model.predict_proba(symptoms_encoded)[0]

    # Get the indices of the top 3 highest probabilities
    top_3_indices = np.argsort(probabilities)[-3:][::-1]

    # Use the label encoder to decode the disease labels
    top_3_diseases = le.inverse_transform(top_3_indices)
    top_3_confidences = probabilities[top_3_indices]

    list= []
    # Print the top 3 predictions with their confidence scores
    for i in range(3):
        # print(f"Prediction {i+1}: {top_3_diseases[i]} with confidence {top_3_confidences[i]:.2f}")
        list.append(f"Prediction {i+1}: {top_3_diseases[i]} with confidence {top_3_confidences[i]:.2f}")
    
    return list

# Main function to accept input from the command line
if __name__ == "__main__":
    # Example usage: python predict_disease.py "Symptom_1,Symptom_2,Symptom_3,Symptom_4,Symptom_5,Symptom_6,Symptom_7"
    if len(sys.argv) != 2:
        # print("Usage: python predict_disease.py 'Symptom_1,Symptom_2,Symptom_3,Symptom_4,Symptom_5,Symptom_6,Symptom_7'")
        sys.exit(1)

    # Get input symptoms from command line
    symptoms_input = sys.argv[1].split(',')

    # Make sure the input matches the required number of symptoms
    if len(symptoms_input) != len(symptom_columns):
        # print(f"Error: Please provide exactly {len(symptom_columns)} symptoms separated by commas.")
        sys.exit(1)

    # Predict disease based on input symptoms
    list = predict_disease(symptoms_input)

    print(list)
