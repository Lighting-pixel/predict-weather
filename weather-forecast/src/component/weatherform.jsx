import React from 'react';
import "../App.css";

const WeatherForm = ({ formData, handleChange, handleSubmit, loading, error, prediction }) => (
  <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="temp_max" className="mb-1 text-sm font-medium text-gray-700">Max Temperature</label>
        <input
          type="number"
          id="temp_max"
          name="temp_max"
          value={formData.temp_max}
          onChange={handleChange}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          step="any"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="temp_min" className="mb-1 text-sm font-medium text-gray-700">Min Temperature</label>
        <input
          type="number"
          id="temp_min"
          name="temp_min"
          value={formData.temp_min}
          onChange={handleChange}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          step="any"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="precipitation" className="mb-1 text-sm font-medium text-gray-700">Precipitation</label>
        <input
          type="number"
          id="precipitation"
          name="precipitation"
          value={formData.precipitation}
          onChange={handleChange}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          step="any"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="wind" className="mb-1 text-sm font-medium text-gray-700">Wind</label>
        <input
          type="number"
          id="wind"
          name="wind"
          value={formData.wind}
          onChange={handleChange}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          step="any"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Get Prediction
      </button>
    </form>
    {loading && <p className="mt-4 text-center text-gray-600">Loading...</p>}
    {error && <p className="mt-4 text-center text-red-600">{error}</p>}
    {prediction && (
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800">Prediction:</h3>
        <p className="mt-2 text-lg text-gray-70">{prediction.prediction}</p>
      </div>
    )}
  </div>
);

export default WeatherForm;