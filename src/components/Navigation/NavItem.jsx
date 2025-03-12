import React from 'react';

const NavItem = ({ icon, text, hasSubmenu = false }) => {
  return (
    <div className="flex items-center p-2 hover:bg-blue-50 rounded-md cursor-pointer text-gray-700 hover:text-blue-600">
      <span className="text-lg w-6">{icon}</span>
      <span className="ml-2">{text}</span>
      {hasSubmenu && <span className="ml-auto">›</span>}
    </div>
  );
}

export default NavItem;