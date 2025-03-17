// components/Wallet/WalletContent.jsx
import React from 'react';
import { FaCheckCircle, FaClone, FaExchangeAlt, FaRandom, FaAddressBook, FaLock, FaFileAlt } from 'react-icons/fa';

const WalletContent = ({ account, balance, connectWallet, isConnecting, selectedChain }) => {
  const shortenAddress = (address) => {
    return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';
  };

  return (
    <div>
      <div className="bg-blue-600 text-white p-6 rounded-lg mb-6">
        <h1 className="text-2xl font-bold mb-4">MAKING CRYPTO SIMPLER</h1>
        <p className="mb-4">
          Fluid Pay adds superpowers to your wallet, to make your crypto journey faster, simpler, and maybe even a little bit more fun.
        </p>
        <div className="mt-4">
          <span className="bg-blue-700 px-3 py-1 rounded text-sm">Currently on: {selectedChain}</span>
        </div>
        
        {account && (
          <div className="mt-4 bg-white text-blue-600 p-4 rounded-lg flex justify-between items-center">
            <span className="font-medium">{shortenAddress(account)}</span>
            <span className="flex items-center">
              <FaCheckCircle className="text-green-500 mr-2" />
              Success!
            </span>
          </div>
        )}
      </div>
      
      {!account ? (
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded-md w-full text-center font-medium"
          onClick={connectWallet}
          disabled={isConnecting}
        >
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border rounded-lg p-4 bg-white">
            <h2 className="font-bold mb-2">ONE SAFE, ALL CHAINS</h2>
            <p className="text-gray-600 mb-4 text-sm">Click and clone your Safe on any chain. Easy peasy.</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md w-full flex items-center justify-center">
              <FaClone className="mr-2" /> Clone my safe
            </button>
          </div>
          
          <div className="border rounded-lg p-4 bg-white">
            <h2 className="font-bold mb-2">SWAP AND BRIDGE</h2>
            <p className="text-gray-600 mb-4 text-sm">Enjoy cross-chain swaps lightning fast with Fluid Pay Swap.</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md w-full flex items-center justify-center">
              <FaExchangeAlt className="mr-2" /> Make a swap
            </button>
          </div>
          
          <div className="border rounded-lg p-4 bg-white">
            <h2 className="font-bold mb-2">DID YOU SAY "DISPERSE?"</h2>
            <p className="text-gray-600 mb-4 text-sm">OH yeah you can now send tokens to multiple addresses at the same time with Disperse.</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md w-full flex items-center justify-center">
              <FaRandom className="mr-2" /> Disperse tokens
            </button>
          </div>
          
          <div className="border rounded-lg p-4 bg-white">
            <h2 className="font-bold mb-2">NATIVE ADDRESS BOOK</h2>
            <p className="text-gray-600 mb-4 text-sm">Never forget an address or fall for an injected address scam again!</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md w-full flex items-center justify-center">
              <FaAddressBook className="mr-2" /> Add Contact
            </button>
          </div>
          
          <div className="border rounded-lg p-4 bg-white">
            <h2 className="font-bold mb-2">STAY SAFE, REVOKE!</h2>
            <p className="text-gray-600 mb-4 text-sm">Take control of your contract approvals and check who can spend your tokens.</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md w-full flex items-center justify-center">
              <FaLock className="mr-2" /> Revoke allowances
            </button>
          </div>
          
          <div className="border rounded-lg p-4 bg-white">
            <h2 className="font-bold mb-2">CLAIM YOUR STREAM</h2>
            <p className="text-gray-600 mb-4 text-sm">Whether it's a salary, a grant, or something else, Fluid Pay will help you claim it.</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md w-full flex items-center justify-center">
              <FaFileAlt className="mr-2" /> Claim your stream
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletContent;