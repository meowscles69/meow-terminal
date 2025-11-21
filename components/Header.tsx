import React from 'react';
import { Zap, Menu, X, Wallet, Moon, Sun } from 'lucide-react';
import { Button } from './Button';
import { ViewState } from '../types';

interface HeaderProps {
  onNavigate: (view: ViewState) => void;
  walletAddress: string | null;
  onConnect: () => void;
  onDisconnect: () => void;
  darkMode: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, walletAddress, onConnect, onDisconnect, darkMode, onToggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const shortenAddress = (addr: string) => `${addr.slice(0, 4)}...${addr.slice(-4)}`;

  return (
    <header className="sticky top-4 z-50 px-4 mb-6">
      <div className="max-w-7xl mx-auto bg-neu-base dark:bg-neu-dark-base rounded-2xl shadow-neu dark:shadow-neu-dark px-4 sm:px-6 lg:px-8 transition-all duration-300">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer group" onClick={() => onNavigate(ViewState.HOME)}>
            <div className="bg-neu-base dark:bg-neu-dark-base shadow-neu dark:shadow-neu-dark group-hover:shadow-neu-sm dark:group-hover:shadow-neu-dark-sm transition-all p-2 rounded-full mr-3 text-momo-500">
              <Zap className="h-5 w-5 fill-current" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-neu-text dark:text-neu-dark-text text-shadow">
              meow<span className="text-momo-500">.fun</span>
            </h1>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <button onClick={() => onNavigate(ViewState.HOME)} className="text-neu-text dark:text-neu-dark-text font-bold hover:text-momo-500 transition-colors">Board</button>
            <button onClick={() => onNavigate(ViewState.CREATE)} className="text-neu-text dark:text-neu-dark-text font-bold hover:text-momo-500 transition-colors">Start a coin</button>
            
            {/* Theme Toggle */}
            <button 
              onClick={onToggleTheme}
              className="p-2 rounded-full bg-neu-base dark:bg-neu-dark-base shadow-neu dark:shadow-neu-dark hover:text-momo-500 active:shadow-neu-pressed dark:active:shadow-neu-dark-pressed transition-all text-neu-muted dark:text-neu-dark-muted"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {walletAddress ? (
              <div 
                onClick={onDisconnect}
                className="flex items-center gap-2 bg-neu-base dark:bg-neu-dark-base px-4 py-2 rounded-full shadow-neu-pressed dark:shadow-neu-dark-pressed cursor-pointer hover:shadow-neu dark:hover:shadow-neu-dark transition-all"
                title="Click to disconnect"
              >
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-bold text-neu-text dark:text-neu-dark-text font-mono">{shortenAddress(walletAddress)}</span>
              </div>
            ) : (
              <Button onClick={onConnect} size="sm">
                 <Wallet className="w-4 h-4" /> Connect
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={onToggleTheme}
              className="p-2 rounded-full bg-neu-base dark:bg-neu-dark-base shadow-neu dark:shadow-neu-dark text-neu-muted dark:text-neu-dark-muted"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

             <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-neu-text dark:text-neu-dark-text p-2 rounded-lg hover:shadow-neu dark:hover:shadow-neu-dark transition-all active:shadow-neu-pressed dark:active:shadow-neu-dark-pressed"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mt-4 mx-4 p-4 bg-neu-base dark:bg-neu-dark-base rounded-2xl shadow-neu dark:shadow-neu-dark md:hidden animate-in slide-in-from-top-2">
          <div className="space-y-3">
            <button 
              onClick={() => { onNavigate(ViewState.CREATE); setIsMenuOpen(false); }}
              className="w-full text-left px-4 py-3 rounded-xl shadow-neu dark:shadow-neu-dark active:shadow-neu-pressed dark:active:shadow-neu-dark-pressed text-momo-600 font-bold"
            >
              Start New Coin
            </button>
             <button 
              onClick={() => { onNavigate(ViewState.HOME); setIsMenuOpen(false); }}
              className="w-full text-left px-4 py-3 rounded-xl shadow-neu dark:shadow-neu-dark active:shadow-neu-pressed dark:active:shadow-neu-dark-pressed text-neu-text dark:text-neu-dark-text font-bold"
            >
              Board
            </button>
            <div className="pt-2">
               {walletAddress ? (
                  <div onClick={onDisconnect} className="w-full text-center py-3 rounded-xl shadow-neu-pressed dark:shadow-neu-dark-pressed text-green-600 font-mono font-bold">
                      {shortenAddress(walletAddress)} (Disconnect)
                  </div>
               ) : (
                  <Button onClick={onConnect} className="w-full">Connect Wallet</Button>
               )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};