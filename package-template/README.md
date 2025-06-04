# 🎨 React Native Scaling Drawer

[![npm version](https://badge.fury.io/js/react-native-scaling-drawer.svg)](https://badge.fury.io/js/react-native-scaling-drawer)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

A beautiful, performant drawer navigation component with **scaling animations** and **shadow effects** for React Native. The main content scales down and slides to reveal the drawer underneath, creating a stunning visual effect.

**🚀 Universal Navigation Support**: Works seamlessly with both **React Navigation** and **Expo Router**!

## ✨ Features

- 🎯 **Beautiful Scaling Animation** - Main content scales and slides smoothly
- 🌟 **Layered Shadow Effects** - Multiple shadow layers for depth and realism
- ⚡ **High Performance** - Uses native driver for 60fps animations
- 🎨 **Fully Customizable** - Colors, animations, dimensions, and more
- 📱 **Cross Platform** - Works on both iOS and Android
- 🔧 **TypeScript Support** - Full type safety and IntelliSense
- 🪶 **Lightweight** - Zero external dependencies
- 🎮 **Easy Integration** - Drop-in replacement for standard drawers
- 🧭 **Universal Navigation** - Supports React Navigation & Expo Router
- 📦 **Multiple Integration Options** - Choose the approach that fits your project

## 📱 Demo

> Add GIF or video demo here showing the scaling effect

## 🚀 Installation

```bash
npm install react-native-scaling-drawer
```

or

```bash
yarn add react-native-scaling-drawer
```

## 📖 Quick Start

Choose the integration method that fits your project:

### 🧭 Option 1: Expo Router (Recommended for new projects)

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
      ]}
      onNavigate={(href) => router.push(href)}
      drawerBackgroundColor="#2196F3"
    >
      <Stack
        screenOptions={{
          headerLeft: () => <ExpoDrawerMenuButton iconColor="#fff" />,
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="profile" options={{ title: 'Profile' }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ExpoRouterDrawer>
  );
}
```

### 🧭 Option 2: React Navigation

```tsx
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ReactNavigationDrawer, DrawerMenuButton } from 'react-native-scaling-drawer';

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <ReactNavigationDrawer
      menuItems={[
        { label: 'Home', screenName: 'Home' },
        { label: 'Profile', screenName: 'Profile' },
      ]}
      onNavigate={(screenName) => navigation.navigate(screenName)}
      drawerBackgroundColor="#2196F3"
    >
      <Stack.Navigator
        screenOptions={{
          headerLeft: () => <DrawerMenuButton iconColor="#fff" />,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </ReactNavigationDrawer>
  </NavigationContainer>
);
```

### 🎨 Option 3: Custom Implementation

```tsx
import { ScalingDrawer, DrawerProvider } from 'react-native-scaling-drawer';

const App = () => (
  <DrawerProvider>
    <ScalingDrawer
      drawerContent={<MyCustomDrawerContent />}
      drawerBackgroundColor="#2196F3"
    >
      <MyMainContent />
    </ScalingDrawer>
  </DrawerProvider>
);
```

## 🎛️ API Reference

### ScalingDrawer Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `drawerContent` | `ReactNode` | **Required** | Content to render inside the drawer |
| `children` | `ReactNode` | **Required** | Main content that will be scaled |
| `slideDistance` | `number` | `screenWidth * 0.7` | Distance the drawer slides |
| `scaleFactor` | `number` | `0.8` | Scale factor for main content (0-1) |
| `animationDuration` | `number` | `250` | Animation duration in milliseconds |
| `drawerBackgroundColor` | `string` | `'#FF0000'` | Background color of the drawer |
| `showShadow` | `boolean` | `true` | Whether to show shadow layers |
| `borderRadius` | `number` | `20` | Border radius for scaled content |
| `onDrawerOpen` | `() => void` | `undefined` | Callback when drawer opens |
| `onDrawerClose` | `() => void` | `undefined` | Callback when drawer closes |
| `closeOnContentPress` | `boolean` | `true` | Close drawer when main content is pressed |

### useScalingDrawer Hook

For advanced usage, you can use the hook directly:

```tsx
import { useScalingDrawer } from 'react-native-scaling-drawer';

const MyComponent = () => {
  const drawer = useScalingDrawer({
    slideDistance: 280,
    scaleFactor: 0.85,
    animationDuration: 300,
  });

  return (
    // Your custom implementation using drawer.openDrawer(), drawer.closeDrawer(), etc.
  );
};
```

## 🎨 Customization Examples

### Custom Colors and Animation

```tsx
<ScalingDrawer
  drawerContent={<MyDrawerContent />}
  drawerBackgroundColor="#673AB7"
  slideDistance={300}
  scaleFactor={0.75}
  animationDuration={400}
  borderRadius={25}
>
  <MyMainContent />
</ScalingDrawer>
```

### Disable Shadows

```tsx
<ScalingDrawer
  drawerContent={<MyDrawerContent />}
  showShadow={false}
>
  <MyMainContent />
</ScalingDrawer>
```

### Custom Styles

```tsx
<ScalingDrawer
  drawerContent={<MyDrawerContent />}
  drawerStyle={{ paddingTop: 50 }}
  contentStyle={{ backgroundColor: '#f0f0f0' }}
>
  <MyMainContent />
</ScalingDrawer>
```

## 🔧 Advanced Usage

### With React Navigation

```tsx
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <ScalingDrawer drawerContent={<MyDrawerContent />}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </ScalingDrawer>
  </NavigationContainer>
);
```

## 🎯 Performance Tips

1. **Use Native Driver**: All animations use the native driver by default for optimal performance
2. **Memoize Drawer Content**: Use `React.memo()` for your drawer content to prevent unnecessary re-renders
3. **Optimize Heavy Screens**: Consider lazy loading for complex screens

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT © [89viral1](https://github.com/89viral1)

## 🙏 Acknowledgments

- Inspired by modern mobile app design patterns
- Built with React Native's powerful Animated API
- Thanks to the React Native community for feedback and suggestions

---

**Made with ❤️ by [89viral1](https://github.com/89viral1)**
