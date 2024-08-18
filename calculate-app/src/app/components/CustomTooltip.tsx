import React, { useState } from "react";

interface CustomTooltipProps {
  message: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ message }) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  return (
    <div className="relative flex justify-center">
      <svg
        aria-haspopup="true"
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-info-circle ml-3"
        width="25"
        height="25"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#A0AEC0"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
      >
        <path stroke="none" d="M0 0h24v24H0z" />
        <circle cx="12" cy="12" r="9" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
        <polyline points="11 12 12 12 12 16 13 16" />
      </svg>
      {isTooltipVisible && (
        <div className="absolute top-8 left-6 transform -translate-x-1/2 mb-2 w-64 p-2 bg-gray-700 text-white text-start text-sm rounded shadow-lg">
          {message}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-gray-700"></div>
          <div className="absolute bottom-[calc(100%-4px)] left-1/2 transform -translate-x-1/2  h-3 bg-gray-700"></div>
        </div>
      )}
    </div>
  );
};

export default CustomTooltip;