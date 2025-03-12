import React, { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import MainContent from './components/Layout/MainContent';
import './index.css';

function App() {
  const [selectedChain, setSelectedChain] = useState('Ethereum');
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        selectedChain={selectedChain} 
        setSelectedChain={setSelectedChain} 
      />
      <MainContent />
    </div>
  );
}

export default App;