import React from 'react';
import { Token } from '../types';
import { Card } from '../components/Card';
import { Crown, Rocket, Search, Terminal } from 'lucide-react';
import { generateRoast } from '../services/gemini';

interface HomeProps {
  tokens: Token[];
  onSelectToken: (token: Token) => void;
}

export const Home: React.FC<HomeProps> = ({ tokens, onSelectToken }) => {
  const sortedTokens = [...tokens].sort((a, b) => b.marketCap - a.marketCap);
  const king = sortedTokens.find(t => t.status === 'bonding_curve') || sortedTokens[0];
  const others = sortedTokens.filter(t => t.id !== king?.id);
  const [roast, setRoast] = React.useState<string>('');

  React.useEffect(() => {
    if (king) {
        generateRoast(king.name).then(setRoast);
    }
  }, [king]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      
      {/* King of the Hill Section */}
      {king && (
        <section className="mb-12">
            <div 
                onClick={() => onSelectToken(king)}
                className="relative bg-neu-base dark:bg-neu-dark-base rounded-[30px] p-8 shadow-neu dark:shadow-neu-dark flex flex-col md:flex-row gap-8 items-center cursor-pointer hover:shadow-neu-sm dark:hover:shadow-neu-dark-sm transition-all group border border-white/40 dark:border-black/20"
            >
                <div className="relative shrink-0">
                     <div className="w-40 h-40 md:w-52 md:h-52 rounded-2xl shadow-neu dark:shadow-neu-dark p-1 bg-neu-base dark:bg-neu-dark-base">
                        <img src={king.imageUrl} alt={king.name} className="w-full h-full rounded-xl object-cover" />
                     </div>
                     <div className="absolute -top-4 -left-4 bg-neu-base dark:bg-neu-dark-base text-yellow-500 shadow-neu dark:shadow-neu-dark px-4 py-2 rounded-full flex items-center gap-2 z-10 font-extrabold text-xs tracking-wider">
                        <Crown className="w-4 h-4 fill-current" /> KING
                     </div>
                </div>
                
                <div className="flex-1 text-center md:text-left space-y-4">
                    <h2 className="text-4xl font-black text-neu-text dark:text-neu-dark-text flex items-center justify-center md:justify-start gap-3">
                         {king.name} <span className="text-momo-500 text-2xl font-mono">[{king.ticker}]</span>
                    </h2>
                    <p className="text-neu-text/80 dark:text-neu-dark-text/80 text-lg font-medium max-w-2xl leading-relaxed">
                        {king.description}
                    </p>
                    
                    {roast && (
                        <div className="inline-block px-4 py-2 rounded-xl bg-neu-base dark:bg-neu-dark-base shadow-neu-pressed dark:shadow-neu-dark-pressed text-xs text-momo-600 font-bold italic">
                            AI Roast: "{roast}"
                        </div>
                    )}

                    <div className="flex items-center justify-center md:justify-start gap-8 pt-4">
                        <div className="bg-neu-base dark:bg-neu-dark-base px-5 py-3 rounded-2xl shadow-neu dark:shadow-neu-dark">
                            <div className="text-[10px] text-neu-muted dark:text-neu-dark-muted uppercase font-bold tracking-wider">Market Cap</div>
                            <div className="text-2xl text-green-500 font-mono font-black">${king.marketCap.toLocaleString()}</div>
                        </div>
                         <div className="bg-neu-base dark:bg-neu-dark-base px-5 py-3 rounded-2xl shadow-neu dark:shadow-neu-dark">
                            <div className="text-[10px] text-neu-muted dark:text-neu-dark-muted uppercase font-bold tracking-wider">Replies</div>
                            <div className="text-2xl text-neu-text dark:text-neu-dark-text font-mono font-black">{king.replies}</div>
                        </div>
                    </div>

                    <div className="mt-4 pt-2">
                        <div className="flex justify-between text-xs text-neu-muted dark:text-neu-dark-muted font-bold mb-2 px-1">
                            <span>Bonding Curve</span>
                            <span>{king.bondingCurveProgress.toFixed(0)}%</span>
                        </div>
                        <div className="w-full h-4 bg-neu-base dark:bg-neu-dark-base shadow-neu-pressed dark:shadow-neu-dark-pressed rounded-full overflow-hidden">
                             <div 
                                className="h-full bg-gradient-to-r from-momo-400 to-purple-400 rounded-full" 
                                style={{ width: `${king.bondingCurveProgress}%` }}
                             ></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      )}

      {/* Filter / Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
         <div className="relative w-full md:max-w-md group">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-neu-muted dark:text-neu-dark-muted group-focus-within:text-momo-500 transition-colors" />
            <input 
                type="text" 
                placeholder="Search for token..." 
                className="w-full bg-neu-base dark:bg-neu-dark-base shadow-neu-pressed dark:shadow-neu-dark-pressed rounded-2xl pl-12 pr-4 py-3 text-sm font-bold text-neu-text dark:text-neu-dark-text focus:outline-none transition-all" 
            />
         </div>
         
         <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-4 md:pb-0 px-2">
             <button className="whitespace-nowrap text-momo-500 font-extrabold text-sm px-6 py-3 bg-neu-base dark:bg-neu-dark-base rounded-xl shadow-neu dark:shadow-neu-dark active:shadow-neu-pressed dark:active:shadow-neu-dark-pressed transition-all flex items-center gap-2">
                <Terminal className="w-4 h-4" /> Terminal
             </button>
             <button className="whitespace-nowrap text-neu-text dark:text-neu-dark-text font-bold text-sm px-6 py-3 bg-neu-base dark:bg-neu-dark-base rounded-xl shadow-neu dark:shadow-neu-dark hover:shadow-neu-sm dark:hover:shadow-neu-dark-sm active:shadow-neu-pressed dark:active:shadow-neu-dark-pressed transition-all">
                New Coins
             </button>
             <button className="whitespace-nowrap text-neu-text dark:text-neu-dark-text font-bold text-sm px-6 py-3 bg-neu-base dark:bg-neu-dark-base rounded-xl shadow-neu dark:shadow-neu-dark hover:shadow-neu-sm dark:hover:shadow-neu-dark-sm active:shadow-neu-pressed dark:active:shadow-neu-dark-pressed transition-all">
                Graduate Soon
             </button>
         </div>
      </div>

      {/* Token Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {others.map(token => (
          <Card key={token.id} hoverEffect onClick={() => onSelectToken(token)} className="relative overflow-visible">
            {token.status === 'raydium' && (
                <div className="absolute -top-2 -right-2 z-10">
                    <span className="bg-neu-base dark:bg-neu-dark-base text-green-500 border border-white dark:border-gray-700 text-[10px] font-extrabold px-3 py-1 rounded-full shadow-neu dark:shadow-neu-dark flex items-center gap-1">
                        <Rocket className="w-3 h-3" /> DEX
                    </span>
                </div>
            )}
            
            <div className="flex gap-4 mb-4">
                <div className="w-20 h-20 rounded-xl shadow-neu dark:shadow-neu-dark p-1 bg-neu-base dark:bg-neu-dark-base shrink-0">
                     <img src={token.imageUrl} alt={token.name} className="w-full h-full rounded-lg object-cover" />
                </div>
                <div className="overflow-hidden py-1">
                    <h3 className="text-base font-black text-neu-text dark:text-neu-dark-text truncate leading-tight">{token.name}</h3>
                    <p className="text-xs text-momo-500 font-bold mb-2 font-mono">{token.ticker}</p>
                    <p className="text-[11px] text-neu-muted dark:text-neu-dark-muted font-semibold leading-tight line-clamp-2">{token.description}</p>
                </div>
            </div>
            
            <div className="space-y-3">
                 <div className="bg-neu-base dark:bg-neu-dark-base shadow-neu-pressed dark:shadow-neu-dark-pressed rounded-xl p-2 flex justify-between items-center">
                    <span className="text-[10px] text-neu-muted dark:text-neu-dark-muted font-bold uppercase">MC</span>
                    <span className="text-sm text-green-600 font-mono font-bold">${token.marketCap.toLocaleString()}</span>
                 </div>
                 
                 {token.status === 'raydium' ? (
                     <div className="w-full py-2 text-center">
                         <span className="text-xs text-green-500 font-black tracking-wide">GRADUATED 🎓</span>
                     </div>
                 ) : (
                     <div className="pt-1">
                        <div className="flex justify-between text-[10px] text-neu-muted dark:text-neu-dark-muted font-bold mb-1">
                            <span>Progress</span>
                            <span>{token.bondingCurveProgress.toFixed(0)}%</span>
                        </div>
                        <div className="relative h-2 w-full bg-neu-base dark:bg-neu-dark-base shadow-neu-pressed dark:shadow-neu-dark-pressed rounded-full overflow-hidden">
                            <div 
                                className="absolute top-0 left-0 h-full bg-momo-400"
                                style={{ width: `${token.bondingCurveProgress}%` }}
                            ></div>
                        </div>
                     </div>
                 )}
                 
                 <div className="flex items-center gap-2 pt-2 border-t border-gray-200/50 dark:border-gray-700/50">
                    <div className="w-5 h-5 rounded-full bg-neu-base dark:bg-neu-dark-base shadow-neu dark:shadow-neu-dark flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-momo-400" />
                    </div>
                    <span className="text-[10px] text-neu-muted dark:text-neu-dark-muted font-bold">by {token.creator.substring(0,6)}</span>
                 </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};