import React from "react";
import { useNavigate } from "react-router-dom";

const VerificationPage = () => {
  const navigate = useNavigate();

  // Optional: Redirect to login page after a delay


  return (
    <section className="bg-gray-50">
      <div className="relative flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://cdn-icons-png.flaticon.com/128/999/999663.png"
            alt="logo"
          />
          AlmaLink
        </a>

        <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Verification
            </h1>

            <p className="text-center text-gray-600">
              You will be verified soon. Please check your email for further instructions.
            </p>

            <div className="text-center mt-4">
              <button
                onClick={() => navigate("/login")}
                className="w-full px-5 py-2.5 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm font-medium"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerificationPage;
