// RainPrediction.jsx
import React from "react";

function RainPrediction({ chanceOfRain, icon }) {
  return (
    <div className="bg-white px-4 py-3 rounded-lg text-center w-[12rem] shadow-md">
      <h6 className="text-gray-600 font-light text-lg mb-2">Rain Prediction</h6>
      <img
        src={icon}
        alt="Weather Icon"
        className="w-14 h-14 mx-auto" // Increased size for the weather icon
      />
      <p className="text-gray-500 text-sm font-bold mt-1">
        {chanceOfRain}% chance
      </p>
    </div>
  );
}

export default RainPrediction;
