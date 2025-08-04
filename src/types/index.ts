export interface Token {
  id: string;
  symbol: string;
  name: string;
  logo: string;
  price: number;
}

export interface SwapData {
  fromToken: Token;
  toToken: Token;
  fromAmount: string;
  toAmount: string;
  exchangeRate: number;
}
