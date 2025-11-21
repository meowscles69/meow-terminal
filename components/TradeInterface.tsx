import React, { useState } from 'react';
import { Button } from './Button';
import { Token } from '../types';

interface TradeInterfaceProps {
  token: Token;
  onTrade: (type: 'buy' | 'sell', amount: number) => void;
  balance: number;
}

export const TradeInterface: React.FC<TradeInterfaceProps> = ({ token, onTrade, balance }) => {
  const [isBuy, setIsBuy] = useState(true);
  const [amount, setAmount] = useState<string>('0.0');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (val > 0) {
      onTrade(isBuy ? 'buy' : 'sell', val);
      setAmount('0.0');
    }
  };

  const quickAmounts = isBuy ? [0.1, 0.5, 1.0] : [25, 50, 100]; 

  return (
    <div className="bg-neu-base dark:bg-neu-dark-base rounded-[30px] p-6 shadow-neu dark:shadow-neu-dark transition-colors duration-300">
      {/* Toggle Switch */}
      <div className="flex bg-neu-base dark:bg-neu-dark-base rounded-2xl p-2 mb-6 shadow-neu-pressed dark:shadow-neu-dark-pressed">
        <button
          onClick={() => setIsBuy(true)}
          className={`flex-1 py-3 rounded-xl text-sm font-extrabold transition-all duration-300 ${
            isBuy ? 'shadow-neu dark:shadow-neu-dark text-green-500 bg-neu-base dark:bg-neu-dark-base' : 'text-neu-muted dark:text-neu-dark-muted hover:text-neu-text dark:hover:text-neu-dark-text'
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setIsBuy(false)}
          className={`flex-1 py-3 rounded-xl text-sm font-extrabold transition-all duration-300 ${
            !isBuy ? 'shadow-neu dark:shadow-neu-dark text-red-500 bg-neu-base dark:bg-neu-dark-base' : 'text-neu-muted dark:text-neu-dark-muted hover:text-neu-text dark:hover:text-neu-dark-text'
          }`}
        >
          Sell
        </button>
      </div>

      <div className="flex justify-between mb-2 px-2">
        <span className="text-xs text-neu-muted dark:text-neu-dark-muted font-bold uppercase">{isBuy ? 'Buy' : 'Sell'} {token.ticker}</span>
        <span className="text-xs text-neu-muted dark:text-neu-dark-muted font-bold">Slippage: 1%</span>
      </div>

      <div className="relative mb-6">
        <input 
          type="number" 
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-neu-base dark:bg-neu-dark-base shadow-neu-pressed dark:shadow-neu-dark-pressed rounded-2xl py-4 px-6 text-right text-neu-text dark:text-neu-dark-text font-mono text-xl focus:outline-none transition-colors"
          placeholder="0.0"
          step="0.01"
        />
        <div className="absolute left-6 top-5 flex items-center gap-2 pointer-events-none">
          <span className="text-sm font-bold text-neu-muted dark:text-neu-dark-muted">{isBuy ? 'SOL' : token.ticker}</span>
        </div>
      </div>

      <div className="flex gap-3 mb-8">
        {quickAmounts.map((amt) => (
            <button 
                key={amt}
                type="button"
                onClick={() => setAmount(amt.toString())}
                className="flex-1 bg-neu-base dark:bg-neu-dark-base shadow-neu dark:shadow-neu-dark hover:shadow-neu-sm dark:hover:shadow-neu-dark-sm active:shadow-neu-pressed dark:active:shadow-neu-dark-pressed rounded-xl py-2 text-xs font-bold text-neu-text dark:text-neu-dark-text transition-all"
            >
                {isBuy ? `${amt} SOL` : `${amt}%`}
            </button>
        ))}
      </div>

      <Button 
        onClick={handleSubmit} 
        className="w-full py-4" 
        variant={isBuy ? 'success' : 'danger'}
      >
        {isBuy ? `Buy ${token.ticker}` : `Sell ${token.ticker}`}
      </Button>
      
      <div className="mt-6 text-center">
          <span className="text-xs font-bold text-neu-muted dark:text-neu-dark-muted">Balance: {balance.toFixed(2)} SOL</span>
      </div>
    </div>
  );
};