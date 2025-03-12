import React from 'react';

const NavItem = ({ icon, text, hasSubmenu = false, isActive = false, onClick }) => {
  return (
    <div 
      className={`flex items-center p-2 rounded-md cursor-pointer ${
        isActive 
          ? 'bg-blue-50 text-blue-600' 
          : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
      }`}
      onClick={onClick}
    >
      <span className="text-lg w-6">{icon}</span>
      <span className="ml-2">{text}</span>
      {hasSubmenu && <span className="ml-auto">›</span>}
    </div>
  );
}

export default NavItem;