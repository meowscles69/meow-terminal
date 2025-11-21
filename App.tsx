import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { TokenDetail } from './pages/TokenDetail';
import { CreateToken } from './components/CreateToken';
import { Token, ViewState } from './types';
import { v4 as uuidv4 } from 'uuid';

// Extend Window interface to include solana
declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean;
      connect: (options?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey: { toString: () => string } }>;
      disconnect: () => Promise<void>;
    };
  }
}

// Mock Data Generator
const generateMockTokens = (): Token[] => {
  return Array.from({ length: 12 }).map((_, i) => {
    const marketCap = i === 0 ? 62000 : Math.floor(Math.random() * 15000) + 1000;
    const progress = Math.min(100, (marketCap / 69000) * 100);
    
    return {
      id: `token-${i}`,
      name: i === 0 ? "Meow King" : `Meme Coin ${i}`,
      ticker: i === 0 ? "MEOW" : `MEME${i}`,
      description: i === 0 
          ? "The original king of the hill. Meow is always watching. Don't fade the cat." 
          : "Just another degen play. Will it moon? Probably not. But you're here anyway.",
      imageUrl: `https://picsum.photos/seed/${i + 123}/200/200`,
      creator: `Dev_${Math.floor(Math.random() * 1000)}`,
      marketCap: marketCap,
      replies: Math.floor(Math.random() * 100),
      createdAt: Date.now() - Math.floor(Math.random() * 10000000),
      bondingCurveProgress: progress,
      kingOfTheHill: i === 0,
      status: progress >= 100 ? 'raydium' : 'bonding_curve',
      twitter: Math.random() > 0.5 ? 'https://twitter.com' : undefined,
      telegram: Math.random() > 0.5 ? 'https://t.me' : undefined
    };
  });
};

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isPhantomInstalled, setIsPhantomInstalled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Handle Dark Mode Effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    setTokens(generateMockTokens());
    
    // Check for phantom
    if ('solana' in window && window.solana) {
        setIsPhantomInstalled(true);
        // Eager connect check
        window.solana.connect({ onlyIfTrusted: true })
            .then((resp: any) => {
                setWalletAddress(resp.publicKey.toString());
            })
            .catch(() => {});
    }
  }, []);

  // Simulate socket updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTokens(prevTokens => {
         return prevTokens.map(t => {
             if (t.status === 'raydium') return t; 

             if (Math.random() > 0.7) {
                 const increase = Math.random() * 500;
                 const newMc = t.marketCap + increase;
                 const newProgress = Math.min(100, (newMc / 69000) * 100);
                 
                 return { 
                    ...t, 
                    marketCap: newMc, 
                    bondingCurveProgress: newProgress,
                    status: newProgress >= 100 ? 'raydium' : 'bonding_curve'
                 };
             }
             return t;
         });
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleConnect = async () => {
    if (!isPhantomInstalled) {
        window.open('https://phantom.app/', '_blank');
        return;
    }
    try {
        if (window.solana) {
            const resp = await window.solana.connect();
            setWalletAddress(resp.publicKey.toString());
        }
    } catch (err) {
        console.error("User rejected request", err);
    }
  };

  const handleDisconnect = async () => {
      if (window.solana) {
          try {
            await window.solana.disconnect();
            setWalletAddress(null);
          } catch (e) { console.error(e); }
      }
  };

  const handleNavigate = (newView: ViewState) => {
    setView(newView);
    if (newView !== ViewState.TOKEN_DETAIL) {
      setSelectedToken(null);
    }
  };

  const handleSelectToken = (token: Token) => {
    setSelectedToken(token);
    setView(ViewState.TOKEN_DETAIL);
    window.scrollTo(0, 0);
  };

  const handleCreateToken = (data: any) => {
    const initialMc = data.marketCap || 500;
    const newToken: Token = {
        id: uuidv4(),
        name: data.name,
        ticker: data.ticker,
        description: data.description,
        imageUrl: `https://picsum.photos/seed/${Date.now()}/200/200`, 
        creator: walletAddress || 'Anon',
        marketCap: initialMc, 
        replies: 0,
        createdAt: Date.now(),
        bondingCurveProgress: Math.min(100, (initialMc / 69000) * 100),
        kingOfTheHill: false,
        status: 'bonding_curve',
        twitter: data.twitter,
        telegram: data.telegram,
        website: data.website
    };
    setTokens([newToken, ...tokens]);
    handleSelectToken(newToken);
  };

  const handleTrade = (token: Token, type: 'buy' | 'sell', amount: number) => {
      const multiplier = type === 'buy' ? 1 : -1;
      const priceImpact = amount * 200; 
      
      setTokens(prev => prev.map(t => {
          if (t.id === token.id) {
              let newMc = t.marketCap + (priceImpact * multiplier);
              newMc = Math.max(500, newMc);
              
              const progress = Math.min(100, (newMc / 69000) * 100);
              const status = progress >= 100 ? 'raydium' : 'bonding_curve';

              return {
                  ...t,
                  marketCap: newMc,
                  bondingCurveProgress: progress,
                  status: status
              };
          }
          return t;
      }));

      if (selectedToken?.id === token.id) {
          const updated = tokens.find(t => t.id === token.id);
          if (updated) {
              const newMc = Math.max(500, updated.marketCap + (priceImpact * multiplier));
              const progress = Math.min(100, (newMc / 69000) * 100);
              setSelectedToken({
                  ...updated,
                  marketCap: newMc,
                  bondingCurveProgress: progress,
                  status: progress >= 100 ? 'raydium' : 'bonding_curve'
              });
          }
      }
  };

  return (
    <div className="min-h-screen bg-neu-base dark:bg-neu-dark-base text-neu-text dark:text-neu-dark-text pb-20 font-sans transition-colors duration-300">
      <Header 
        onNavigate={handleNavigate} 
        walletAddress={walletAddress} 
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(!darkMode)}
      />
      
      <main>
        {view === ViewState.HOME && (
            <Home tokens={tokens} onSelectToken={handleSelectToken} />
        )}
        
        {view === ViewState.CREATE && (
            <CreateToken onCreate={handleCreateToken} onCancel={() => handleNavigate(ViewState.HOME)} />
        )}

        {view === ViewState.TOKEN_DETAIL && selectedToken && (
            <TokenDetail 
                token={tokens.find(t => t.id === selectedToken.id) || selectedToken} 
                onBack={() => handleNavigate(ViewState.HOME)} 
                onTrade={handleTrade}
            />
        )}
      </main>
    </div>
  );
};

export default App;