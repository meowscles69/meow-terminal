import React, { useState } from 'react';
import { Wand2, Upload, ChevronDown, ChevronUp, Globe, MessageCircle, Twitter, AlertCircle } from 'lucide-react';
import { Button } from './Button';
import { generateCoinIdea } from '../services/gemini';

interface CreateTokenProps {
  onCreate: (data: any) => void;
  onCancel: () => void;
}

export const CreateToken: React.FC<CreateTokenProps> = ({ onCreate, onCancel }) => {
  const [name, setName] = useState('');
  const [ticker, setTicker] = useState('');
  const [description, setDescription] = useState('');
  const [topic, setTopic] = useState('');
  const [twitter, setTwitter] = useState('');
  const [telegram, setTelegram] = useState('');
  const [website, setWebsite] = useState('');
  const [marketCap, setMarketCap] = useState('');
  const [showSocials, setShowSocials] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleAIHelp = async () => {
    setIsGenerating(true);
    try {
      const idea = await generateCoinIdea(topic);
      setName(idea.name);
      setTicker(idea.ticker);
      setDescription(idea.description);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    onCreate({ 
      name, 
      ticker, 
      description, 
      twitter, 
      telegram, 
      website,
      marketCap: marketCap ? parseFloat(marketCap) : undefined
    });
  };

  const inputStyles = "w-full bg-neu-base dark:bg-neu-dark-base shadow-neu-pressed dark:shadow-neu-dark-pressed rounded-xl px-4 py-3 text-neu-text dark:text-neu-dark-text focus:outline-none font-bold placeholder-neu-muted dark:placeholder-neu-dark-muted transition-colors";

  return (
    <div className="max-w-xl mx-auto mt-8 p-8 bg-neu-base dark:bg-neu-dark-base rounded-[30px] shadow-neu dark:shadow-neu-dark relative transition-colors duration-300">
      
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-neu-base/80 dark:bg-neu-dark-base/80 backdrop-blur-sm rounded-[30px]">
          <div className="bg-neu-base dark:bg-neu-dark-base p-8 rounded-2xl shadow-neu dark:shadow-neu-dark max-w-sm w-full mx-4 border border-white/20 dark:border-black/20">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full shadow-neu dark:shadow-neu-dark flex items-center justify-center mb-6 text-momo-500">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-neu-text dark:text-neu-dark-text mb-2">Confirm Launch</h3>
              <p className="text-neu-muted dark:text-neu-dark-muted mb-8 font-semibold">
                Launch <span className="text-neu-text dark:text-neu-dark-text">{name || 'this coin'}</span> for <span className="text-momo-500">0.02 SOL</span>?
              </p>
              <div className="flex gap-4 w-full">
                <Button 
                  variant="secondary" 
                  className="flex-1" 
                  onClick={() => setShowConfirmation(false)}
                >
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  className="flex-1" 
                  onClick={handleConfirm}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-neu-text dark:text-neu-dark-text mb-2 text-shadow">Launch a Coin</h2>
        <p className="text-neu-muted dark:text-neu-dark-muted font-bold">Fair launch. No presale. 100% on curve.</p>
      </div>

      <div className="mb-8 p-6 rounded-2xl shadow-neu dark:shadow-neu-dark">
        <label className="block text-xs font-extrabold text-momo-500 mb-3 uppercase tracking-wider flex items-center gap-2">
           <Wand2 className="w-4 h-4" /> AI Assistant
        </label>
        <div className="flex gap-4">
            <input 
                type="text" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. 'A sad hamster'"
                className={inputStyles}
            />
            <Button 
                onClick={handleAIHelp} 
                isLoading={isGenerating} 
                variant="secondary"
                size="sm"
            >
                Generate
            </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-neu-text dark:text-neu-dark-text mb-2 ml-1">Name</label>
              <input 
                required
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputStyles}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-neu-text dark:text-neu-dark-text mb-2 ml-1">Ticker</label>
              <input 
                required
                type="text" 
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
                placeholder="$"
                className={`${inputStyles} font-mono uppercase`}
              />
            </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-neu-text dark:text-neu-dark-text mb-2 ml-1">Description</label>
          <textarea 
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className={`${inputStyles} resize-none font-medium`}
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-neu-text dark:text-neu-dark-text mb-2 ml-1">Initial Market Cap ($)</label>
          <input 
            type="number" 
            value={marketCap}
            onChange={(e) => setMarketCap(e.target.value)}
            placeholder="500"
            className={inputStyles}
          />
        </div>

        <div>
            <label className="block text-sm font-bold text-neu-text dark:text-neu-dark-text mb-2 ml-1">Image</label>
            <div className="shadow-neu-pressed dark:shadow-neu-dark-pressed rounded-xl p-8 flex flex-col items-center justify-center text-neu-muted dark:text-neu-dark-muted hover:text-momo-500 transition-colors cursor-pointer border-2 border-transparent hover:border-momo-200 border-dashed">
                <Upload className="h-8 w-8 mb-2" />
                <span className="text-xs font-bold">Upload Image</span>
            </div>
        </div>

        <div className="pt-4">
          <button 
            type="button"
            onClick={() => setShowSocials(!showSocials)}
            className="flex items-center text-sm text-neu-muted dark:text-neu-dark-muted font-bold hover:text-neu-text dark:hover:text-neu-dark-text transition-colors mx-auto"
          >
            {showSocials ? <ChevronUp className="h-4 w-4 mr-1" /> : <ChevronDown className="h-4 w-4 mr-1" />}
            {showSocials ? 'Hide Socials' : 'Add Socials'}
          </button>

          {showSocials && (
            <div className="grid grid-cols-1 gap-4 mt-6 animate-in fade-in slide-in-from-top-2">
               <div className="relative">
                  <Twitter className="absolute left-4 top-3.5 w-4 h-4 text-neu-muted dark:text-neu-dark-muted" />
                  <input 
                    type="text" 
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    placeholder="Twitter URL"
                    className={`${inputStyles} pl-10`}
                  />
               </div>
               <div className="relative">
                  <MessageCircle className="absolute left-4 top-3.5 w-4 h-4 text-neu-muted dark:text-neu-dark-muted" />
                  <input 
                    type="text" 
                    value={telegram}
                    onChange={(e) => setTelegram(e.target.value)}
                    placeholder="Telegram URL"
                    className={`${inputStyles} pl-10`}
                  />
               </div>
               <div className="relative">
                   <Globe className="absolute left-4 top-3.5 w-4 h-4 text-neu-muted dark:text-neu-dark-muted" />
                  <input 
                    type="text" 
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="Website URL"
                    className={`${inputStyles} pl-10`}
                  />
               </div>
            </div>
          )}
        </div>

        <Button type="submit" className="w-full py-4 text-lg" variant="primary">
          Launch Coin (0.02 SOL)
        </Button>
      </form>
    </div>
  );
};