import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDrawerContext } from '../components/DrawerContext';

export default function TestDrawerScreen() {
  const { isOpen, openDrawer, closeDrawer, toggleDrawer } = useDrawerContext();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Scaling Drawer Test</Text>
        
        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Drawer Status:</Text>
          <Text style={[styles.statusValue, { color: isOpen ? '#34C759' : '#FF3B30' }]}>
            {isOpen ? 'OPEN' : 'CLOSED'}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={openDrawer}>
            <Text style={styles.buttonText}>Open Drawer</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={closeDrawer}>
            <Text style={styles.buttonText}>Close Drawer</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.toggleButton]} onPress={toggleDrawer}>
            <Text style={styles.buttonText}>Toggle Drawer</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>How to Test:</Text>
          <Text style={styles.infoText}>
            1. Tap the burger menu (☰) in the header to open the drawer
          </Text>
          <Text style={styles.infoText}>
            2. Watch the main content scale down and slide to the right
          </Text>
          <Text style={styles.infoText}>
            3. Notice the beautiful shadow effects behind the scaled content
          </Text>
          <Text style={styles.infoText}>
            4. Tap anywhere on the scaled content to close the drawer
          </Text>
          <Text style={styles.infoText}>
            5. Try navigating to different screens from the drawer menu
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>Features Implemented:</Text>
          <Text style={styles.featureItem}>✅ Smooth scaling animation (0.8x scale)</Text>
          <Text style={styles.featureItem}>✅ Slide animation (300px distance)</Text>
          <Text style={styles.featureItem}>✅ Multi-layer shadow effects</Text>
          <Text style={styles.featureItem}>✅ Rounded corners when scaled</Text>
          <Text style={styles.featureItem}>✅ Expo Router integration</Text>
          <Text style={styles.featureItem}>✅ Context-based state management</Text>
          <Text style={styles.featureItem}>✅ Touch-to-close functionality</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusLabel: {
    fontSize: 18,
    color: '#333',
    marginRight: 10,
  },
  statusValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#673AB7',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  toggleButton: {
    backgroundColor: '#FF9500',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  featuresContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  featureItem: {
    fontSize: 14,
    color: '#34C759',
    marginBottom: 8,
    lineHeight: 20,
  },
});
