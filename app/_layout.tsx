import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-reanimated';

import { useColorScheme } from '../hooks/useColorScheme';
// Using the new flexible package approach
import ScalingDrawer, { DrawerProvider, useDrawer } from '../package-template/src';

// Flexible menu button - can be used anywhere!
function FlexibleMenuButton() {
  const { toggle, isOpen } = useDrawer();

  return (
    <TouchableOpacity
      style={{ padding: 10, marginLeft: 5 }}
      onPress={toggle}
    >
      <Text style={{ fontSize: 20, color: '#fff' }}>
        {isOpen ? '✕' : '☰'}
      </Text>
    </TouchableOpacity>
  );
}

// Custom drawer content - complete control!
function CustomDrawerContent() {
  const { close } = useDrawer();
  const router = useRouter();

  const navigate = (href: string) => {
    router.push(href);
    close();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#673AB7', paddingTop: 60 }}>
      {/* Header */}
      <View style={styles.drawerHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>JD</Text>
        </View>
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.userEmail}>john@example.com</Text>
      </View>

      {/* Menu Items */}
      <View style={{ flex: 1, padding: 20 }}>
        {[
          { label: 'Home', href: '/(tabs)', icon: '🏠' },
          { label: 'Explore', href: '/(tabs)/explore', icon: '🔍' },
          { label: 'Profile', href: '/profile', icon: '👤' },
          { label: 'Settings', href: '/settings', icon: '⚙️' },
          { label: 'Test Drawer', href: '/test-drawer', icon: '🧪' },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => navigate(item.href)}
          >
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={styles.menuLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.drawerFooter}>
        <Text style={styles.footerText}>Built with Flexible Drawer</Text>
        <Text style={styles.versionText}>v1.0.0</Text>
      </View>
    </View>
  );
}



export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* Using the new flexible approach - complete control! */}
      <DrawerProvider
        slideDistance={300}
        scaleFactor={0.8}
        animationDuration={250}
      >
        <ScalingDrawer
          drawerContent={<CustomDrawerContent />}
          drawerBackgroundColor="#673AB7"
          showShadow={true}
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
              // Using our flexible menu button!
              headerLeft: () => <FlexibleMenuButton />,
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="profile" options={{ title: 'Profile' }} />
            <Stack.Screen name="settings" options={{ title: 'Settings' }} />
            <Stack.Screen name="test-drawer" options={{ title: 'Test Drawer' }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ScalingDrawer>
      </DrawerProvider>
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
    marginBottom: 20,
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
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 15,
  },
  menuLabel: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
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
