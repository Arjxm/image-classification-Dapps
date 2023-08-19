import { useState } from "react";

const CheckPassCodeComponent = ({
  password,
  handleGetResult,
  handleInputChange,
}) => {
  return (
    <div className="flex flex-col items-center">
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded-md mb-4 w-64"
      />
      <button
        onClick={handleGetResult}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Get Result
      </button>
    </div>
  );
};

export default CheckPassCodeComponent;
