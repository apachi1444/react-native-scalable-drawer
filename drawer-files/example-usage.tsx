import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  ScrollView 
} from 'react-native';
import { Stack } from 'expo-router';
import { DrawerProvider, ScalingDrawer, useDrawer } from './index';

// Custom Menu Button Component
function MenuButton() {
  const { toggle, isOpen } = useDrawer();

  return (
    <TouchableOpacity 
      style={styles.menuButton} 
      onPress={toggle}
    >
      <Text style={styles.menuIcon}>
        {isOpen ? '✕' : '☰'}
      </Text>
    </TouchableOpacity>
  );
}

// Custom Drawer Content
function CustomDrawerContent() {
  const { close } = useDrawer();

  const menuItems = [
    { title: '🏠 Home', route: '/' },
    { title: '👤 Profile', route: '/profile' },
    { title: '⚙️ Settings', route: '/settings' },
    { title: '📞 Contact', route: '/contact' },
    { title: '❓ About', route: '/about' },
  ];

  return (
    <SafeAreaView style={styles.drawerContainer}>
      <ScrollView style={styles.drawerContent}>
        {/* Header */}
        <View style={styles.drawerHeader}>
          <Text style={styles.drawerTitle}>Menu</Text>
          <Text style={styles.drawerSubtitle}>Choose an option</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuItems}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => {
                // Navigate to route here
                console.log(`Navigate to ${item.route}`);
                close(); // Close drawer after navigation
              }}
            >
              <Text style={styles.menuItemText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.drawerFooter}>
          <Text style={styles.footerText}>Built with Scaling Drawer</Text>
          <Text style={styles.versionText}>v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Main App Content
function AppContent() {
  return (
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
          headerLeft: () => <MenuButton />,
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ title: 'Home' }} 
        />
        <Stack.Screen 
          name="profile" 
          options={{ title: 'Profile' }} 
        />
        <Stack.Screen 
          name="settings" 
          options={{ title: 'Settings' }} 
        />
        <Stack.Screen 
          name="contact" 
          options={{ title: 'Contact' }} 
        />
        <Stack.Screen 
          name="about" 
          options={{ title: 'About' }} 
        />
      </Stack>
    </ScalingDrawer>
  );
}

// Root Layout with Provider
export default function RootLayout() {
  return (
    <DrawerProvider
      slideDistance={300}
      scaleFactor={0.8}
      animationDuration={250}
    >
      <AppContent />
    </DrawerProvider>
  );
}

const styles = StyleSheet.create({
  // Menu Button Styles
  menuButton: {
    padding: 8,
    marginLeft: 16,
  },
  menuIcon: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },

  // Drawer Styles
  drawerContainer: {
    flex: 1,
    backgroundColor: '#673AB7',
  },
  drawerContent: {
    flex: 1,
    padding: 20,
  },
  drawerHeader: {
    marginBottom: 30,
    paddingTop: 20,
  },
  drawerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  drawerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },

  // Menu Items
  menuItems: {
    flex: 1,
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 5,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  menuItemText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
  },

  // Footer
  drawerFooter: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 5,
  },
  versionText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
  },
});
