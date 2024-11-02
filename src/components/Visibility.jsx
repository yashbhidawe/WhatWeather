// Visibility.jsx
import React from "react";

function Visibility({ value, unit }) {
  const getVisibilityStatus = (value) => {
    if (value >= 10) return "Clear🙂";
    if (value >= 5) return "Moderate🫥";
    return "Poor🥺";
  };

  const status = getVisibilityStatus(value);

  return (
    <div className="bg-white px-4 py-3 rounded-lg text-center w-[12rem] shadow-md">
      <h6 className="text-gray-600 font-light text-lg mb-2">Visibility</h6>
      <p className="text-2xl font-bold">
        {value} {unit}
      </p>
      <p className="text-gray-500 text-sm mt-1">{status}</p>
    </div>
  );
}

export default Visibility;
