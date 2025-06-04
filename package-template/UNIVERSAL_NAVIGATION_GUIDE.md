# 🧭 Universal Navigation Support Guide

This guide explains how to use the React Native Scaling Drawer with both **React Navigation** and **Expo Router**, making it the most versatile drawer solution for React Native projects.

## 🎯 Why Universal Support?

- **Expo Router** is becoming the standard for new React Native projects
- **React Navigation** is still widely used in existing projects
- **One package** that works with both = better developer experience
- **Future-proof** your drawer implementation

## 📦 Package Architecture

```
react-native-scaling-drawer/
├── Core Components
│   ├── ScalingDrawer          # Universal drawer component
│   ├── useScalingDrawer       # Animation hook
│   └── DrawerProvider         # Context provider
├── Navigation Adapters
│   ├── ReactNavigationDrawer  # React Navigation integration
│   ├── ExpoRouterDrawer       # Expo Router integration
│   ├── DrawerMenuButton       # React Navigation header button
│   └── ExpoDrawerMenuButton   # Expo Router header button
└── Examples & Documentation
```

## 🚀 Integration Options

### Option 1: Expo Router (Modern Approach)

**Best for**: New projects, file-based routing, modern React Native apps

```tsx
// app/_layout.tsx
import { Stack, useRouter } from 'expo-router';
import { ExpoRouterDrawer, ExpoDrawerMenuButton } from 'react-native-scaling-drawer';

export default function RootLayout() {
  const router = useRouter();

  return (
    <ExpoRouterDrawer
      menuItems={[
        { label: 'Home', href: '/' },
        { label: 'Profile', href: '/profile' },
        { label: 'Settings', href: '/(tabs)/settings' },
        { label: 'About', href: '/about' },
      ]}
      onNavigate={(href) => router.push(href)}
      drawerBackgroundColor="#673AB7"
      slideDistance={300}
      scaleFactor={0.8}
    >
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#673AB7' },
          headerTintColor: '#fff',
          headerLeft: () => <ExpoDrawerMenuButton iconColor="#fff" />,
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="profile" options={{ title: 'Profile' }} />
        <Stack.Screen name="about" options={{ title: 'About' }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ExpoRouterDrawer>
  );
}
```

**File Structure for Expo Router:**
```
app/
├── _layout.tsx          # Root layout with drawer
├── index.tsx            # Home screen (/)
├── profile.tsx          # Profile screen (/profile)
├── about.tsx            # About screen (/about)
└── (tabs)/              # Tab group
    ├── _layout.tsx      # Tab layout
    └── settings.tsx     # Settings screen
```

### Option 2: React Navigation (Traditional Approach)

**Best for**: Existing projects, programmatic navigation, complex navigation flows

```tsx
// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ReactNavigationDrawer, DrawerMenuButton } from 'react-native-scaling-drawer';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <ReactNavigationDrawer
        menuItems={[
          { label: 'Home', screenName: 'Home' },
          { label: 'Profile', screenName: 'Profile' },
          { label: 'Settings', screenName: 'Settings' },
        ]}
        onNavigate={(screenName) => {
          // Navigation handled automatically by adapter
          console.log(`Navigating to: ${screenName}`);
        }}
        drawerBackgroundColor="#2196F3"
        slideDistance={280}
        scaleFactor={0.85}
      >
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#2196F3' },
            headerTintColor: '#fff',
            headerLeft: () => <DrawerMenuButton iconColor="#fff" />,
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </ReactNavigationDrawer>
    </NavigationContainer>
  );
}
```

### Option 3: Custom Implementation (Maximum Control)

**Best for**: Custom navigation systems, complex drawer content, advanced use cases

```tsx
import React from 'react';
import { ScalingDrawer, DrawerProvider, useDrawerContext } from 'react-native-scaling-drawer';

// Custom drawer content with full control
const CustomDrawerContent = () => {
  const { closeDrawer } = useDrawerContext();
  
  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Your completely custom drawer UI */}
      <TouchableOpacity onPress={() => {
        // Custom navigation logic
        closeDrawer();
      }}>
        <Text>Custom Menu Item</Text>
      </TouchableOpacity>
    </View>
  );
};

// Custom header with drawer button
const CustomHeader = () => {
  const { openDrawer } = useDrawerContext();
  
  return (
    <View style={{ flexDirection: 'row', padding: 15 }}>
      <TouchableOpacity onPress={openDrawer}>
        <Text>☰</Text>
      </TouchableOpacity>
      <Text>My App</Text>
    </View>
  );
};

export default function App() {
  return (
    <DrawerProvider
      slideDistance={320}
      scaleFactor={0.75}
      animationDuration={350}
    >
      <ScalingDrawer
        drawerContent={<CustomDrawerContent />}
        drawerBackgroundColor="#E91E63"
        borderRadius={30}
      >
        <CustomHeader />
        {/* Your main app content */}
      </ScalingDrawer>
    </DrawerProvider>
  );
}
```

## 🔧 Advanced Configuration

### Custom Drawer Headers and Footers

```tsx
const CustomHeader = () => (
  <View style={{ alignItems: 'center', padding: 20 }}>
    <Image source={{ uri: 'avatar.jpg' }} style={{ width: 60, height: 60, borderRadius: 30 }} />
    <Text style={{ color: 'white', fontSize: 18, marginTop: 10 }}>John Doe</Text>
  </View>
);

const CustomFooter = () => (
  <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.2)' }}>
    <Text style={{ color: 'white', textAlign: 'center' }}>Version 1.0.0</Text>
  </View>
);

// Use with either adapter
<ExpoRouterDrawer
  drawerHeader={<CustomHeader />}
  drawerFooter={<CustomFooter />}
  // ... other props
/>
```

### Menu Items with Icons

```tsx
import Icon from 'react-native-vector-icons/MaterialIcons';

const menuItems = [
  { 
    label: 'Home', 
    href: '/', 
    icon: <Icon name="home" size={24} color="white" /> 
  },
  { 
    label: 'Profile', 
    href: '/profile', 
    icon: <Icon name="person" size={24} color="white" /> 
  },
];
```

### Animation Customization

```tsx
<ExpoRouterDrawer
  slideDistance={350}        // How far the drawer slides
  scaleFactor={0.75}         // How much the main content scales (0-1)
  animationDuration={400}    // Animation duration in ms
  borderRadius={25}          // Border radius when scaled
  shadowOpacity={0.8}        // Shadow intensity
  // ... other props
/>
```

## 🎯 Migration Guide

### From React Navigation Drawer

```tsx
// Before (React Navigation Drawer)
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

<NavigationContainer>
  <Drawer.Navigator>
    <Drawer.Screen name="Home" component={HomeScreen} />
  </Drawer.Navigator>
</NavigationContainer>

// After (Scaling Drawer)
import { ReactNavigationDrawer, DrawerMenuButton } from 'react-native-scaling-drawer';

<NavigationContainer>
  <ReactNavigationDrawer
    menuItems={[{ label: 'Home', screenName: 'Home' }]}
    onNavigate={(screen) => navigation.navigate(screen)}
  >
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => <DrawerMenuButton />,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  </ReactNavigationDrawer>
</NavigationContainer>
```

### From Custom Drawer Implementation

```tsx
// Before (Custom implementation)
const [drawerOpen, setDrawerOpen] = useState(false);

// After (Scaling Drawer)
import { DrawerProvider, useDrawerContext } from 'react-native-scaling-drawer';

// Access drawer state from any component
const { isOpen, openDrawer, closeDrawer } = useDrawerContext();
```

## 🚀 Best Practices

1. **Choose the Right Option**:
   - New projects → Expo Router adapter
   - Existing React Navigation → React Navigation adapter
   - Complex custom needs → Custom implementation

2. **Performance**:
   - Use `useNativeDriver: true` (enabled by default)
   - Memoize drawer content with `React.memo()`
   - Keep drawer content lightweight

3. **User Experience**:
   - Provide visual feedback for menu items
   - Use consistent animation timing
   - Test on both iOS and Android

4. **Accessibility**:
   - Add proper accessibility labels
   - Support screen readers
   - Ensure proper focus management

## 🎉 Benefits of Universal Support

- ✅ **Future-proof**: Works with current and future navigation systems
- ✅ **Easy migration**: Smooth transition between navigation libraries
- ✅ **Consistent UX**: Same beautiful scaling effect regardless of navigation
- ✅ **Developer choice**: Use the navigation system you prefer
- ✅ **Community adoption**: Broader appeal = more users and contributors

This universal approach makes the scaling drawer the most versatile and future-proof drawer solution for React Native! 🚀
