// components/Wallet/DisperseContent.jsx
import React from 'react';

const DisperseContent = ({ account }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Disperse Tokens</h1>
      {!account ? (
        <div className="bg-yellow-100 p-4 rounded">
          Please connect your wallet to disperse tokens
        </div>
      ) : (
        <div className="border rounded-lg p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recipients (one per line: address,amount)
            </label>
            <textarea
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              rows="5"
              placeholder="0x123...abc,0.1&#10;0x456...def,0.2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Token
            </label>
            <select className="w-full p-2 border rounded bg-gray-50">
              <option>ETH</option>
              <option>USDT</option>
              <option>USDC</option>
            </select>
          </div>
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Disperse
          </button>
        </div>
      )}
    </div>
  );
};

export default DisperseContent;