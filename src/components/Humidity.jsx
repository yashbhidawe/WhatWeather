// Humidity.jsx
import React from "react";

function Humidity({ value }) {
  const getHumidityStatus = (humidity) => {
    if (humidity < 30) {
      return { status: "Low 🌵", color: "text-red-500" }; // Low humidity
    } else if (humidity >= 30 && humidity <= 60) {
      return { status: "Good 😊", color: "text-green-500" }; // Ideal range
    } else if (humidity > 60 && humidity <= 80) {
      return { status: "Okay 🌤️", color: "text-yellow-500" }; // High but manageable
    } else {
      return { status: "High ☔", color: "text-blue-500" }; // Very high humidity
    }
  };

  const { status, color } = getHumidityStatus(value);

  return (
    <div className="bg-white px-4 py-3 rounded-lg text-center w-[12rem] shadow-md">
      <h6 className="text-gray-600 font-light text-lg mb-2">Humidity</h6>
      <p className="text-3xl font-semibold text-gray-800">{value}%</p>
      <p className={`${color} text-sm font-bold`}>{status}</p>
    </div>
  );
}

export default Humidity;
