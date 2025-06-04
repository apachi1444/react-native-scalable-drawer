# 🚀 Installation Guide - React Native Scaling Drawer Example

This guide will help you set up and run the React Native Scaling Drawer example app.

## 📋 Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** or **yarn**
- **Expo CLI** (latest version)
- **Expo Go app** on your mobile device (for testing)

## 🛠️ Installation Steps

### 1. Install Dependencies

Navigate to the example directory and install all required dependencies:

```bash
cd example
npm install
```

### 2. Install the Package Locally

Since this example uses the local package, make sure the parent package is built:

```bash
# Go back to the package root
cd ..

# Build the package
npm run build

# Go back to example
cd example
```

### 3. Start the Development Server

```bash
npm start
```

This will start the Expo development server and show you a QR code.

### 4. Run on Your Device

**Option A: Using Expo Go (Recommended for testing)**
1. Install the Expo Go app on your iOS/Android device
2. Scan the QR code with your camera (iOS) or Expo Go app (Android)
3. The app will load on your device

**Option B: Using Simulators**
```bash
# For iOS Simulator (macOS only)
npm run ios

# For Android Emulator
npm run android
```

## 🎯 What You'll See

Once the app loads, you'll see:

1. **Home Screen** with a menu button (☰) in the top-left
2. **Beautiful drawer** that slides out when you tap the menu button
3. **Scaling animation** where the main content scales down to 85%
4. **Shadow effects** that create depth
5. **Multiple screens** you can navigate to from the drawer

## 🎮 How to Test

### Basic Functionality
1. **Open drawer**: Tap the menu button (☰) or swipe from left edge
2. **Navigate**: Tap any menu item to go to different screens
3. **Close drawer**: Tap anywhere on the main content or tap menu button again

### Animation Features
- Watch how the content **scales down** smoothly
- Notice the **shadow layers** that appear behind the content
- See how the content **slides to the right** to reveal the drawer
- Observe the **rounded corners** that appear when scaled

### Screen Navigation
- **Home**: Overview and features explanation
- **Profile**: User profile with stats
- **Settings**: Various app settings with toggles
- **About**: Information about the package
- **Contact**: Contact form (demo only)

## 🔧 Customization

You can customize the drawer by modifying `app/_layout.tsx`:

```tsx
<DrawerProvider
  slideDistance={280}        // How far content slides (px)
  scaleFactor={0.85}        // Scale factor (0.1 - 1.0)
  animationDuration={250}   // Animation speed (ms)
>
  <ScalingDrawer
    drawerBackgroundColor="#673AB7"  // Drawer background
    showShadow={true}                // Enable/disable shadows
    borderRadius={25}                // Corner radius when scaled
  >
```

## 🐛 Troubleshooting

### Common Issues

**1. "Module not found" errors**
```bash
# Clear Metro cache
npx expo start --clear

# Reinstall dependencies
rm -rf node_modules
npm install
```

**2. "react-native-scaling-drawer not found"**
```bash
# Make sure the parent package is built
cd ..
npm run build
cd example
```

**3. Animation not smooth**
- Make sure you're testing on a physical device
- Ensure React Native Reanimated is properly installed
- Check that you have the latest Expo SDK

**4. TypeScript errors**
```bash
# Check TypeScript configuration
npx tsc --noEmit
```

### Performance Tips

1. **Test on physical device** for best performance
2. **Enable Hermes** (already configured in Expo)
3. **Use production build** for final testing:
   ```bash
   expo build:android
   expo build:ios
   ```

## 📱 Device Compatibility

This example works on:
- ✅ **iOS** (iPhone 6s and newer)
- ✅ **Android** (API level 21+)
- ✅ **Expo Go** (latest version)
- ✅ **Physical devices** (recommended)
- ✅ **Simulators/Emulators**

## 🔄 Development Workflow

1. **Make changes** to the source code
2. **Save files** - Metro will automatically reload
3. **Test immediately** on your device
4. **Iterate quickly** with hot reloading

## 📚 Next Steps

After running the example:

1. **Study the code** in `app/_layout.tsx` to understand the setup
2. **Explore individual screens** to see different use cases
3. **Modify the drawer content** to match your app's needs
4. **Customize animations** and styling
5. **Integrate into your own project**

## 🆘 Need Help?

If you encounter any issues:

1. Check the [main README](../README.md) for detailed documentation
2. Look at the [troubleshooting section](#troubleshooting) above
3. Open an issue on GitHub with:
   - Your React Native version
   - Device/simulator information
   - Steps to reproduce the problem
   - Error messages or screenshots

## 🎉 Success!

If everything is working correctly, you should see a beautiful scaling drawer animation when you tap the menu button. The content should smoothly scale down and slide to reveal the drawer underneath.

Enjoy exploring the React Native Scaling Drawer! 🚀
