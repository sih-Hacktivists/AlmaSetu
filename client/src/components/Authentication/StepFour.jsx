import React, { useState } from "react";

const StepFour = ({ formData, handleChange, handleFileChange }) => {
  const [fileName, setFileName] = useState(""); // State to manage file name for display

  // Handle file input change

  return (
    <>
      <div>
        <label
          htmlFor="enrollmentNumber"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Enrollment Number
        </label>
        <input
          type="text"
          name="enrollmentNumber"
          onChange={handleChange}
          value={formData.enrollmentNumber}
          id="enrollmentNumber"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      <div className="mt-4">
        <label
          htmlFor="profilePic"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Profile Picture
        </label>
        <input
          type="file"
          name="profilePic"
          id="profilePic"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-gray-200 file:text-gray-700 file:cursor-pointer focus:ring-blue-500 focus:border-blue-500"
        />
        {fileName && <p className="mt-2 text-sm text-gray-500">{fileName}</p>}
      </div>
    </>
  );
};

export default StepFour;
