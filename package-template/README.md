# 🎨 React Native Scaling Drawer

[![npm version](https://badge.fury.io/js/react-native-scaling-drawer.svg)](https://badge.fury.io/js/react-native-scaling-drawer)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

A beautiful, performant drawer navigation component with **scaling animations** and **shadow effects** for modern **Expo Router** applications. The main content scales down and slides to reveal the drawer underneath, creating a stunning visual effect.

**🚀 Built for the Future**: Designed specifically for modern Expo Router apps with TypeScript-first development!

## ✨ Features

- 🎯 **Beautiful Scaling Animation** - Main content scales and slides smoothly
- 🌟 **Layered Shadow Effects** - Multiple shadow layers for depth and realism
- ⚡ **High Performance** - Uses React Native Reanimated 3 for 60fps animations
- 🚀 **Expo Router First** - Built specifically for modern Expo Router apps
- 🎨 **Fully Customizable** - Colors, animations, dimensions, and more
- 📱 **Cross Platform** - Works on both iOS and Android
- 🔧 **TypeScript Ready** - Full type safety and IntelliSense support
- 🪶 **Modern Architecture** - Clean, maintainable code structure
- 🎮 **Gesture Support** - Smooth touch interactions and gestures
- 📦 **Easy Integration** - Simple setup with Expo Router

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

### 🚀 Expo Router Integration

```tsx
// app/_layout.tsx
import { Stack, useRouter } from 'expo-router';
import { ExpoRouterDrawer, DrawerMenuButton } from 'react-native-scaling-drawer';

export default function RootLayout() {
  const router = useRouter();

  return (
    <ExpoRouterDrawer
      menuItems={[
        { label: 'Home', href: '/' },
        { label: 'Profile', href: '/profile' },
        { label: 'Settings', href: '/settings' },
      ]}
      onNavigate={(href) => router.push(href)}
      drawerBackgroundColor="#673AB7"
      slideDistance={280}
      scaleFactor={0.85}
    >
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="profile" options={{ title: 'Profile' }} />
        <Stack.Screen name="settings" options={{ title: 'Settings' }} />
      </Stack>
    </ExpoRouterDrawer>
  );
}
```

### 🎨 Custom Implementation

```tsx
import { ScalingDrawer, DrawerProvider } from 'react-native-scaling-drawer';

const App = () => (
  <DrawerProvider
    slideDistance={280}
    scaleFactor={0.85}
    animationDuration={250}
  >
    <ScalingDrawer
      drawerContent={<MyCustomDrawerContent />}
      drawerBackgroundColor="#673AB7"
      showShadow={true}
      borderRadius={25}
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

### Using the Drawer Context

```tsx
import { useDrawerContext } from 'react-native-scaling-drawer';

function MyComponent() {
  const { openDrawer, closeDrawer, toggleDrawer, isOpen } = useDrawerContext();

  return (
    <View>
      <Text>Drawer is {isOpen ? 'open' : 'closed'}</Text>
      <Button title="Toggle Drawer" onPress={toggleDrawer} />
    </View>
  );
}
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
