import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import { Token } from '@/types';
import { MOCK_TOKENS } from '@/constants';

interface TokenSelectorModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectToken: (token: Token) => void;
  currentToken?: Token;
  excludeToken?: Token;
}

export const TokenSelectorModal: React.FC<TokenSelectorModalProps> = ({
  visible,
  onClose,
  onSelectToken,
  currentToken,
  excludeToken,
}) => {
  const availableTokens = MOCK_TOKENS.filter(
    token => token.id !== excludeToken?.id
  );

  const handleSelectToken = (token: Token) => {
    onSelectToken(token);
    onClose();
  };

  const renderTokenItem = ({ item }: { item: Token }) => {
    const isSelected = item.id === currentToken?.id;

    return (
      <TouchableOpacity
        style={[styles.tokenItem, isSelected && styles.selectedToken]}
        onPress={() => handleSelectToken(item)}
        activeOpacity={0.7}
      >
        <Image
          source={{ uri: item.logo }}
          style={styles.tokenLogo}
          resizeMode="contain"
        />
        <View style={styles.tokenInfo}>
          <Text style={styles.tokenSymbol}>{item.symbol}</Text>
          <Text style={styles.tokenName}>{item.name}</Text>
        </View>
        <Text style={styles.tokenPrice}>${item.price.toLocaleString()}</Text>
        {isSelected && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Select Token</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={availableTokens}
          keyExtractor={item => item.id}
          renderItem={renderTokenItem}
          style={styles.tokenList}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#6c757d',
    fontWeight: 'bold',
  },
  tokenList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  tokenItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  selectedToken: {
    backgroundColor: '#f0f0ff',
  },
  tokenLogo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  tokenInfo: {
    flex: 1,
  },
  tokenSymbol: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  tokenName: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 2,
  },
  tokenPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212529',
    marginRight: 8,
  },
  checkmark: {
    fontSize: 16,
    color: '#6c5ce7',
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#f1f3f4',
    marginHorizontal: 16,
  },
});
