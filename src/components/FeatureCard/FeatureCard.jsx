import React from 'react';

const FeatureCard = ({ title, description, buttonText, icon, onButtonClick }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <h3 className="font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <button 
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md flex items-center justify-center"
        onClick={onButtonClick}
      >
        <span>{buttonText}</span>
        <span className="ml-2">{icon}</span>
      </button>
    </div>
  );
}

export default FeatureCard;