# Weather Prediction Application

An application for predicting weather conditions using a machine learning model deployed with Flask and integrated with a React frontend.

## Overview

This project combines Flask, React, and a machine learning model to predict weather conditions based on user input. The Flask backend serves the machine learning model, while React handles the user interface.


## Technologies Used

- **Backend:** Flask, Python
- **Frontend:** React, JavaScript, HTML, Tailwind CSS
- **Machine Learning:** scikit-learn 

## Getting Started

### Prerequisites

- Python 3.7+
- Node.js and npm (for React development)

### Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/weather-prediction.git
cd weather-prediction
```

Install Python dependencies for Flask:

```bash
pip install -r requirements.txt
```
Install Node.js dependencies for React (if applicable):

```bash
cd frontend
npm install
```
#### Tailwind CSS

Tailwind CSS is already included in the project and should not require separate installation steps unless modifications are needed. If you need to rebuild Tailwind styles:

1. Navigate to the `frontend` directory.
2. Run `npm install` to install any necessary Node.js packages.
3. Run `npm run build` to rebuild Tailwind CSS styles based on your `tailwind.config.js` configuration file.

### Running the Application

#### *Flask Backend*

Start the Flask server:

```bash
python app.py
```
The Flask server will run at http://localhost:5000.

#### *React Frontend*

In a separate terminal, start the React development server (if not already integrated with Flask):

```bash 
cd frontend
npm start
```
The React server typically runs at http://localhost:3000.

## Usage
- Navigate to the application URL (http://localhost:3000 or as specified).
- Enter weather data (temperature, precipitation, wind speed, etc.) into the form.
- Submit the form to get a weather prediction based on the machine learning model.

## Features
- Predict weather conditions based on user input.
- Display prediction results using React components.
- Validate input data to ensure accuracy and reliability.
## Known issue
No known issue till now.
## Roadmap
- Enhance UI/UX with more interactive features.
- Improve machine learning model accuracy with more data and fine-tuning.
- Add user authentication and data persistence.