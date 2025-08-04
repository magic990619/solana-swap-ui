import React, { useState, useCallback } from 'react';
import { Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { TokenInput } from '@/components/TokenInput';
import { Token } from '@/types';
import { calculateSwapAmount } from '@/utils';
import { DEFAULT_FROM_TOKEN, DEFAULT_TO_TOKEN } from '@/constants';

export const SwapCard: React.FC = () => {
  const [fromToken, setFromToken] = useState<Token>(DEFAULT_FROM_TOKEN);
  const [toToken, setToToken] = useState<Token>(DEFAULT_TO_TOKEN);
  const [fromAmount, setFromAmount] = useState<string>('');
  const [animatedValue] = useState(new Animated.Value(0));
  const [buttonAnimation] = useState(new Animated.Value(1));

  React.useEffect(() => {
    // Fade in animation on mount
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);

  const toAmount = calculateSwapAmount(fromAmount, fromToken, toToken);
  const isSwapDisabled = !fromAmount || parseFloat(fromAmount) <= 0;

  const handleSwapTokens = useCallback(() => {
    // Swap the tokens positions
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);
    setFromAmount(''); // Clear amount when swapping
  }, [fromToken, toToken]);

  const handleSwap = useCallback(() => {
    // Swap button animation
    Animated.parallel([
      Animated.timing(buttonAnimation, {
        toValue: 0.95,
        duration: 380,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.timing(buttonAnimation, {
        toValue: 1,
        duration: 420,
        useNativeDriver: true,
      }).start();
    });

    console.log('Swap executed:', { fromToken, toToken, fromAmount, toAmount });
  }, [buttonAnimation, fromToken, toToken, fromAmount, toAmount]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: animatedValue,
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        },
      ]}
    >
      <Text style={styles.title}>Swap Tokens</Text>

      <TokenInput
        label="You Pay"
        token={fromToken}
        amount={fromAmount}
        onAmountChange={setFromAmount}
        onTokenSelect={setFromToken}
        excludeToken={toToken}
      />

      <TouchableOpacity style={styles.swapIcon} onPress={handleSwapTokens}>
        <Text style={styles.swapIconText}>⇅</Text>
      </TouchableOpacity>

      <TokenInput
        label="You Receive"
        token={toToken}
        amount={toAmount}
        onAmountChange={() => {}}
        onTokenSelect={setToToken}
        excludeToken={fromToken}
      />

      <Animated.View
        style={{
          transform: [{ scale: buttonAnimation }],
          opacity: buttonAnimation.interpolate({
            inputRange: [0.95, 1],
            outputRange: [0.9, 1],
          }),
        }}
      >
        <TouchableOpacity
          style={[
            styles.swapButton,
            isSwapDisabled && styles.swapButtonDisabled,
          ]}
          onPress={handleSwap}
          disabled={isSwapDisabled}
          activeOpacity={0.8}
        >
          <Text style={styles.swapButtonText}>
            {isSwapDisabled ? 'Enter Amount' : 'Swap'}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 16,
    textAlign: 'center',
  },
  swapIcon: {
    alignSelf: 'center',
    backgroundColor: '#6c5ce7',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  swapIconText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  swapButton: {
    backgroundColor: '#6c5ce7',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    alignItems: 'center',
  },
  swapButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  swapButtonDisabled: {
    backgroundColor: '#adb5bd',
  },
  swapButtonTextDisabled: {
    color: '#6c757d',
  },
});
