import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDrawerContext } from 'react-native-scaling-drawer';

export default function HomeScreen() {
  const { isOpen } = useDrawerContext();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🎨 Scaling Drawer Demo</Text>
          <Text style={styles.cardDescription}>
            This is a beautiful example of the React Native Scaling Drawer package. 
            The main content scales down and slides to reveal the drawer underneath.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>✨ Features</Text>
          <View style={styles.featureList}>
            <Text style={styles.feature}>• Beautiful scaling animations</Text>
            <Text style={styles.feature}>• Smooth 60fps performance</Text>
            <Text style={styles.feature}>• Customizable styling</Text>
            <Text style={styles.feature}>• TypeScript support</Text>
            <Text style={styles.feature}>• Expo Router integration</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🎮 How to Use</Text>
          <Text style={styles.cardDescription}>
            Tap the menu button (☰) in the top-left corner or swipe from the left edge 
            to open the drawer. Watch how the content beautifully scales and slides!
          </Text>
        </View>

        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>Drawer Status</Text>
          <Text style={[styles.statusText, { color: isOpen ? '#4CAF50' : '#FF5722' }]}>
            {isOpen ? '🟢 Open' : '🔴 Closed'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  cardDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  featureList: {
    marginTop: 10,
  },
  feature: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginBottom: 5,
  },
  statusCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
