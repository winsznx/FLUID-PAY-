import React, { useState, useEffect } from 'react';
import { FaExchangeAlt, FaChevronDown, FaHistory, FaArrowDown, FaCog } from 'react-icons/fa';

const Swap = ({ selectedChain }) => {
  const [fromToken, setFromToken] = useState('');
  const [toToken, setToToken] = useState('');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [showFromTokens, setShowFromTokens] = useState(false);
  const [showToTokens, setShowToTokens] = useState(false);
  const [slippage, setSlippage] = useState('0.5');
  const [maxFromAmount, setMaxFromAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [bridgeMode, setBridgeMode] = useState(false);
  const [toChain, setToChain] = useState('Ethereum');
  const [showSettings, setShowSettings] = useState(false);
  
  // Sample token data by chain
  const tokens = {
    'Ethereum': [
      { symbol: 'ETH', balance: 1.25, icon: 'Ξ', price: 3000 },
      { symbol: 'USDC', balance: 520, icon: '$', price: 1 },
      { symbol: 'DAI', balance: 200, icon: 'D', price: 1 },
      { symbol: 'LINK', balance: 45, icon: 'L', price: 15 }
    ],
    'Polygon': [
      { symbol: 'MATIC', balance: 2500, icon: 'M', price: 0.5 },
      { symbol: 'USDC', balance: 350, icon: '$', price: 1 },
      { symbol: 'WETH', balance: 0.5, icon: 'Ξ', price: 3000 },
      { symbol: 'AAVE', balance: 10, icon: 'A', price: 80 }
    ],
    'Arbitrum': [
      { symbol: 'ETH', balance: 0.8, icon: 'Ξ', price: 3000 },
      { symbol: 'ARB', balance: 500, icon: 'A', price: 1.5 },
      { symbol: 'USDC', balance: 600, icon: '$', price: 1 },
      { symbol: 'GMX', balance: 15, icon: 'G', price: 50 }
    ],
    'Optimism': [
      { symbol: 'ETH', balance: 0.9, icon: 'Ξ', price: 3000 },
      { symbol: 'OP', balance: 600, icon: 'O', price: 1.5 },
      { symbol: 'USDC', balance: 500, icon: '$', price: 1 },
      { symbol: 'SNX', balance: 200, icon: 'S', price: 3 }
    ],
    'Base': [
      { symbol: 'ETH', balance: 0.7, icon: 'Ξ', price: 3000 },
      { symbol: 'USDC', balance: 300, icon: '$', price: 1 },
      { symbol: 'DAI', balance: 450, icon: 'D', price: 1 },
      { symbol: 'CBETH', balance: 0.5, icon: 'C', price: 3100 }
    ]
  };

  // Available chains for bridging
  const chains = ['Ethereum', 'Polygon', 'Arbitrum', 'Optimism', 'Base'];

  // Set default tokens when chain changes
  useEffect(() => {
    if (tokens[selectedChain] && tokens[selectedChain].length > 0) {
      const defaultFromToken = tokens[selectedChain][0].symbol;
      setFromToken(defaultFromToken);
      
      // Set a different default for toToken
      const defaultToToken = tokens[selectedChain].length > 1 ? tokens[selectedChain][1].symbol : tokens[selectedChain][0].symbol;
      setToToken(defaultToToken);
      
      // Reset amounts
      setFromAmount('');
      setToAmount('');
      
      // Update max amount
      updateMaxAmount(defaultFromToken);
      
      // Update exchange rate
      updateExchangeRate(defaultFromToken, defaultToToken);
    }
    
    // Set default toChain
    if (selectedChain === 'Ethereum') {
      setToChain('Polygon');
    } else {
      setToChain('Ethereum');
    }
  }, [selectedChain]);

  // Update max amount when fromToken changes
  const updateMaxAmount = (token) => {
    if (token && tokens[selectedChain]) {
      const tokenData = tokens[selectedChain].find(t => t.symbol === token);
      if (tokenData) {
        setMaxFromAmount(tokenData.balance);
      }
    }
  };

  // Update exchange rate when tokens change
  const updateExchangeRate = (from, to) => {
    if (from && to && tokens[selectedChain]) {
      const fromTokenData = tokens[selectedChain].find(t => t.symbol === from);
      const toTokenData = tokens[selectedChain].find(t => t.symbol === to);
      
      if (fromTokenData && toTokenData) {
        const rate = toTokenData.price / fromTokenData.price;
        setExchangeRate(rate);
      }
    }
  };

  // Handle fromToken change
  useEffect(() => {
    updateMaxAmount(fromToken);
    updateExchangeRate(fromToken, toToken);
  }, [fromToken]);

  // Handle toToken change
  useEffect(() => {
    updateExchangeRate(fromToken, toToken);
  }, [toToken]);

  // Calculate toAmount when fromAmount changes
  useEffect(() => {
    if (fromAmount && exchangeRate) {
      const calculatedAmount = parseFloat(fromAmount) * exchangeRate;
      setToAmount(calculatedAmount.toFixed(6));
    } else {
      setToAmount('');
    }
  }, [fromAmount, exchangeRate]);

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
        setFromAmount('');
        setToAmount('');
        setTransactionStatus(null);
      }, 5000);
    }, 2000);
  };

  const handleTokenSelect = (type, token) => {
    if (type === 'from') {
      setFromToken(token);
      setShowFromTokens(false);
    } else {
      setToToken(token);
      setShowToTokens(false);
    }
  };

  const setMaxValue = () => {
    setFromAmount(maxFromAmount.toString());
  };

  const switchTokens = () => {
    const tempFromToken = fromToken;
    const tempFromAmount = fromAmount;
    
    setFromToken(toToken);
    setToToken(tempFromToken);
    
    setFromAmount(toAmount);
    setToAmount(tempFromAmount);
  };

  const toggleBridgeMode = () => {
    setBridgeMode(!bridgeMode);
  };

  return (
    <div className="max-w-lg mx-auto">
      {/* Hero section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Swap anytime, anywhere.</h1>
        <p className="text-gray-500">Swap tokens on the same chain, or across different chains. It's the future, but like... right now.</p>
      </div>
      
      {/* Swap Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6 relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <FaExchangeAlt className="mr-2 text-purple-500" /> 
            {bridgeMode ? 'Bridge Tokens' : 'Swap Tokens'}
          </h2>
          <div className="flex gap-2">
            <button 
              className={`px-3 py-1 rounded-md text-sm font-medium ${bridgeMode ? 'bg-gray-200 text-gray-700' : 'bg-purple-100 text-purple-700'}`}
              onClick={() => setBridgeMode(false)}
            >
              Swap
            </button>
            <button 
              className={`px-3 py-1 rounded-md text-sm font-medium ${bridgeMode ? 'bg-purple-100 text-purple-700' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setBridgeMode(true)}
            >
              Bridge
            </button>
            <button 
              className="p-2 text-gray-500 hover:text-purple-700 rounded-full hover:bg-purple-50"
              onClick={() => setShowSettings(!showSettings)}
            >
              <FaCog />
            </button>
          </div>
        </div>
        
        {showSettings && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <div className="mb-2 text-sm font-medium">Slippage Tolerance</div>
            <div className="flex gap-2 mb-3">
              {['0.1', '0.5', '1.0', '2.0'].map((value) => (
                <button
                  key={value}
                  className={`px-3 py-1 rounded-md text-sm ${slippage === value ? 'bg-purple-100 text-purple-700 font-medium' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setSlippage(value)}
                >
                  {value}%
                </button>
              ))}
              <div className="relative flex items-center">
                <input
                  type="text"
                  className="w-16 px-2 py-1 border border-gray-300 rounded-md text-sm"
                  placeholder="Custom"
                  value={!['0.1', '0.5', '1.0', '2.0'].includes(slippage) ? slippage : ''}
                  onChange={(e) => setSlippage(e.target.value)}
                />
                <span className="absolute right-2 text-gray-500">%</span>
              </div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {/* From Token Section */}
          <div className="mb-2">
            <div className="flex justify-between text-sm text-gray-500 mb-1 px-1">
              <span>{bridgeMode ? 'From ' + selectedChain : 'Sell'}</span>
              <span>Balance: {fromToken && tokens[selectedChain].find(t => t.symbol === fromToken)?.balance || '0'} {fromToken}</span>
            </div>
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <input
                  type="number"
                  step="0.000001"
                  min="0"
                  max={maxFromAmount}
                  className="w-3/5 bg-transparent text-3xl font-medium focus:outline-none"
                  placeholder="0"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  required
                />
                <div className="relative">
                  <button
                    type="button"
                    className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 rounded-full py-2 px-4"
                    onClick={() => setShowFromTokens(!showFromTokens)}
                  >
                    {fromToken && (
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-500 text-white">
                        {tokens[selectedChain].find(t => t.symbol === fromToken)?.icon}
                      </span>
                    )}
                    <span className="font-medium">{fromToken || 'Select'}</span>
                    <FaChevronDown className="text-xs" />
                  </button>
                  
                  {showFromTokens && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      <div className="p-2 border-b">
                        <input 
                          type="text" 
                          className="w-full p-2 border border-gray-300 rounded-md text-sm"
                          placeholder="Search tokens"
                        />
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        {tokens[selectedChain].map((token) => (
                          <div
                            key={token.symbol}
                            className="flex items-center justify-between p-3 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleTokenSelect('from', token.symbol)}
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white">
                                {token.icon}
                              </span>
                              <span className="font-medium">{token.symbol}</span>
                            </div>
                            <span className="text-gray-500 text-sm">{token.balance}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-1 text-gray-500 text-sm">
                {fromAmount && fromToken ? `≈ $${(fromAmount * tokens[selectedChain].find(t => t.symbol === fromToken)?.price).toFixed(2)}` : ''}
              </div>
            </div>
          </div>
          
          {/* Swap Direction Button */}
          <div className="flex justify-center -my-3 relative z-10">
            <button
              type="button"
              className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-md hover:bg-gray-50"
              onClick={switchTokens}
            >
              <FaArrowDown className="text-purple-600" />
            </button>
          </div>
          
          {/* To Token Section */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-500 mb-1 px-1">
              <span>{bridgeMode ? 'To ' + toChain : 'Buy'}</span>
              {!bridgeMode && (
                <span>Balance: {toToken && tokens[selectedChain].find(t => t.symbol === toToken)?.balance || '0'} {toToken}</span>
              )}
            </div>
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <input
                  type="number"
                  step="0.000001"
                  className="w-3/5 bg-transparent text-3xl font-medium focus:outline-none"
                  placeholder="0"
                  value={toAmount}
                  readOnly
                />
                <div className="relative">
                  {bridgeMode ? (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 rounded-full py-2 px-4"
                        onClick={() => {
                          const currentIndex = chains.indexOf(toChain);
                          const nextIndex = (currentIndex + 1) % chains.length;
                          if (chains[nextIndex] === selectedChain) {
                            setToChain(chains[(nextIndex + 1) % chains.length]);
                          } else {
                            setToChain(chains[nextIndex]);
                          }
                        }}
                      >
                        <span className="font-medium">{toChain}</span>
                        <FaChevronDown className="text-xs" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 rounded-full py-2 px-4"
                      onClick={() => setShowToTokens(!showToTokens)}
                    >
                      {toToken && (
                        <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-500 text-white">
                          {tokens[selectedChain].find(t => t.symbol === toToken)?.icon}
                        </span>
                      )}
                      <span className="font-medium">{toToken || 'Select'}</span>
                      <FaChevronDown className="text-xs" />
                    </button>
                  )}
                  
                  {showToTokens && !bridgeMode && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      <div className="p-2 border-b">
                        <input 
                          type="text" 
                          className="w-full p-2 border border-gray-300 rounded-md text-sm"
                          placeholder="Search tokens"
                        />
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        {tokens[selectedChain].map((token) => (
                          <div
                            key={token.symbol}
                            className="flex items-center justify-between p-3 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleTokenSelect('to', token.symbol)}
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white">
                                {token.icon}
                              </span>
                              <span className="font-medium">{token.symbol}</span>
                            </div>
                            <span className="text-gray-500 text-sm">{token.balance}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-1 text-gray-500 text-sm">
                {toAmount && toToken && !bridgeMode ? `≈ $${(toAmount * tokens[selectedChain].find(t => t.symbol === toToken)?.price).toFixed(2)}` : ''}
              </div>
            </div>
          </div>
          
          {/* Exchange Rate */}
          {fromToken && toToken && fromAmount && !bridgeMode && (
            <div className="flex justify-between text-sm text-gray-600 mb-6 px-1">
              <span>Exchange Rate:</span>
              <span>1 {fromToken} = {exchangeRate.toFixed(6)} {toToken}</span>
            </div>
          )}
          
          {/* Bridge Fee */}
          {bridgeMode && (
            <div className="flex justify-between text-sm text-gray-600 mb-6 px-1">
              <span>Bridge Fee:</span>
              <span>0.1% + Gas</span>
            </div>
          )}
          
          {/* Max Button */}
          <div className="flex justify-end mb-3">
            <button
              type="button"
              className="text-sm text-purple-600 hover:text-purple-800 font-medium"
              onClick={setMaxValue}
            >
              Max
            </button>
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 rounded-lg text-white font-medium transition ${isSubmitting ? 'bg-purple-400' : 'bg-purple-600 hover:bg-purple-700'}`}
            disabled={isSubmitting || !fromAmount || !toAmount || parseFloat(fromAmount) <= 0 || parseFloat(fromAmount) > maxFromAmount}
          >
            {isSubmitting ? 'Processing...' : (parseFloat(fromAmount) > maxFromAmount ? 'Insufficient Balance' : bridgeMode ? 'Bridge' : 'Swap')}
          </button>
          
          {/* Transaction Status */}
          {transactionStatus && (
            <div className={`mt-4 p-4 rounded-lg ${transactionStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              <div className="font-medium mb-1">
                {transactionStatus.success ? 'Transaction Successful!' : 'Transaction Failed'}
              </div>
              {transactionStatus.hash && (
                <div className="text-sm">
                  <span>Hash: </span>
                  <a href="#" className="underline">{transactionStatus.hash.substring(0, 8)}...{transactionStatus.hash.substring(transactionStatus.hash.length - 8)}</a>
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Swap;