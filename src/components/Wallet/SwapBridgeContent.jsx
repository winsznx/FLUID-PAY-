// components/Wallet/SwapBridgeContent.jsx
import React from 'react';

const SwapBridgeContent = ({ account }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Swap & Bridge</h1>
      {!account ? (
        <div className="bg-yellow-100 p-4 rounded">
          Please connect your wallet to use Swap & Bridge
        </div>
      ) : (
        <div className="border rounded-lg p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From
            </label>
            <div className="flex">
              <input
                type="number"
                className="w-full p-2 border rounded-l focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.0"
              />
              <select className="p-2 border border-l-0 rounded-r bg-gray-50">
                <option>ETH</option>
                <option>USDT</option>
                <option>USDC</option>
              </select>
            </div>
          </div>
          <div className="mb-4 flex justify-center">
            <button className="p-2 bg-gray-100 rounded-full">
              ↓
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To
            </label>
            <div className="flex">
              <input
                type="number"
                className="w-full p-2 border rounded-l focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.0"
                disabled
              />
              <select className="p-2 border border-l-0 rounded-r bg-gray-50">
                <option>USDC</option>
                <option>ETH</option>
                <option>USDT</option>
              </select>
            </div>
          </div>
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Get Quote
          </button>
        </div>
      )}
    </div>
  );
};

export default SwapBridgeContent;