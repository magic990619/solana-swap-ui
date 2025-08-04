import { Token } from '@/types';

export const MOCK_TOKENS: Token[] = [
  {
    id: '1',
    symbol: 'SOL',
    name: 'Solana',
    logo: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    price: 150,
  },
  {
    id: '2',
    symbol: 'USDC',
    name: 'USD Coin',
    logo: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png',
    price: 1,
  },
  {
    id: '3',
    symbol: 'BTC',
    name: 'Bitcoin',
    logo: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    price: 45000,
  },
  {
    id: '4',
    symbol: 'ETH',
    name: 'Ethereum',
    logo: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    price: 3000,
  },
  {
    id: '5',
    symbol: 'USDT',
    name: 'Tether',
    logo: 'https://assets.coingecko.com/coins/images/325/large/Tether.png',
    price: 1,
  },
  {
    id: '6',
    symbol: 'RAY',
    name: 'Raydium',
    logo: 'https://assets.coingecko.com/coins/images/13928/large/PSigc4ie_400x400.jpg',
    price: 2.5,
  },
  {
    id: '7',
    symbol: 'ORCA',
    name: 'Orca',
    logo: 'https://assets.coingecko.com/coins/images/17547/large/Orca_Logo.png',
    price: 3.8,
  },
];

export const DEFAULT_FROM_TOKEN = MOCK_TOKENS[0]; // SOL
export const DEFAULT_TO_TOKEN = MOCK_TOKENS[1]; // USDC
