// AirQuality.jsx
import React from "react";

function AirQuality({ aqi }) {
  const getAirQualityStatus = (aqi) => {
    if (aqi <= 50) return "Good";
    if (aqi <= 100) return "Moderate";
    if (aqi <= 150) return "Unhealthy for Sensitive Groups";
    if (aqi <= 200) return "Unhealthy";
    if (aqi <= 300) return "Very Unhealthy";
    return "Hazardous";
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-[12rem] flex flex-col items-center">
      <h6 className="text-gray-600 font-light text-lg mb-2">Air Quality</h6>
      <p className="text-4xl font-semibold text-gray-800">{aqi}</p>
      <p className="text-sm font-bold text-gray-700 mb-1">
        {getAirQualityStatus(aqi)}
      </p>
    </div>
  );
}

export default AirQuality;
