// components/Wallet/SendContent.jsx
import React, { useState } from 'react';
import { ethers } from 'ethers';

const SendContent = ({ account, selectedChain }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState('ETH');
  const [isSending, setIsSending] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [error, setError] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    setError('');
    setTxHash('');
    
    if (!window.ethereum) {
      setError('MetaMask is not installed');
      return;
    }
    
    try {
      setIsSending(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      // This is a simplified example for ETH transfers
      // For token transfers, you would need to interact with the token contract
      if (selectedToken === 'ETH') {
        const tx = await signer.sendTransaction({
          to: recipient,
          value: ethers.utils.parseEther(amount)
        });
        
        setTxHash(tx.hash);
        await tx.wait();
      } else {
        // For tokens, you would use the token contract's transfer method
        setError('Token transfers not implemented yet');
      }
    } catch (err) {
      console.error('Transaction failed:', err);
      setError(err.message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Send Tokens</h1>
      
      {!account ? (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p>Please connect your wallet to send tokens.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
          {txHash && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              <p className="font-bold">Transaction submitted!</p>
              <p className="text-sm break-all">Hash: {txHash}</p>
            </div>
          )}
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p>{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSend}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recipient">
                Recipient Address
              </label>
              <input
                id="recipient"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="0x..."
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                Amount
              </label>
              <div className="flex">
                <input
                  id="amount"
                  type="number"
                  step="0.000001"
                  className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="0.0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
                <select
                  className="shadow border rounded-r bg-gray-50 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={selectedToken}
                  onChange={(e) => setSelectedToken(e.target.value)}
                >
                  <option value="ETH">ETH</option>
                  <option value="USDC">USDC</option>
                  <option value="USDT">USDT</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                type="submit"
                disabled={isSending}
              >
                {isSending ? 'Sending...' : 'Send'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SendContent;