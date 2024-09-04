import React, { useCallback, useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("/api/login", formData);
        // Handle success (e.g., redirect to dashboard)
        console.log("Login successful:", response.data);
      } catch (error) {
        if (error.response && error.response.data) {
          // Set errors based on backend response
          setErrors(error.response.data.errors || {});
        }
      }
    },
    [formData]
  );

  return (
    <div className="max-w-md mx-auto p-8">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
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
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="mb-4">
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

        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
