import React from 'react';
import './App.css'; // Correct path to your CSS file
import WeatherPrediction from './component/weatherprediction';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-500 p-4">
        <h1 className="text-white text-3xl font-semibold text-center">Weather Prediction</h1>
      </header>
      <main className="max-w-md mx-auto p-6">
        <WeatherPrediction/>
      </main>
      <footer className="bg-blue-500 text-white text-center py-4">
        &copy; {new Date().getFullYear()} Weather App. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
