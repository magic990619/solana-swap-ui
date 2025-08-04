import React from 'react';
import { StyleSheet, ScrollView, StatusBar, SafeAreaView } from 'react-native';
import { SwapCard } from '@/components/SwapCard';
import { FavoriteTokensList } from '@/components/FavoriteTokensList';

export const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <SwapCard />
        <FavoriteTokensList />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
    paddingTop: 32,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
});
