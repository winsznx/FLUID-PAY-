import React, { useState } from 'react';
import { FaWallet, FaPaperPlane, FaRandom, FaExchangeAlt, FaAddressBook, FaBan, FaShieldAlt } from 'react-icons/fa';
import NavItem from '../Navigation/NavItem';

const Sidebar = ({ selectedChain, setSelectedChain, activeNavItem, setActiveNavItem }) => {
  const [isChainDropdownOpen, setIsChainDropdownOpen] = useState(false);
  const chains = ['Ethereum', 'Polygon', 'Arbitrum', 'Optimism', 'Base'];
  
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
          <div 
            className="flex items-center p-2 border rounded-md bg-gray-100 cursor-pointer"
            onClick={() => setIsChainDropdownOpen(!isChainDropdownOpen)}
          >
            <span className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
              {selectedChain.charAt(0)}
            </span>
            <span className="ml-2">{selectedChain}</span>
            <span className="ml-auto">{isChainDropdownOpen ? '▲' : '▼'}</span>
          </div>
          
          {isChainDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
              {chains.map((chain) => (
                <div 
                  key={chain}
                  className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                  onClick={() => {
                    setSelectedChain(chain);
                    setIsChainDropdownOpen(false);
                  }}
                >
                  <span className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    {chain.charAt(0)}
                  </span>
                  <span className="ml-2">{chain}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <nav className="space-y-4">
        <NavItem 
          icon={<FaWallet />} 
          text="Wallet" 
          isActive={activeNavItem === 'Wallet'} 
          onClick={() => setActiveNavItem('Wallet')} 
        />
        <NavItem 
          icon={<FaPaperPlane />} 
          text="Send" 
          isActive={activeNavItem === 'Send'} 
          onClick={() => setActiveNavItem('Send')} 
        />
        <NavItem 
          icon={<FaRandom />} 
          text="Disperse" 
          isActive={activeNavItem === 'Disperse'} 
          onClick={() => setActiveNavItem('Disperse')} 
        />
        <NavItem 
          icon={<FaExchangeAlt />} 
          text="Swap/Bridge" 
          isActive={activeNavItem === 'Swap/Bridge'} 
          onClick={() => setActiveNavItem('Swap/Bridge')} 
        />
        <NavItem 
          icon={<FaAddressBook />} 
          text="Address Book" 
          isActive={activeNavItem === 'Address Book'} 
          onClick={() => setActiveNavItem('Address Book')} 
        />
        <NavItem 
          icon={<FaBan />} 
          text="Revoke" 
          isActive={activeNavItem === 'Revoke'} 
          onClick={() => setActiveNavItem('Revoke')} 
        />
        <NavItem 
          icon={<FaShieldAlt />} 
          text="Multisafe" 
          hasSubmenu 
          isActive={activeNavItem === 'Multisafe'} 
          onClick={() => setActiveNavItem('Multisafe')} 
        />
      </nav>
      
      <div className="mt-8 p-3 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50" onClick={() => console.log('Dump Services clicked')}>
        <div className="text-sm font-medium">Dump Services</div>
        <div className="text-xs text-gray-500">Dump your tokens like a pro</div>
      </div>
      
      <div className="mt-8 flex justify-between text-xs text-gray-500">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">GitHub</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">Twitter</a>
      </div>
      
      <div className="mt-6 p-3 bg-blue-600 rounded-md text-white flex justify-between items-center cursor-pointer hover:bg-blue-700" onClick={() => console.log('Fluid Pay clicked')}>
        <span className="font-bold text-lg">Fluid Pay</span>
        <span className="text-2xl">💧</span>
      </div>
    </div>
  );
}

export default Sidebar;