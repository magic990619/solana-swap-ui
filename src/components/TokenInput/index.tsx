import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Token } from '@/types';
import { TokenSelectorModal } from '@/components/TokenSelectorModal';

interface TokenInputProps {
  label: string;
  token: Token;
  amount: string;
  onAmountChange: (amount: string) => void;
  onTokenSelect: (token: Token) => void;
  excludeToken?: Token;
  editable?: boolean;
}

export const TokenInput: React.FC<TokenInputProps> = ({
  label,
  token,
  amount,
  onAmountChange,
  onTokenSelect,
  excludeToken,
  editable = true,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleAmountChange = useCallback(
    (text: string) => {
      // Input validation
      const numericRegex = /^[0-9]*\.?[0-9]*$/;
      if (numericRegex.test(text) || text === '') {
        onAmountChange(text);
      }
    },
    [onAmountChange]
  );

  const handleTokenPress = useCallback(() => {
    if (!editable) return; // Don't allow selection if not editable
    setModalVisible(true);
  }, [editable]);

  const handleTokenSelection = useCallback(
    (selectedToken: Token) => {
      onTokenSelect(selectedToken);
      setModalVisible(false);
    },
    [onTokenSelect]
  );

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.inputRow}>
          <TouchableOpacity
            style={[
              styles.tokenSelector,
              !editable && styles.tokenSelectorDisabled,
            ]}
            onPress={handleTokenPress}
            activeOpacity={editable ? 0.7 : 1}
            accessibilityRole="button"
            accessibilityLabel={`Select token, currently ${token.symbol}`}
            disabled={!editable}
          >
            <Image
              source={{ uri: token.logo }}
              style={styles.tokenLogo}
              resizeMode="contain"
            />
            <Text style={styles.tokenSymbol}>{token.symbol}</Text>
            {editable && <Text style={styles.chevron}>▼</Text>}
          </TouchableOpacity>
          <TextInput
            style={[styles.input, !editable && styles.inputDisabled]}
            value={amount}
            onChangeText={handleAmountChange}
            placeholder="0.00"
            placeholderTextColor="#adb5bd"
            keyboardType="decimal-pad"
            editable={editable}
            selectTextOnFocus={editable}
            accessibilityLabel={`${label} amount input`}
          />
        </View>
        <Text style={styles.tokenName}>{token.name}</Text>
      </View>

      <TokenSelectorModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectToken={handleTokenSelection}
        currentToken={token}
        excludeToken={excludeToken}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 8,
    fontWeight: '500',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e9ecef',
    borderRadius: 8,
    padding: 8,
    marginRight: 12,
    minWidth: 100,
  },
  tokenLogo: {
    width: 24,
    height: 24,
    marginRight: 6,
  },
  tokenSymbol: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginRight: 4,
  },
  chevron: {
    fontSize: 10,
    color: '#6c757d',
    marginLeft: 'auto',
  },
  input: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#212529',
    textAlign: 'right',
    paddingVertical: 8,
  },
  inputDisabled: {
    color: '#6c757d',
  },
  tokenName: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 4,
  },
  tokenSelectorDisabled: {
    backgroundColor: '#f1f3f4',
  },
});
