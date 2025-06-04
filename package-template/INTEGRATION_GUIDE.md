# 🔧 Integration Guide - React Native Scaling Drawer

This guide shows you how to integrate the React Native Scaling Drawer into your modern Expo Router project.

## 📦 Installation

```bash
npm install react-native-scaling-drawer
# or
yarn add react-native-scaling-drawer
```

### Dependencies

Make sure you have these dependencies installed (usually included with Expo):

```bash
npm install react-native-reanimated react-native-gesture-handler expo expo-router
# or
yarn add react-native-reanimated react-native-gesture-handler expo expo-router
```

## 🎯 Expo Router Integration

### Step 1: Update your root layout

```tsx
// app/_layout.tsx
import { Stack } from 'expo-router';
import { DrawerProvider, ScalingDrawer } from 'react-native-scaling-drawer';

function CustomDrawerContent() {
  // Your custom drawer content here
  return (
    <View style={{ flex: 1, backgroundColor: '#673AB7' }}>
      {/* Your menu items */}
    </View>
  );
}

export default function RootLayout() {
  return (
    <DrawerProvider
      slideDistance={280}
      scaleFactor={0.85}
      animationDuration={250}
    >
      <ScalingDrawer
        drawerContent={<CustomDrawerContent />}
        drawerBackgroundColor="#673AB7"
        showShadow={true}
        borderRadius={25}
      >
        <Stack>
          <Stack.Screen name="index" options={{ title: 'Home' }} />
          {/* Your other screens */}
        </Stack>
      </ScalingDrawer>
    </DrawerProvider>
  );
}
```

### Step 2: Add menu button to screens

```tsx
// app/index.tsx
import { useDrawerContext } from 'react-native-scaling-drawer';

export default function HomeScreen() {
  const { openDrawer } = useDrawerContext();

  return (
    <View>
      <TouchableOpacity onPress={openDrawer}>
        <Text>☰</Text>
      </TouchableOpacity>
      {/* Your screen content */}
    </View>
  );
}
```

## 🎨 Custom Drawer Content

### Basic Custom Drawer

```tsx
import { View, Text, TouchableOpacity } from 'react-native';
import { useDrawerContext } from 'react-native-scaling-drawer';
import { useRouter } from 'expo-router';

function MyDrawerContent() {
  const { closeDrawer } = useDrawerContext();
  const router = useRouter();

  const navigate = (href: string) => {
    router.push(href);
    closeDrawer();
  };

  return (
    <View style={{ flex: 1, padding: 20, paddingTop: 60 }}>
      {/* Header */}
      <View style={{ marginBottom: 30 }}>
        <Text style={{ fontSize: 24, color: '#fff', fontWeight: 'bold' }}>
          My App
        </Text>
      </View>

      {/* Menu Items */}
      <TouchableOpacity onPress={() => navigate('/')}>
        <Text style={{ fontSize: 18, color: '#fff', marginBottom: 20 }}>
          🏠 Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigate('/profile')}>
        <Text style={{ fontSize: 18, color: '#fff', marginBottom: 20 }}>
          👤 Profile
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigate('/settings')}>
        <Text style={{ fontSize: 18, color: '#fff', marginBottom: 20 }}>
          ⚙️ Settings
        </Text>
      </TouchableOpacity>
    </View>
  );
}
```

### Advanced Custom Drawer with Sections

```tsx
function AdvancedDrawerContent() {
  const { closeDrawer } = useDrawerContext();
  const router = useRouter();

  const mainMenuItems = [
    { label: 'Home', href: '/', icon: '🏠' },
    { label: 'Profile', href: '/profile', icon: '👤' },
    { label: 'Messages', href: '/messages', icon: '💬' },
  ];

  const settingsItems = [
    { label: 'Settings', href: '/settings', icon: '⚙️' },
    { label: 'Help', href: '/help', icon: '❓' },
  ];

  return (
    <View style={styles.drawerContainer}>
      {/* User Header */}
      <View style={styles.userHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>JD</Text>
        </View>
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.userEmail}>john@example.com</Text>
      </View>

      {/* Main Menu */}
      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Main</Text>
        {mainMenuItems.map((item, index) => (
          <MenuItem key={index} item={item} onPress={navigate} />
        ))}
      </View>

      {/* Settings Menu */}
      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Settings</Text>
        {settingsItems.map((item, index) => (
          <MenuItem key={index} item={item} onPress={navigate} />
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>🚪 Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
```

## ⚙️ Configuration Options

### Drawer Provider Configuration

```tsx
<DrawerProvider
  slideDistance={300}        // Distance content slides (default: 70% of screen width)
  scaleFactor={0.8}         // Scale factor for content (default: 0.8)
  animationDuration={250}   // Animation duration in ms (default: 250)
  shadowOpacity={1}         // Shadow opacity (default: 1)
  borderRadius={20}         // Border radius when scaled (default: 20)
>
```

### Scaling Drawer Configuration

```tsx
<ScalingDrawer
  drawerContent={<YourDrawerContent />}
  drawerBackgroundColor="#673AB7"    // Drawer background color
  showShadow={true}                  // Enable/disable shadow effects
  drawerStyle={{ padding: 20 }}     // Custom drawer styles
  contentStyle={{ margin: 10 }}     // Custom content styles
  onDrawerOpen={() => console.log('Opened')}
  onDrawerClose={() => console.log('Closed')}
  closeOnContentPress={true}         // Close when tapping content
  borderRadius={25}                  // Override border radius
>
```

## 🎮 Controlling the Drawer

### Using the Hook

```tsx
import { useDrawerContext } from 'react-native-scaling-drawer';

function MyComponent() {
  const {
    isOpen,
    openDrawer,
    closeDrawer,
    toggleDrawer
  } = useDrawerContext();

  return (
    <View>
      <Text>Drawer is {isOpen ? 'open' : 'closed'}</Text>
      <Button title="Toggle Drawer" onPress={toggleDrawer} />
    </View>
  );
}
```

### Menu Button Component

```tsx
function MenuButton() {
  const { openDrawer } = useDrawerContext();

  return (
    <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
      <Text style={styles.menuIcon}>☰</Text>
    </TouchableOpacity>
  );
}
```

## 🎨 Styling Tips

### Custom Shadow Effects

```tsx
<ScalingDrawer
  showShadow={true}
  contentStyle={{
    shadowColor: '#000',
    shadowOffset: { width: -5, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 15,
  }}
>
```

### Responsive Design

```tsx
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

<DrawerProvider
  slideDistance={width * 0.75}  // 75% of screen width
  scaleFactor={width > 400 ? 0.85 : 0.8}  // Different scale for larger screens
>
```

## 🔄 Migration from Other Drawers

### From Expo Router Drawer

```tsx
// Before (Expo Router Drawer)
import { Drawer } from 'expo-router/drawer';

// After (Scaling Drawer)
import { DrawerProvider, ScalingDrawer } from 'react-native-scaling-drawer';
```

## 🐛 Common Issues

### 1. Animations not smooth
- Ensure React Native Reanimated is properly configured
- Test on physical device for best performance

### 2. TypeScript errors
- Make sure you have `@types/react-native` installed
- Check that your TypeScript version is compatible

### 3. Gesture conflicts
- Make sure React Native Gesture Handler is properly set up
- Check for conflicting gesture recognizers

## 📱 Platform Considerations

### iOS
- Works with iOS 11+
- Supports safe area insets automatically
- Smooth animations with 60fps

### Android
- Works with Android API 21+
- Handles hardware back button
- Optimized for different screen densities

## 🚀 Performance Tips

1. **Use native driver**: All animations use native driver by default
2. **Optimize drawer content**: Keep drawer content lightweight
3. **Memoize components**: Use React.memo for drawer content
4. **Test on device**: Always test on physical devices for accurate performance

## 📚 Next Steps

1. Check out the [example app](./example) for a complete implementation
2. Read the [API documentation](./README.md) for detailed prop information
3. Explore the [source code](./src) to understand the implementation
4. Join the community and contribute on GitHub

Happy coding! 🎉
