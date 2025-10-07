# 🎨 React Native Scaling Drawer

<div align="center">

![React Native Scaling Drawer](https://user-images.githubusercontent.com/16062886/117444014-2d1ffd80-af39-11eb-9bbb-33c320599d93.png)

**A beautiful, performant drawer navigation with scaling animations and shadow effects for Expo Router and React Native**

[![npm version](https://badge.fury.io/js/@apachi14444/react-native-scaling-drawer.svg)](https://badge.fury.io/js/@apachi14444/react-native-scaling-drawer)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![Expo](https://img.shields.io/badge/Expo-Ready-blue.svg)](https://expo.dev)

</div>

## ✨ Features

- 🎯 **Modern Design** - Beautiful scaling animations with shadow effects
- ⚡ **High Performance** - 60fps animations using React Native Reanimated 3
- 🎮 **Gesture Support** - Smooth touch interactions (optional)
- 📱 **Cross Platform** - iOS, Android, and Web support
- 🧩 **Expo Router Ready** - Seamless integration with modern navigation
- 🎨 **Fully Customizable** - Colors, animations, dimensions, and more
- 📦 **TypeScript** - Full type safety with comprehensive definitions
- 🔧 **Easy Integration** - Drop-in replacement for standard drawers

## 🚀 Quick Start

### Installation

```bash
# npm
npm install @apachi14444/react-native-scaling-drawer

# yarn
yarn add @apachi14444/react-native-scaling-drawer

# pnpm
pnpm add @apachi14444/react-native-scaling-drawer
```

### Dependencies

This package requires:
- `react-native-reanimated` (>= 3.0.0)
- `react-native-gesture-handler` (>= 2.0.0)

### Basic Usage

```tsx
import { DrawerProvider, useDrawer } from '@apachi14444/react-native-scaling-drawer';

// 1. Wrap your app with DrawerProvider
export default function App() {
  return (
    <DrawerProvider>
      <YourAppContent />
    </DrawerProvider>
  );
}

// 2. Use the drawer in any component
function MenuButton() {
  const { toggle } = useDrawer();

  return (
    <TouchableOpacity onPress={toggle}>
      <Text>☰</Text>
    </TouchableOpacity>
  );
}
```

## 📱 Example App

Check out the full example app in the [`example`](./example) directory:

```bash
# Clone the repository
git clone https://github.com/apachi1444/react-native-scalable-drawer.git

# Install dependencies
cd react-native-scalable-drawer
npm install

# Install example dependencies
cd example
npm install

# Run the example app
npm start
```

## 📚 Documentation

### **Core Components**
- `DrawerProvider` - Main provider component
- `ScalingDrawer` - Advanced drawer component
- `useDrawer` - Simple drawer hook
- `useScalingDrawer` - Advanced drawer hook

### **Expo Router Integration**
- `ExpoRouterDrawer` - Ready-to-use Expo Router drawer
- `DrawerMenuButton` - Pre-styled menu button

Check the [`src/`](./src) directory for full implementation details.

## 🎯 Key Features

### **🎨 Beautiful Animations**
- Smooth scaling transitions
- Elegant shadow effects
- Customizable animation curves
- 60fps performance

### **🎮 Gesture Support**
- Swipe to open/close
- Configurable gesture areas
- Scroll-friendly (optional)
- Native feel on all platforms

### **🧩 Modern Integration**
- Expo Router ready
- TypeScript support
- Context-based state management
- Flexible architecture

### **⚙️ Highly Customizable**
- Animation duration and easing
- Scale factor and slide distance
- Colors and styling
- Gesture behavior

## 🏗️ Repository Structure

Simple and clean structure:

```
react-native-scalable-drawer/
├── src/                    # 📦 Library source code
├── lib/                    # 📦 Compiled library
├── example/                # 📱 Example Expo app
├── package.json            # 📦 Package configuration
└── README.md               # 📖 Documentation
```

## 🛠️ Development

### **Package Development**
```bash
# Build the package
npm run build

# Watch for changes
npm run build:watch

# Run tests
npm test

# Type checking
npm run typecheck
```

### **Example App Development**
```bash
# Start the example app
cd example && npm start

# Run on specific platforms
cd example && npm run ios
cd example && npm run android
```

## 📋 Requirements

- **React Native** 0.68+
- **Expo SDK** 47+ (if using Expo)
- **React Native Reanimated** 3.0+
- **React Native Gesture Handler** 2.0+

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Credits

Created with ❤️ by [apachi1444](https://github.com/apachi1444)

Inspired by modern mobile design patterns and built for the React Native community.

## 🌟 Show Your Support

If this project helped you, please give it a ⭐️ on GitHub!

---

<div align="center">

**[📦 Source](./src) • [📱 Example](./example) • [🐛 Issues](https://github.com/apachi1444/react-native-scalable-drawer/issues)**

</div>
