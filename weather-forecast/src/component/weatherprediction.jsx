import React, { useState } from 'react';
import WeatherForm from './weatherform';
import { getWeatherPrediction } from '../services/weatherservice';

const WeatherPrediction = () => {
  const [formData, setFormData] = useState({
    temp_max: '',
    temp_min: '',
    precipitation: '',
    wind: ''
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value.trim()
    }));
  };

  const validateInput = () => {
    const { temp_max, temp_min, precipitation, wind } = formData;

    const tempMax = parseFloat(temp_max);
    const tempMin = parseFloat(temp_min);
    const precip = parseFloat(precipitation);
    const windSpeed = parseFloat(wind);

    if (isNaN(tempMax) || isNaN(tempMin) || isNaN(precip) || isNaN(windSpeed)) {
      setError('All inputs must be numerical.');
      return false;
    }

    if (precip < 0 || precip > 60) {
      setError('Precipitation value must be between 0 and 60.');
      return false;
    }
    if (tempMax < -1.6 || tempMax > 35.6) {
      setError('Max temperature value must be between -1.6 and 35.6.');
      return false;
    }
    if (tempMin < -7.9 || tempMin > 18.3) {
      setError('Min temperature value must be between -7.9 and 18.3.');
      return false;
    }
    if (windSpeed < 0.4 || windSpeed > 4) {
      setError('Wind value must be between 0.4 and 4.');
      return false;
    }
    if (tempMin > tempMax) {
      setError('Min temperature cannot be greater than max temperature.');
      return false;
    }

    setError(null);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateInput()) {
      return;
    }

    setLoading(true);
    try {
      const result = await getWeatherPrediction(formData);
      setPrediction(result);
    } catch (err) {
      console.error('Prediction Error:', err);
      setError('Failed to fetch prediction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <WeatherForm
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      loading={loading}
      error={error}
      prediction={prediction} 
    />
  );
};

export default WeatherPrediction;
