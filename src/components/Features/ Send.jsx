import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const Send = ({ selectedChain }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [token, setToken] = useState('ETH');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState(null);
  
  const tokens = {
    'Ethereum': ['ETH', 'USDC', 'DAI', 'LINK'],
    'Polygon': ['MATIC', 'USDC', 'WETH', 'AAVE'],
    'Arbitrum': ['ETH', 'ARB', 'USDC', 'GMX'],
    'Optimism': ['ETH', 'OP', 'USDC', 'SNX'],
    'Base': ['ETH', 'USDC', 'DAI', 'CBETH']
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate transaction processing
    setTimeout(() => {
      setIsSubmitting(false);
      setTransactionStatus({
        success: true,
        hash: '0x' + Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2)
      });
      
      // Reset form after successful submission
      setTimeout(() => {
        setRecipient('');
        setAmount('');
        setTransactionStatus(null);
      }, 5000);
    }, 2000);
  };
  
  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <FaPaperPlane className="mr-2 text-blue-500" /> 
          Send on {selectedChain}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Address</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="0x..."
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
            <div className="flex items-center">
              <input
                type="number"
                step="0.000001"
                min="0"
                className="flex-1 p-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              <select
                className="p-2 border border-gray-300 border-l-0 rounded-r-md bg-gray-50"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              >
                {tokens[selectedChain].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mb-6 p-3 bg-blue-50 rounded-md text-sm text-blue-700">
            Network Fee: ~0.001 {selectedChain === 'Polygon' ? 'MATIC' : 'ETH'}
          </div>
          
          <button
            type="submit"
            className={`w-full p-3 rounded-md text-white font-medium ${
              isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : `Send ${amount || '0'} ${token}`}
          </button>
        </form>
        
        {transactionStatus && (
          <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-md">
            <div className="font-medium">Transaction Successful!</div>
            <div className="text-sm mt-1">
              Transaction Hash: <span className="font-mono text-xs">{transactionStatus.hash}</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium mb-4">Recent Transactions</h3>
        <div className="text-center text-gray-500 py-6">
          No recent transactions
        </div>
      </div>
    </div>
  );
};

export default Send;