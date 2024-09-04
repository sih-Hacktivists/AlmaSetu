import React, { useState } from "react";
import StepOne from "../components/Authentication/StepOne";
import StepTwo from "../components/Authentication/StepTwo";
import StepThree from "../components/Authentication/StepThree";
import StepFour from "../components/Authentication/StepFour";
import SkillsAndInterests from "../components/Authentication/SkillsInterest";
import StepFive from "../components/Authentication/StepFive";
import VerifyCollegeEmail from "../components/Authentication/VerifyEmailPage";
import UploadCollegeDocument from "../components/Authentication/UploadDocument";

export const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    university: "",
    isCollegeEmail: false,
    city: "",
    bio: "",
    branch: "",
    specialization: "",
    yearOfGraduation: "",
    skills:[],
    interests:[],
    enrollmentNumber: "",
    profilePic: null,
    collegeDocument: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };
  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, isCollegeEmail: e.target.checked });
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 7));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOne
            formData={formData}
            handleChange={handleChange}
            handleCheckboxChange={handleCheckboxChange}
          />
        );
      case 2:
        return <StepTwo formData={formData} handleChange={handleChange} />;
      case 3:
        return <StepThree formData={formData} handleChange={handleChange} />;
      case 4:
        return (
          <StepFour
            formData={formData}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
          />
        );

      case 5:
        return (
          <SkillsAndInterests formData={formData} handleChange={handleChange} />
        );

      case 6:
        return (
          <StepFive
            formData={formData}
            prevStep={prevStep}
            handleSubmit={handleSubmit}
          />
        );
      case 7:
        return formData.isCollegeEmail ? (
          <VerifyCollegeEmail formData={formData} />
        ) : (
          <UploadCollegeDocument
            formData={formData}
            handleFileChange={handleFileChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="relative   flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
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
              Create an account
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {renderStep()}

              <div className="flex justify-between mt-4">
                {currentStep > 1 && currentStep !== 7 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="text-white bg-slate-500 hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Previous
                  </button>
                )}

                {currentStep < 5 && (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="text-white bg-slate-500 hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Next
                  </button>
                )}

                {currentStep === 5 && (
                    <button
                    type="button"
                    onClick={nextStep}
                    className="text-white bg-slate-500 hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Next
                  </button>
                )}
                {currentStep === 6 && (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="text-white bg-slate-500 hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Next
                  </button>
                )}


                {currentStep === 7 && (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full px-5 py-2.5 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm font-medium"
                  >
                    Verify and Submit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
