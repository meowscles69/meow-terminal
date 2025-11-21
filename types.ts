export type TokenStatus = 'bonding_curve' | 'raydium';

export interface Token {
  id: string;
  name: string;
  ticker: string;
  description: string;
  imageUrl: string;
  creator: string;
  marketCap: number;
  replies: number;
  createdAt: number;
  bondingCurveProgress: number; // 0 to 100
  kingOfTheHill: boolean;
  status: TokenStatus;
  twitter?: string;
  telegram?: string;
  website?: string;
}

export interface Trade {
  id: string;
  type: 'buy' | 'sell';
  amount: number; // in SOL
  tokenAmount: number;
  user: string;
  timestamp: number;
  txHash: string;
}

export interface Comment {
  id: string;
  user: string;
  text: string;
  timestamp: number;
  imageUrl?: string;
}

export enum ViewState {
  HOME = 'HOME',
  TOKEN_DETAIL = 'TOKEN_DETAIL',
  CREATE = 'CREATE'
}

export interface GeminiCoinIdea {
  name: string;
  ticker: string;
  description: string;
}