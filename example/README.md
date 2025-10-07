# 📱 React Native Scaling Drawer - Example App

This is an example Expo Router application demonstrating the usage of `react-native-scaling-drawer`.

## 🚀 Quick Start

### Prerequisites
- Node.js 14+
- Expo CLI
- iOS Simulator or Android Emulator

### Installation

```bash
# From the root directory
npm install

# Install example dependencies
cd example
npm install

# Start the example app
npm start

# Or run platform-specific commands
npm run ios
npm run android
npm run web
```

## 📱 What's Included

### **Features Demonstrated:**
- ✅ **Basic Drawer Setup** - Simple drawer with scaling animation
- ✅ **Expo Router Integration** - Modern navigation with drawer
- ✅ **Gesture Controls** - Swipe to open/close drawer
- ✅ **Custom Styling** - Themed drawer with custom colors
- ✅ **Multiple Screens** - Navigation between different screens
- ✅ **Table Management** - Example table management interface
- ✅ **Advanced Search** - Search functionality with inline results

### **Example Screens:**
- **Home** - Main dashboard with drawer access
- **Tables** - Table management interface
- **Profile** - User profile screen
- **Settings** - App settings
- **Test Drawer** - Drawer testing and configuration

## 🎯 **Key Implementation Examples**

### **Basic Setup:**
```tsx
// app/_layout.tsx
import { DrawerProvider } from 'react-native-scaling-drawer';

export default function RootLayout() {
  return (
    <DrawerProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </DrawerProvider>
  );
}
```

### **Using the Drawer:**
```tsx
// Any component
import { useDrawer } from 'react-native-scaling-drawer';

function MyComponent() {
  const { open, close, toggle, isOpen } = useDrawer();
  
  return (
    <TouchableOpacity onPress={toggle}>
      <Text>Toggle Drawer</Text>
    </TouchableOpacity>
  );
}
```

### **Custom Drawer Content:**
```tsx
// components/DrawerContent.tsx
export function DrawerContent() {
  return (
    <View style={styles.container}>
      <Text>Custom Drawer Content</Text>
      {/* Your drawer menu items */}
    </View>
  );
}
```

## 🔧 **Configuration Examples**

### **Basic Configuration:**
```tsx
<DrawerProvider
  slideDistance={300}
  scaleFactor={0.8}
  animationDuration={250}
  enableGestures={true}
>
  <YourApp />
</DrawerProvider>
```

### **Advanced Configuration:**
```tsx
<DrawerProvider
  slideDistance={350}
  scaleFactor={0.75}
  animationDuration={300}
  enableGestures={false}  // Disable for scroll-heavy apps
  drawerBackgroundColor="#1a1a1a"
  borderRadius={25}
>
  <YourApp />
</DrawerProvider>
```

## 📚 **Learning Resources**

- **Package Documentation**: `../README.md`
- **API Reference**: Check the TypeScript definitions
- **Integration Guide**: See the package documentation

## 🛠 **Development**

### **Making Changes:**
1. Edit files in `../src/`
2. Build the package: `npm run build` (from root)
3. Test changes in this example app: `npm start`

### **Adding New Examples:**
1. Create new screens in `app/`
2. Add navigation in `app/_layout.tsx`
3. Demonstrate new features

## 🎨 **Customization**

This example shows various customization options:
- Custom drawer content
- Themed styling
- Gesture configuration
- Animation settings
- Integration patterns

Feel free to modify and experiment with different configurations!

## 📱 **Platform Support**

- ✅ **iOS** - Full support with native gestures
- ✅ **Android** - Full support with native gestures  
- ✅ **Web** - Basic support (limited gestures)

## 🚀 **Next Steps**

1. **Explore the Code** - Check out the implementation
2. **Try Different Configs** - Experiment with settings
3. **Build Your App** - Use this as a starting point
4. **Contribute** - Submit improvements or examples

Happy coding! 🎉
