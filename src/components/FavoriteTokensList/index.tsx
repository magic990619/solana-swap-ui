import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { Token } from '@/types';
import { MOCK_TOKENS } from '@/constants';

interface FavoriteTokensListProps {
  tokens?: Token[];
}

export const FavoriteTokensList: React.FC<FavoriteTokensListProps> = ({
  tokens = MOCK_TOKENS,
}) => {
  const validTokens = useMemo(() => {
    return Array.isArray(tokens) && tokens.length > 0 ? tokens : MOCK_TOKENS;
  }, [tokens]);

  const [favoriteTokens, setFavoriteTokens] = useState<Token[]>(validTokens);

  const renderTokenItem = useCallback(
    ({ item, drag, isActive }: RenderItemParams<Token>) => {
      if (!item || !item.id) {
        return null;
      }

      return (
        <ScaleDecorator>
          <View style={[styles.tokenItem, isActive && styles.activeTokenItem]}>
            <View style={styles.dragHandle} onTouchStart={drag}>
              <Text style={styles.dragIcon}>⋮⋮</Text>
            </View>

            <Image
              source={{ uri: item.logo || '' }}
              style={styles.tokenLogo}
              resizeMode="contain"
              onError={() =>
                console.log('Failed to load image for:', item.symbol)
              }
            />

            <View style={styles.tokenInfo}>
              <Text style={styles.tokenSymbol}>{item.symbol || 'N/A'}</Text>
              <Text style={styles.tokenName}>{item.name || 'Unknown'}</Text>
            </View>

            <View style={styles.priceInfo}>
              <Text style={styles.tokenPrice}>
                ${(item.price || 0).toLocaleString()}
              </Text>
              <Text style={styles.priceChange}>+2.45%</Text>
            </View>
          </View>
        </ScaleDecorator>
      );
    },
    []
  );

  const handleDragEnd = useCallback(({ data }: { data: Token[] }) => {
    if (Array.isArray(data)) {
      setFavoriteTokens(data);
    }
  }, []);

  const keyExtractor = useCallback((item: Token) => {
    return item?.id?.toString() || Math.random().toString();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Tokens</Text>
      <DraggableFlatList
        data={favoriteTokens}
        renderItem={renderTokenItem}
        keyExtractor={keyExtractor}
        onDragEnd={handleDragEnd}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        scrollEnabled={false}
        nestedScrollEnabled={false}
        activationDistance={10}
        autoscrollSpeed={100}
        autoscrollThreshold={40}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    margin: 16,
    marginTop: 8,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
    padding: 16,
    paddingBottom: 8,
  },
  listContainer: {
    paddingBottom: 16,
  },
  tokenItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 2,
  },
  activeTokenItem: {
    backgroundColor: '#f8f9fa',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  dragHandle: {
    paddingRight: 12,
    paddingVertical: 8,
  },
  dragIcon: {
    fontSize: 16,
    color: '#6c757d',
    lineHeight: 16,
    letterSpacing: -2,
  },
  tokenLogo: {
    width: 32,
    height: 32,
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
    fontSize: 12,
    color: '#6c757d',
    marginTop: 2,
  },
  priceInfo: {
    alignItems: 'flex-end',
  },
  tokenPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212529',
  },
  priceChange: {
    fontSize: 12,
    color: '#28a745',
    marginTop: 2,
  },
});
