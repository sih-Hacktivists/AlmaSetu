import React from "react";

const StepTwo = ({ formData, handleChange }) => {
  return (
    <>
     <div>
        <label
          htmlFor="role"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Role
        </label>
        <select
          name="role"
          onChange={handleChange}
          value={formData.role}
          id="role"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        >
          <option value="" disabled>
            Select your role
          </option>
          <option value="Student">Student</option>
          <option value="Alumni">Alumni</option>
        </select>
      </div>
      <div>
        <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">
          City
        </label>
        <input
          type="text"
          name="city"
          onChange={handleChange}
          value={formData.city}
          id="city"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      <div>
        <label htmlFor="bio" className="block mb-2 text-sm font-medium text-gray-900">
          Bio
        </label>
        <textarea
          name="bio"
          onChange={handleChange}
          value={formData.bio}
          id="bio"
          rows="4"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Tell us about yourself..."
          required
        />
      </div>
    </>
  );
};

export default StepTwo;
