import React, { useState, useEffect, useRef } from "react";

const universities = [
  "Sh. Gokul Verma Govt. Polytechnic College",
  "Rajesh Pilot Govt. Polytechnic College",
  "Ch. Maloo Ram Bhambhu Govt. Poly. College"
];

const getCurrentYear = () => new Date().getFullYear();

const StepThree = ({ formData, handleChange, errors }) => {
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [inputValue, setInputValue] = useState(formData.university);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (
      highlightedIndex >= 0 &&
      highlightedIndex < filteredUniversities.length
    ) {
      dropdownRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [highlightedIndex, filteredUniversities]);

  const handleUniversityChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setHighlightedIndex(-1);
    if (value) {
      setFilteredUniversities(
        universities.filter((uni) =>
          uni.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredUniversities([]);
    }
  };

  const handleUniversitySelect = (value) => {
    setInputValue(value);
    setFilteredUniversities([]);
    setHighlightedIndex(-1);
    handleChange({ target: { name: "university", value } });
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        Math.min(prev + 1, filteredUniversities.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (
        highlightedIndex >= 0 &&
        highlightedIndex < filteredUniversities.length
      ) {
        handleUniversitySelect(filteredUniversities[highlightedIndex]);
      }
    }
  };

  return (
    <>
      <div>
        <label
          htmlFor="university"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          College
        </label>
        <input
          type="text"
          name="university"
          onChange={handleUniversityChange}
          onKeyDown={handleKeyDown}
          value={inputValue}
          id="university"
          className={`bg-gray-50 border ${
            errors.university ? "border-red-500" : "border-gray-300"
          } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
          placeholder="Type to search..."
          required
        />
        {errors.university && (
          <p className="text-red-500 text-sm">{errors.university}</p>
        )}
        {inputValue && filteredUniversities.length > 0 && (
          <ul className="mt-2 border border-gray-300 rounded-lg bg-white absolute z-10">
            {filteredUniversities.map((uni, index) => (
              <li
                key={uni}
                ref={highlightedIndex === index ? dropdownRef : null}
                className={`p-2 cursor-pointer ${
                  highlightedIndex === index ? "bg-gray-300" : ""
                }`}
                onClick={() => handleUniversitySelect(uni)}
              >
                {uni}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <label
          htmlFor="branch"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Branch
        </label>
        <select
          name="branch"
          onChange={handleChange}
          value={formData.branch}
          id="branch"
          className={`bg-gray-50 border ${
            errors.branch ? "border-red-500" : "border-gray-300"
          } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
          required
        >
          <option value="" disabled>
            Select your branch
          </option>
          <option value="ECE">ECE</option>
          <option value="CSE">CSE</option>
          <option value="ME">ME</option>
          <option value="Biotech">Biotech</option>
        </select>
        {errors.branch && <p className="text-red-500 text-sm">{errors.branch}</p>}
      </div>
      <div>
        <label
          htmlFor="specialization"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Specialization
        </label>
        <select
          name="specialization"
          onChange={handleChange}
          value={formData.specialization}
          id="specialization"
          className={`bg-gray-50 border ${
            errors.specialization ? "border-red-500" : "border-gray-300"
          } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
          required
        >
          <option value="" disabled>
            Select your specialization
          </option>
          <option value="AI">AI</option>
          <option value="Data Science">Data Science</option>
          <option value="Robotics">Robotics</option>
          <option value="Cyber Security">Cyber Security</option>
          <option value="Biomedical Engineering">Biomedical Engineering</option>
        </select>
        {errors.specialization && (
          <p className="text-red-500 text-sm">{errors.specialization}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="yearOfGraduation"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Year of Graduation
        </label>
        <select
          name="yearOfGraduation"
          onChange={handleChange}
          value={formData.yearOfGraduation}
          id="yearOfGraduation"
          className={`bg-gray-50 border ${
            errors.yearOfGraduation ? "border-red-500" : "border-gray-300"
          } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
          required
        >
          <option value="" disabled>
            Select your graduation year
          </option>
          {Array.from(
            { length: getCurrentYear() - 1980 + 1 },
            (_, i) => getCurrentYear() - i
          ).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        {errors.yearOfGraduation && (
          <p className="text-red-500 text-sm">{errors.yearOfGraduation}</p>
        )}
      </div>
    </>
  );
};

export default StepThree;
