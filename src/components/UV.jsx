// UV.jsx
import React from "react";

function UV({ uv }) {
  const getUVStatus = (uv) => {
    if (uv <= 2) return { status: "Low 🌞", color: "text-green-500" };
    if (uv <= 5) return { status: "Moderate ☀️", color: "text-yellow-500" };
    if (uv <= 7) return { status: "High 🌤️", color: "text-orange-500" };
    if (uv <= 10) return { status: "Very High 🌤️🔥", color: "text-red-500" };
    return { status: "Extreme ☠️", color: "text-purple-500" };
  };

  const { status, color } = getUVStatus(uv);

  return (
    <div className="bg-white px-4 py-3 rounded-lg text-center w-[12rem] shadow-md">
      <h6 className="text-gray-600 font-light text-lg mb-2">UV Index</h6>
      <h1 className={`text-4xl font-bold ${color}`}>{uv}</h1>
      <p className={`${color} text-sm font-semibold`}>{status}</p>
    </div>
  );
}

export default UV;
