import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import 'react-native-reanimated';

import { useColorScheme } from '../hooks/useColorScheme';
import { ExpoRouterDrawer, ExpoDrawerMenuButton } from '../components/ExpoRouterDrawer';

// Custom drawer header
const DrawerHeader = () => (
  <View style={styles.drawerHeader}>
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>JD</Text>
    </View>
    <Text style={styles.userName}>John Doe</Text>
    <Text style={styles.userEmail}>john@example.com</Text>
  </View>
);

// Custom drawer footer
const DrawerFooter = () => (
  <View style={styles.drawerFooter}>
    <Text style={styles.footerText}>Built with Expo Router</Text>
    <Text style={styles.versionText}>v1.0.0</Text>
  </View>
);

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  const menuItems = [
    { label: 'Home', href: '/(tabs)' },
    { label: 'Explore', href: '/(tabs)/explore' },
    { label: 'Profile', href: '/profile' },
    { label: 'Settings', href: '/settings' },
    { label: 'Test Drawer', href: '/test-drawer' },
  ];

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ExpoRouterDrawer
        menuItems={menuItems}
        onNavigate={handleNavigation}
        drawerBackgroundColor="#673AB7"
        drawerHeader={<DrawerHeader />}
        drawerFooter={<DrawerFooter />}
        slideDistance={300}
        scaleFactor={0.8}
        animationDuration={250}
        borderRadius={25}
      >
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: '#673AB7',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerLeft: () => <ExpoDrawerMenuButton iconColor="#fff" />,
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="profile" options={{ title: 'Profile' }} />
          <Stack.Screen name="settings" options={{ title: 'Settings' }} />
          <Stack.Screen name="test-drawer" options={{ title: 'Test Drawer' }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ExpoRouterDrawer>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#673AB7',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  drawerFooter: {
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  footerText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
  },
  versionText: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.6)',
  },
});
