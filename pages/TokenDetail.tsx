import React, { useEffect, useState } from 'react';
import { Token, Trade, Comment } from '../types';
import { BondingCurveChart } from '../components/BondingCurveChart';
import { TradeInterface } from '../components/TradeInterface';
import { ArrowLeft, MessageSquare, User, Twitter, Globe, MessageCircle, Rocket } from 'lucide-react';
import { Card } from '../components/Card';

interface TokenDetailProps {
  token: Token;
  onBack: () => void;
  onTrade: (token: Token, type: 'buy' | 'sell', amount: number) => void;
}

export const TokenDetail: React.FC<TokenDetailProps> = ({ token, onBack, onTrade }) => {
  const [comments, setComments] = useState<Comment[]>([
    { id: '1', user: 'Degen_123', text: 'Dev is based. Holding this to 1M.', timestamp: Date.now() - 100000 },
    { id: '2', user: 'SolanaWhale', text: 'Chart looking bullish, aping in.', timestamp: Date.now() - 50000 },
    { id: '3', user: 'PepeEnjoyer', text: 'Can someone check the metadata?', timestamp: Date.now() - 20000 }
  ]);

  const [recentTrades, setRecentTrades] = useState<Trade[]>([]);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (token.status === 'raydium') return;

      if (Math.random() > 0.7) {
         const isBuy = Math.random() > 0.4;
         const newTrade: Trade = {
             id: Math.random().toString(),
             type: isBuy ? 'buy' : 'sell',
             amount: parseFloat((Math.random() * 2).toFixed(2)),
             tokenAmount: 1000,
             user: `User${Math.floor(Math.random() * 9999)}`,
             timestamp: Date.now(),
             txHash: 'tx...'
         };
         setRecentTrades(prev => [newTrade, ...prev].slice(0, 10));
         
         if (isBuy) {
             setShake(true);
             setTimeout(() => setShake(false), 500);
         }
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [token.status]);

  const handleInternalTrade = (type: 'buy' | 'sell', amount: number) => {
      onTrade(token, type, amount);
      if (type === 'buy') {
          setShake(true);
          setTimeout(() => setShake(false), 500);
          setRecentTrades(prev => [{
             id: Math.random().toString(),
             type: 'buy',
             amount: amount,
             tokenAmount: 1000, 
             user: 'You',
             timestamp: Date.now(),
             txHash: 'pending'
          }, ...prev]);
      }
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 py-6 animate-in fade-in duration-300 ${shake ? 'animate-shake' : ''}`}>
      <button onClick={onBack} className="flex items-center text-neu-muted dark:text-neu-dark-muted hover:text-neu-text dark:hover:text-neu-dark-text mb-6 transition-colors font-bold bg-neu-base dark:bg-neu-dark-base px-4 py-2 rounded-xl shadow-neu dark:shadow-neu-dark active:shadow-neu-pressed dark:active:shadow-neu-dark-pressed w-fit">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to board
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Chart & Thread */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Token Info Header */}
          <div className="flex items-start gap-6 bg-neu-base dark:bg-neu-dark-base p-6 rounded-[30px] shadow-neu dark:shadow-neu-dark transition-colors duration-300">
            <div className="w-24 h-24 rounded-2xl shadow-neu dark:shadow-neu-dark p-1 bg-neu-base dark:bg-neu-dark-base shrink-0">
                <img 
                src={token.imageUrl} 
                alt={token.name} 
                className="w-full h-full rounded-xl object-cover" 
                />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-black text-neu-text dark:text-neu-dark-text flex items-center gap-2">
                    {token.name} <span className="text-momo-500 text-lg font-mono">({token.ticker})</span>
                  </h1>
                  {token.status === 'raydium' && (
                      <span className="bg-neu-base dark:bg-neu-dark-base text-green-500 shadow-neu dark:shadow-neu-dark px-4 py-2 rounded-full text-xs font-extrabold flex items-center gap-2">
                          <Rocket className="w-4 h-4" /> GRADUATED
                      </span>
                  )}
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-4 text-xs text-neu-muted dark:text-neu-dark-muted font-bold">
                <span className="flex items-center gap-1 bg-neu-base dark:bg-neu-dark-base shadow-neu-pressed dark:shadow-neu-dark-pressed px-3 py-1 rounded-lg">
                    <User className="h-3 w-3" /> {token.creator.slice(0,6)}
                </span>
                <span className="text-green-600 bg-neu-base dark:bg-neu-dark-base shadow-neu-pressed dark:shadow-neu-dark-pressed px-3 py-1 rounded-lg">
                    MC: ${token.marketCap.toLocaleString()}
                </span>
                <span className="bg-neu-base dark:bg-neu-dark-base shadow-neu-pressed dark:shadow-neu-dark-pressed px-3 py-1 rounded-lg">
                    {new Date(token.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex gap-3 mt-4">
                  {token.twitter && (
                      <a href="#" className="text-neu-muted dark:text-neu-dark-muted hover:text-blue-400 bg-neu-base dark:bg-neu-dark-base shadow-neu dark:shadow-neu-dark p-2 rounded-lg active:shadow-neu-pressed dark:active:shadow-neu-dark-pressed transition-all"><Twitter className="w-4 h-4" /></a>
                  )}
                  {token.telegram && (
                      <a href="#" className="text-neu-muted dark:text-neu-dark-muted hover:text-blue-500 bg-neu-base dark:bg-neu-dark-base shadow-neu dark:shadow-neu-dark p-2 rounded-lg active:shadow-neu-pressed dark:active:shadow-neu-dark-pressed transition-all"><MessageCircle className="w-4 h-4" /></a>
                  )}
                  {token.website && (
                      <a href="#" className="text-neu-muted dark:text-neu-dark-muted hover:text-pink-400 bg-neu-base dark:bg-neu-dark-base shadow-neu dark:shadow-neu-dark p-2 rounded-lg active:shadow-neu-pressed dark:active:shadow-neu-dark-pressed transition-all"><Globe className="w-4 h-4" /></a>
                  )}
              </div>

              <p className="mt-4 text-neu-text dark:text-neu-dark-text font-medium leading-relaxed text-sm">
                {token.description}
              </p>
            </div>
          </div>

          {/* Chart */}
          <BondingCurveChart progress={token.bondingCurveProgress} />

          {/* Thread/Comments */}
          <div className="bg-neu-base dark:bg-neu-dark-base rounded-[30px] shadow-neu dark:shadow-neu-dark p-6 transition-colors duration-300">
            <div className="flex items-center justify-between mb-6 border-b border-gray-200/50 dark:border-gray-700/50 pb-2">
                <h3 className="text-lg font-extrabold text-neu-text dark:text-neu-dark-text flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" /> Thread
                </h3>
            </div>
            
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {comments.map(c => (
                    <div key={c.id} className="flex gap-4 bg-neu-base dark:bg-neu-dark-base p-4 rounded-2xl shadow-neu dark:shadow-neu-dark border border-white/40 dark:border-black/20">
                        <div className="w-10 h-10 rounded-full shadow-neu-pressed dark:shadow-neu-dark-pressed bg-neu-base dark:bg-neu-dark-base flex items-center justify-center shrink-0">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-momo-300 to-purple-300 opacity-50" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold text-momo-600 bg-neu-base dark:bg-neu-dark-base shadow-neu dark:shadow-neu-dark px-2 py-0.5 rounded">{c.user}</span>
                                <span className="text-[10px] text-neu-muted dark:text-neu-dark-muted font-bold">{new Date(c.timestamp).toLocaleTimeString()}</span>
                            </div>
                            <p className="text-sm text-neu-text dark:text-neu-dark-text font-medium">{c.text}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="pt-6 mt-2">
                 <div className="flex gap-4">
                    <textarea 
                        className="flex-1 bg-neu-base dark:bg-neu-dark-base shadow-neu-pressed dark:shadow-neu-dark-pressed rounded-2xl p-3 text-sm text-neu-text dark:text-neu-dark-text focus:outline-none font-medium resize-none placeholder-neu-muted dark:placeholder-neu-dark-muted"
                        placeholder="Add a comment..." 
                        rows={1}
                    />
                    <button className="bg-neu-base dark:bg-neu-dark-base shadow-neu dark:shadow-neu-dark active:shadow-neu-pressed dark:active:shadow-neu-dark-pressed text-neu-text dark:text-neu-dark-text px-6 rounded-2xl font-bold text-sm transition-all hover:text-momo-500">
                        Post
                    </button>
                 </div>
            </div>
          </div>
        </div>

        {/* Right Column: Trade & Stats */}
        <div className="space-y-8">
          
          {token.status === 'raydium' ? (
              <div className="bg-neu-base dark:bg-neu-dark-base rounded-[30px] p-8 shadow-neu dark:shadow-neu-dark text-center transition-colors duration-300">
                  <div className="w-20 h-20 bg-neu-base dark:bg-neu-dark-base shadow-neu dark:shadow-neu-dark rounded-full flex items-center justify-center mx-auto mb-6">
                    <Rocket className="w-10 h-10 text-green-500 animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-black text-neu-text dark:text-neu-dark-text mb-2">Graduated!</h3>
                  <p className="text-neu-muted dark:text-neu-dark-muted text-sm font-bold mb-6">The bonding curve is complete. Liquidity is now on Raydium.</p>
                  <a href="#" className="block w-full bg-neu-base dark:bg-neu-dark-base shadow-neu dark:shadow-neu-dark hover:shadow-neu-sm dark:hover:shadow-neu-dark-sm active:shadow-neu-pressed dark:active:shadow-neu-dark-pressed text-green-600 font-extrabold py-4 rounded-xl transition-all">
                      View on Raydium
                  </a>
              </div>
          ) : (
              <TradeInterface 
                token={token} 
                onTrade={handleInternalTrade} 
                balance={12.5} 
              />
          )}
          
          <div className="bg-neu-base dark:bg-neu-dark-base rounded-[30px] p-6 shadow-neu dark:shadow-neu-dark transition-colors duration-300">
            <h3 className="font-bold text-neu-muted dark:text-neu-dark-muted mb-6 text-xs uppercase tracking-widest">Bonding Curve</h3>
            <div className="space-y-3">
                <div className="flex justify-between text-xs mb-1 font-bold">
                    <span className="text-neu-text dark:text-neu-dark-text">To Raydium</span>
                    <span className="text-momo-500 font-mono">{token.bondingCurveProgress.toFixed(1)}%</span>
                </div>
                 <div className="w-full h-4 bg-neu-base dark:bg-neu-dark-base shadow-neu-pressed dark:shadow-neu-dark-pressed rounded-full overflow-hidden">
                     <div className="h-full bg-gradient-to-r from-momo-400 to-purple-500" style={{ width: `${token.bondingCurveProgress}%` }}></div>
                 </div>
                 <p className="text-[11px] text-neu-muted dark:text-neu-dark-muted font-bold mt-2 leading-tight">
                     Target: $69,000 Market Cap.
                 </p>
            </div>
          </div>

          <div className="bg-neu-base dark:bg-neu-dark-base rounded-[30px] p-6 shadow-neu dark:shadow-neu-dark transition-colors duration-300">
             <h3 className="font-bold text-neu-muted dark:text-neu-dark-muted mb-6 text-xs uppercase tracking-widest">Recent Trades</h3>
             <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {recentTrades.map(trade => (
                    <div key={trade.id} className="flex justify-between items-center text-xs animate-in slide-in-from-right-2 border-b border-gray-200/50 dark:border-gray-700/50 pb-2 last:border-0">
                        <div className="flex items-center gap-3">
                             <div className={`w-8 h-8 rounded-full shadow-neu dark:shadow-neu-dark flex items-center justify-center text-[10px] font-black ${trade.type === 'buy' ? 'text-green-500' : 'text-red-500'}`}>
                                 {trade.type === 'buy' ? 'B' : 'S'}
                             </div>
                             <span className="text-neu-text dark:text-neu-dark-text font-bold">{trade.user}</span>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-neu-text dark:text-neu-dark-text font-mono font-bold">{trade.amount} SOL</span>
                            <span className="text-[10px] text-neu-muted dark:text-neu-dark-muted font-bold">{trade.tokenAmount} {token.ticker}</span>
                        </div>
                    </div>
                ))}
                {recentTrades.length === 0 && <div className="text-center text-neu-muted dark:text-neu-dark-muted text-xs py-4 font-bold">No trades yet</div>}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};