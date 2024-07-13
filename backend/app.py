from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained model
model = joblib.load('weather.pkl')

# Define label mapping
label_mapping = {
    0: 'drizzle',
    1: 'fog',
    2: 'rain',
    3: 'snow',
    4: 'sun',
}

# The feature names used during model training
feature_names = ['temp_max', 'temp_min', 'precipitation', 'wind']

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    try:
        # Ensure all required columns are present and have default values if not
        data_dict = {col: data.get(col, None) for col in feature_names}

        # Check if any required feature is missing
        missing_features = [col for col, val in data_dict.items() if val is None]
        if missing_features:
            return jsonify({'error': f'Missing features: {", ".join(missing_features)}'}), 400

        # Validate input values (you can customize these ranges based on your dataset)
        try:
            precipitation = float(data_dict['precipitation'])
            temp_max = float(data_dict['temp_max'])
            temp_min = float(data_dict['temp_min'])
            wind = float(data_dict['wind'])

            if not (0 <= precipitation <= 60):
                return jsonify({'error': 'Precipitation value out of range'}), 400
            if not (-1.6<= temp_max <= 35.6):
                return jsonify({'error': 'Max temperature value out of range'}), 400
            if not (-7.9 <= temp_min <= 18.3):
                return jsonify({'error': 'Min temperature value out of range'}), 400
            if not (0.4 <= wind <= 4):
                return jsonify({'error': 'Wind value out of range'}), 400

            # Ensure temp_min is not greater than temp_max
            if temp_min > temp_max:
                return jsonify({'error': 'Min temperature cannot be greater than max temperature'}), 400

        except ValueError:
            return jsonify({'error': 'Invalid input values. Please ensure all inputs are numerical.'}), 400

        # Convert the validated data to DataFrame with correct feature names
        data_df = pd.DataFrame([data_dict], columns=feature_names)

        # Perform prediction using the model
        prediction = model.predict(data_df)

        # Convert prediction to Python built-in type
        prediction_result = prediction[0].item()

        # Map numeric prediction to label
        prediction_label = label_mapping.get(prediction_result, "Unknown")

        return jsonify({'prediction': prediction_label})
    except KeyError as e:
        return jsonify({'error': f'Missing feature: {str(e)}'}), 400
    except Exception as e:
        return jsonify({'error': f'Error during prediction: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)
