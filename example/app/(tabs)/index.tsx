import { Image } from 'expo-image';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
// Demonstrating flexible drawer control!
import { useDrawer } from 'react-native-scaling-drawer';

// Floating Action Button - shows how flexible the drawer control is!
function FloatingMenuButton() {
  const { toggle, isOpen } = useDrawer();

  return (
    <TouchableOpacity
      style={[styles.fab, { backgroundColor: isOpen ? '#f44336' : '#673AB7' }]}
      onPress={toggle}
    >
      <Text style={styles.fabText}>
        {isOpen ? '✕' : '☰'}
      </Text>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  return (
    <>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.reactLogo}
          />
        }>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Welcome!</ThemedText>
          <HelloWave />
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">🎨 Step 1: Try the Flexible Drawer</ThemedText>
          <ThemedText>
            Notice the floating menu button in the bottom-right corner! This demonstrates
            how you can control the drawer from anywhere in your app using the{' '}
            <ThemedText type="defaultSemiBold">useDrawer()</ThemedText> hook.
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">🎮 Step 2: Test Flexibility</ThemedText>
          <ThemedText>
            Try both the header menu button and the floating button. Notice how the
            floating button changes color and icon based on drawer state!
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">🚀 Step 3: Complete Control</ThemedText>
          <ThemedText>
            Go to the "Test Drawer" screen to see programmatic control. You can open/close
            the drawer from any component without being forced to use specific headers.
          </ThemedText>
        </ThemedView>
      </ParallaxScrollView>

      {/* Floating Action Button - demonstrates flexible control! */}
      <FloatingMenuButton />
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fabText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
