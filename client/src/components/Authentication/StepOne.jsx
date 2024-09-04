import React from "react";

const StepOne = ({ formData, handleChange, handleCheckboxChange, errors }) => {
  return (
    <>
      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={formData.name}
          id="name"
          className={`bg-gray-50 border ${
            errors.name ? "border-red-500" : "border-gray-300"
          } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
          placeholder="John"
          required
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Your email
        </label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
          id="email"
          className={`bg-gray-50 border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
          placeholder="name@x.edu.in"
          required
          pattern="^[a-zA-Z0-9._%+-]+@[\w-]+\.edu\.in$"
          title="Please enter a valid college email ending with @x.edu.in"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        <div className="flex gap-2 items-center mt-2">
          <input
            type="checkbox"
            checked={formData.isCollegeEmail}
            id="college-email"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            onChange={handleCheckboxChange}
          />
          <label htmlFor="college-email" className="text-sm text-gray-900">
            This is a college email
          </label>
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
          id="password"
          placeholder="••••••••"
          className={`bg-gray-50 border ${
            errors.password ? "border-red-500" : "border-gray-300"
          } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
          required
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Phone Number
        </label>
        <input
          type="text"
          name="phone"
          onChange={handleChange}
          value={formData.phone}
          id="phone"
          className={`bg-gray-50 border ${
            errors.phone ? "border-red-500" : "border-gray-300"
          } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
          required
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>
    </>
  );
};

export default StepOne;
