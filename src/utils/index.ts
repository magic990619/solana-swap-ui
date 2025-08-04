import { Token } from '@/types';

export const calculateSwapAmount = (
  fromAmount: string,
  fromToken: Token,
  toToken: Token
): string => {
  const amount = parseFloat(fromAmount);
  if (isNaN(amount) || amount <= 0) return '0';

  const exchangeRate = fromToken.price / toToken.price;
  const result = amount * exchangeRate;

  return result.toFixed(6);
};

export const formatNumber = (value: string | number): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return '0';

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 6,
  }).format(num);
};
