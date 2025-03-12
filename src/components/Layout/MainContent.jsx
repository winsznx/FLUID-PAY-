import React from 'react';
import FeatureCard from '../FeatureCard/FeatureCard';
import { FaClone, FaExchangeAlt, FaRandom, FaMoneyBillWave, FaBookmark, FaLock } from 'react-icons/fa';

const MainContent = () => {
  return (
    <div className="flex-1 p-6">
      <div className="mb-8 bg-blue-600 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-4">MAKING CRYPTO SIMPLER</h1>
        <p className="mb-6 max-w-md">
          Fluid Pay adds super powers to your wallet, to make your crypto journey faster, simpler and maybe even a little bit more fun.
        </p>
        
        <div className="ml-auto w-32 h-32 bg-white rounded-xl flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center">
            <span className="text-white">✓</span>
          </div>
          <div className="text-blue-600 text-sm font-medium mt-2">Success!</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FeatureCard 
          title="ONE SAFE, ALL CHAINS"
          description="Click and clone your Safe on any chain. Easy peasy."
          buttonText="Clone my safe"
          icon={<FaClone />}
        />
        
        <FeatureCard 
          title="SWAP AND BRIDGE"
          description="Enjoy crosschain swaps lightening fast with Fluid Pay Swap"
          buttonText="Make a swap"
          icon={<FaExchangeAlt />}
        />
        
        <FeatureCard 
          title={`DID YOU SAY "DISPERSE?"`}
          description="Beloved by projects and individuals, send tokens to multiple addresses at the same time with disperse"
          buttonText="Disperse tokens"
          icon={<FaRandom />}
        />
        
        <FeatureCard 
          title="CLAIM YOUR STREAM"
          description="Whether it's a salary, a grant or something else, Fluid Pay will help you claim it."
          buttonText="Claim your stream"
          icon={<FaMoneyBillWave />}
        />
        
        <FeatureCard 
          title="NATIVE ADDRESS BOOK"
          description="Never forget and address or fall for an injected address scam again!"
          buttonText="Add Contact"
          icon={<FaBookmark />}
        />
        
        <FeatureCard 
          title="STAY SAFE, REVOKE!"
          description="Take control of your contract approvals and check who can spend your tokens"
          buttonText="Revoke allowances"
          icon={<FaLock />}
        />
      </div>
    </div>
  );
}

export default MainContent;