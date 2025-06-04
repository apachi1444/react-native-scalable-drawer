# React Native Scaling Drawer - Example App

This is a complete example app demonstrating how to use the `react-native-scaling-drawer` package with Expo Router.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Run on your device:**
   - Scan the QR code with Expo Go app (iOS/Android)
   - Or press `i` for iOS simulator
   - Or press `a` for Android emulator

## 📱 What's Included

This example app demonstrates:

- ✅ **Basic drawer setup** with Expo Router
- ✅ **Multiple screens** (Home, Profile, Settings, About, Contact)
- ✅ **Custom drawer content** with header, menu items, and footer
- ✅ **Drawer state management** using context
- ✅ **Beautiful animations** with scaling and shadow effects
- ✅ **TypeScript support** with full type safety
- ✅ **Responsive design** that works on all screen sizes

## 🎨 Features Demonstrated

### Core Functionality
- Opening/closing drawer with menu button
- Smooth scaling animations (85% scale factor)
- Beautiful shadow effects with multiple layers
- Custom slide distance (280px)
- Gesture support for drawer interaction

### Navigation
- Expo Router integration
- Multiple screens with proper navigation
- Drawer state preserved across screens
- Custom header with menu button

### Styling
- Custom drawer background color (#673AB7)
- Rounded corners when scaled (25px border radius)
- Professional UI design with cards and shadows
- Consistent color scheme throughout

## 📁 Project Structure

```
example/
├── app/
│   ├── _layout.tsx          # Root layout with drawer setup
│   ├── index.tsx            # Home screen
│   ├── profile.tsx          # Profile screen
│   ├── settings.tsx         # Settings screen
│   ├── about.tsx            # About screen
│   └── contact.tsx          # Contact screen
├── package.json             # Dependencies and scripts
├── app.json                 # Expo configuration
├── babel.config.js          # Babel configuration
├── metro.config.js          # Metro bundler configuration
└── tsconfig.json            # TypeScript configuration
```

## 🔧 Configuration

The drawer is configured in `app/_layout.tsx`:

```tsx
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
    {/* Your app content */}
  </ScalingDrawer>
</DrawerProvider>
```

## 🎮 How to Use

1. **Open the drawer:**
   - Tap the menu button (☰) in any screen header
   - Or swipe from the left edge of the screen

2. **Navigate between screens:**
   - Tap any menu item in the drawer
   - Watch the smooth navigation transitions

3. **Close the drawer:**
   - Tap anywhere on the main content
   - Or tap the menu button again

## 📚 Learn More

- [React Native Scaling Drawer Documentation](../README.md)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)

## 🐛 Troubleshooting

If you encounter any issues:

1. Make sure all dependencies are installed: `npm install`
2. Clear Metro cache: `npx expo start --clear`
3. Check that you have the latest version of Expo CLI
4. Ensure React Native Reanimated is properly configured

## 📄 License

This example is part of the React Native Scaling Drawer package and is licensed under the MIT License.
