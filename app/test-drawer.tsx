import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Using the new flexible package approach!
import { useDrawer } from '../package-template/src';

export default function TestDrawerScreen() {
  const { isOpen, open, close, toggle } = useDrawer();

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom header with menu button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={toggle}
        >
          <Text style={styles.menuIcon}>{isOpen ? '✕' : '☰'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>🎨 Flexible Drawer Test</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Test All Drawer Controls</Text>
        
        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Drawer Status:</Text>
          <Text style={[styles.statusValue, { color: isOpen ? '#34C759' : '#FF3B30' }]}>
            {isOpen ? 'OPEN' : 'CLOSED'}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={open}>
            <Text style={styles.buttonText}>Open Drawer</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={close}>
            <Text style={styles.buttonText}>Close Drawer</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.toggleButton]} onPress={toggle}>
            <Text style={styles.buttonText}>Toggle Drawer</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>🎮 How to Test Flexibility:</Text>
          <Text style={styles.infoText}>
            1. Tap the flexible menu button (☰/✕) in the header - it changes icon!
          </Text>
          <Text style={styles.infoText}>
            2. Use the buttons below to control the drawer programmatically
          </Text>
          <Text style={styles.infoText}>
            3. Watch the main content scale down and slide to the right
          </Text>
          <Text style={styles.infoText}>
            4. Notice the beautiful shadow effects behind the scaled content
          </Text>
          <Text style={styles.infoText}>
            5. Tap anywhere on the scaled content to close the drawer
          </Text>
          <Text style={styles.infoText}>
            6. Try navigating to different screens from the custom drawer menu
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>🚀 Flexible Features:</Text>
          <Text style={styles.featureItem}>✅ Smooth scaling animation (0.8x scale)</Text>
          <Text style={styles.featureItem}>✅ Slide animation (300px distance)</Text>
          <Text style={styles.featureItem}>✅ Multi-layer shadow effects</Text>
          <Text style={styles.featureItem}>✅ Rounded corners when scaled</Text>
          <Text style={styles.featureItem}>✅ Complete custom drawer content</Text>
          <Text style={styles.featureItem}>✅ Flexible menu button (changes icon)</Text>
          <Text style={styles.featureItem}>✅ Global drawer control with useDrawer()</Text>
          <Text style={styles.featureItem}>✅ No forced header structure</Text>
          <Text style={styles.featureItem}>✅ Programmatic control from anywhere</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#673AB7',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuButton: {
    padding: 8,
    marginRight: 15,
  },
  menuIcon: {
    fontSize: 20,
    color: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
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
