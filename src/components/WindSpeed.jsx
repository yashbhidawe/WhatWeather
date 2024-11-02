// WindSpeed.jsx
import React from "react";

function WindSpeed({ speed, unit = "km/h" }) {
  return (
    <div className="bg-white px-4 py-3 rounded-lg text-center w-[12rem] shadow-md">
      <h6 className="text-gray-600 font-light text-lg mb-2">Wind Speed</h6>
      <p className="text-2xl font-bold">
        {speed} {unit}
      </p>
      <p className="text-gray-500 text-sm mt-1">
        {speed < 15
          ? "Light breeze"
          : speed < 30
          ? "Moderate wind"
          : "Strong wind"}
      </p>
    </div>
  );
}

export default WindSpeed;
