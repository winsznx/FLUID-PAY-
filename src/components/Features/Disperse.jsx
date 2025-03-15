import React, { useState, useEffect } from 'react';
import  {ethers}  from 'ethers';
import { FaRandom, FaInfoCircle, FaSpinner } from 'react-icons/fa';

const Disperse = ({ selectedChain }) => {
  const [tokenAddress, setTokenAddress] = useState('native');
  const [recipientData, setRecipientData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [totalAmount, setTotalAmount] = useState('0');
  const [parsedRecipients, setParsedRecipients] = useState([]);
  const [parsedAmounts, setParsedAmounts] = useState([]);
  const [tokenList, setTokenList] = useState([
    { address: 'native', symbol: 'ETH', name: 'Native Token' },
    // Add default tokens based on selected chain
  ]);

  // Update token list when chain changes
  useEffect(() => {
    // This would be replaced with actual token data for each chain
    const chainTokens = {
      'Ethereum': [
        { address: 'native', symbol: 'ETH', name: 'Ethereum' },
        { address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', symbol: 'USDC', name: 'USD Coin' },
        { address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', symbol: 'USDT', name: 'Tether USD' },
      ],
      'Scroll': [
        { address: 'native', symbol: 'ETH', name: 'Ethereum' },
        // Add Scroll-specific tokens when available
      ],
      // Add other chains as needed
    };

    setTokenList(chainTokens[selectedChain] || [{ address: 'native', symbol: 'ETH', name: 'Native Token' }]);
  }, [selectedChain]);

  // Parse the recipients and amounts from the textarea
  useEffect(() => {
    if (!recipientData.trim()) {
      setParsedRecipients([]);
      setParsedAmounts([]);
      setTotalAmount('0');
      return;
    }

    try {
      // Split by new lines
      const lines = recipientData.split('\n').filter(line => line.trim() !== '');
      const recipients = [];
      const amounts = [];
      let total = ethers.BigNumber.from(0);

      lines.forEach(line => {
        // Split each line by comma, space, or tab
        const [address, amountStr] = line.split(/[,\s\t]+/).filter(item => item);
        
        if (!address || !amountStr) {
          throw new Error(`Invalid line format: ${line}`);
        }

        // Validate address
        if (!ethers.utils.isAddress(address)) {
          throw new Error(`Invalid address: ${address}`);
        }

        // Parse amount - convert to wei (or smallest token unit)
        const amount = ethers.utils.parseEther(amountStr);
        
        recipients.push(address);
        amounts.push(amount);
        total = total.add(amount);
      });

      setParsedRecipients(recipients);
      setParsedAmounts(amounts);
      setTotalAmount(ethers.utils.formatEther(total));
      setError('');
    } catch (err) {
      setError(`Error parsing input: ${err.message}`);
    }
  }, [recipientData]);

  const handleDisperseTokens = async () => {
    if (parsedRecipients.length === 0) {
      setError('Please provide valid recipient information.');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Check if wallet is connected
      if (!window.ethereum) {
        throw new Error('No wallet detected. Please install MetaMask or another Ethereum wallet.');
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      // This is where you would interact with your smart contract
      // For now, we'll simulate a successful transaction after a delay
      setTimeout(() => {
        setSuccess(`Successfully dispersed tokens to ${parsedRecipients.length} recipients!`);
        setRecipientData('');
        setIsLoading(false);
      }, 2000);

      // In actual implementation:
      // 1. Get the disperse contract
      // const disperseContract = new ethers.Contract(DISPERSE_CONTRACT_ADDRESS, DISPERSE_ABI, signer);
      
      // 2. Make the transaction
      // if (tokenAddress === 'native') {
      //   // Native token disperse
      //   const totalValue = parsedAmounts.reduce((sum, amount) => sum.add(amount), ethers.BigNumber.from(0));
      //   const tx = await disperseContract.disperseETH(parsedRecipients, parsedAmounts, { value: totalValue });
      //   await tx.wait();
      // } else {
      //   // ERC20 token disperse
      //   const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
      //   const totalAmount = parsedAmounts.reduce((sum, amount) => sum.add(amount), ethers.BigNumber.from(0));
      //   await tokenContract.approve(DISPERSE_CONTRACT_ADDRESS, totalAmount);
      //   const tx = await disperseContract.disperseToken(tokenAddress, parsedRecipients, parsedAmounts);
      //   await tx.wait();
      // }
      
    } catch (err) {
      setError(`Transaction failed: ${err.message}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-600 rounded-xl p-8 text-white">
        <div className="flex items-center mb-4">
          <FaRandom className="text-2xl mr-2" />
          <h1 className="text-2xl font-bold">Disperse Tokens</h1>
        </div>
        <p className="mb-6">
          Send tokens to multiple addresses in a single transaction. Perfect for airdrops, team payments, and more.
        </p>
        <div className="text-sm bg-blue-700 inline-block px-3 py-1 rounded">
          Currently on: <strong>{selectedChain}</strong>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow">
        <h2 className="text-lg font-semibold mb-4">Select Token</h2>
        
        <div className="mb-6">
          <select 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            disabled={isLoading}
          >
            {tokenList.map(token => (
              <option key={token.address} value={token.address}>
                {token.symbol} - {token.name}
              </option>
            ))}
            <option value="custom">Custom Token</option>
          </select>
          
          {tokenAddress === 'custom' && (
            <input
              type="text"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Token Contract Address (0x...)"
              onChange={(e) => setTokenAddress(e.target.value)}
              disabled={isLoading}
            />
          )}
        </div>
        
        <h2 className="text-lg font-semibold mb-2">Recipients and Amounts</h2>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <FaInfoCircle className="mr-1" />
          <span>Enter one address and amount per line (format: address, amount)</span>
        </div>
        
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg h-40 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="0x1234...5678, 0.1
0xabcd...ef01, 0.25"
          value={recipientData}
          onChange={(e) => setRecipientData(e.target.value)}
          disabled={isLoading}
        ></textarea>
        
        {parsedRecipients.length > 0 && (
          <div className="mt-2 text-sm text-gray-600">
            Recipients: {parsedRecipients.length} | Total Amount: {totalAmount} {tokenAddress === 'native' ? 'ETH' : 'Tokens'}
          </div>
        )}
        
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}
        
        <button
          className={`mt-6 w-full p-3 rounded-lg font-medium flex items-center justify-center 
            ${isLoading || parsedRecipients.length === 0 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
          onClick={handleDisperseTokens}
          disabled={isLoading || parsedRecipients.length === 0}
        >
          {isLoading ? (
            <>
              <FaSpinner className="animate-spin mr-2" />
              Processing...
            </>
          ) : (
            <>
              <FaRandom className="mr-2" />
              Disperse Tokens
            </>
          )}
        </button>
        
        <div className="mt-2 text-xs text-gray-500">
          Gas costs will be optimized by batching all transfers in a single transaction.
        </div>
      </div>
    </div>
  );
};

export default Disperse;