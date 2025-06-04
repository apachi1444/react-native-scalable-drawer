import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DrawerProvider, ScalingDrawer } from 'react-native-scaling-drawer';

// Custom drawer content component
function DrawerContent() {
  const router = useRouter();

  const menuItems = [
    { label: 'Home', href: '/', icon: '🏠' },
    { label: 'Profile', href: '/profile', icon: '👤' },
    { label: 'Settings', href: '/settings', icon: '⚙️' },
    { label: 'About', href: '/about', icon: 'ℹ️' },
    { label: 'Contact', href: '/contact', icon: '📧' },
  ];

  return (
    <View style={styles.drawerContent}>
      {/* Drawer Header */}
      <View style={styles.drawerHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>JD</Text>
        </View>
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.userEmail}>john.doe@example.com</Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => router.push(item.href as any)}
          >
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={styles.menuLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Drawer Footer */}
      <View style={styles.drawerFooter}>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>🚪 Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <DrawerProvider
        slideDistance={280}
        scaleFactor={0.85}
        animationDuration={250}
      >
        <ScalingDrawer
          drawerContent={<DrawerContent />}
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
            }}
          >
            <Stack.Screen
              name="index"
              options={{
                title: 'Home',
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="profile"
              options={{
                title: 'Profile',
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="settings"
              options={{
                title: 'Settings',
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="about"
              options={{
                title: 'About',
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="contact"
              options={{
                title: 'Contact',
                headerShown: true,
              }}
            />
          </Stack>
          <StatusBar style="light" />
        </ScalingDrawer>
      </DrawerProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 50,
  },
  drawerHeader: {
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 20,
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
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  logoutButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
});
