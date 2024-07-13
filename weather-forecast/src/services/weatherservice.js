import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const getWeatherPrediction = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/predict`, data, {
      // Example headers configuration (adjust as per your API requirements)
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Server responded with an error:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from server:', error.request);
    } else {
      // Something happened in setting up the request that triggered an error
      console.error('Error setting up the request:', error.message);
    }
    throw error; // Rethrow the error to handle it in the calling function
  }
};

export { getWeatherPrediction };

