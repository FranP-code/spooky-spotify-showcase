import { useState } from "react";

export const VerticalSelector = ({
  className,
  options,
  selectedOption,
  setSelectedOption,
}) => {
  return (
    <div className={`rounded-lg bg-white p-2 shadow ${className}`}>
      <ul className="space-y-2">
        {options.map((option) => (
          <li key={option}>
            <button
              className={`relative w-full overflow-hidden rounded-md p-3 text-left transition-colors duration-200 ${
                selectedOption === option
                  ? "bg-black text-white"
                  : "bg-transparent text-gray-800 hover:bg-gray-100"
              }`}
              onClick={() => setSelectedOption(option)}
              aria-pressed={selectedOption === option}
              style={{
                position: "relative",
                zIndex: selectedOption === option ? 1 : 0,
                transition: "background-color 0.3s ease, color 0.3s ease",
              }}
            >
              <span className="relative">{option}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VerticalSelector;
