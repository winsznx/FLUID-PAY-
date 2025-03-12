import React from 'react';
import { FaWallet, FaPaperPlane, FaRandom, FaExchangeAlt, FaAddressBook, FaBan, FaShieldAlt } from 'react-icons/fa';
import NavItem from '../Navigation/NavItem';

const Sidebar = ({ selectedChain, setSelectedChain }) => {
  return (
    <div className="w-64 border-r border-gray-200 p-4 bg-white">
      <div className="flex items-center mb-8">
        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
        <div className="ml-4 flex-1 space-y-1">
          <div className="h-2 bg-gray-200 rounded w-3/4"></div>
          <div className="h-2 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="text-xs text-gray-500 mb-1">Chain</div>
        <div className="relative">
          <div className="flex items-center p-2 border rounded-md bg-gray-100">
            <span className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white">E</span>
            <span className="ml-2">{selectedChain}</span>
            <span className="ml-auto">▼</span>
          </div>
        </div>
      </div>
      
      <nav className="space-y-4">
        <NavItem icon={<FaWallet />} text="Wallet" />
        <NavItem icon={<FaPaperPlane />} text="Send" />
        <NavItem icon={<FaRandom />} text="Disperse" />
        <NavItem icon={<FaExchangeAlt />} text="Swap/Bridge" />
        <NavItem icon={<FaAddressBook />} text="Address Book" />
        <NavItem icon={<FaBan />} text="Revoke" />
        <NavItem icon={<FaShieldAlt />} text="Multisafe" hasSubmenu />
      </nav>
      
      <div className="mt-8 p-3 border border-gray-200 rounded-md">
        <div className="text-sm font-medium">Dump Services</div>
        <div className="text-xs text-gray-500">Dump your tokens like a pro</div>
      </div>
      
      <div className="mt-8 flex justify-between text-xs text-gray-500">
        <span>GitHub</span>
        <span>Twitter</span>
      </div>
      
      <div className="mt-6 p-3 bg-blue-600 rounded-md text-white flex justify-between items-center">
        <span className="font-bold text-lg">Fluid Pay</span>
        <span className="text-2xl">💧</span>
      </div>
    </div>
  );
}

export default Sidebar;
