import React, { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import MainContent from './components/Layout/MainContent';
import './index.css';

function App() {
  const [selectedChain, setSelectedChain] = useState('Ethereum');
  const [activeNavItem, setActiveNavItem] = useState('Wallet');
  const [currentView, setCurrentView] = useState('dashboard');
  
  // Function to handle navigation changes
  const handleNavigation = (navItem) => {
    setActiveNavItem(navItem);
    
    // Set the current view based on the navigation item
    switch(navItem) {
      case 'Wallet':
        setCurrentView('dashboard');
        break;
      case 'Send':
        setCurrentView('send');
        break;
      case 'Disperse':
        setCurrentView('disperse');
        break;
      case 'Swap/Bridge':
        setCurrentView('swap');
        break;
      case 'Address Book':
        setCurrentView('addressBook');
        break;
      case 'Revoke':
        setCurrentView('revoke');
        break;
      case 'Multisafe':
        setCurrentView('multisafe');
        break;
      default:
        setCurrentView('dashboard');
    }
  };
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        selectedChain={selectedChain} 
        setSelectedChain={setSelectedChain}
        activeNavItem={activeNavItem}
        setActiveNavItem={handleNavigation}
      />
      <MainContent 
        selectedChain={selectedChain}
        currentView={currentView}
      />
    </div>
  );
}

export default App;