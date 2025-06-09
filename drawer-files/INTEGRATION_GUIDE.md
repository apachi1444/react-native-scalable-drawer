# 🎨 Scaling Drawer Integration Guide

This guide will help you integrate the Scaling Drawer into your React Native project.

## 📁 File Structure

Copy these files to your project:

```
your-project/
├── components/
│   ├── DrawerContext.tsx
│   └── ScalingDrawer.tsx
├── hooks/
│   ├── useDrawer.ts
│   └── useScalingDrawer.ts
└── index.ts (optional - for easier imports)
```

## 🚀 Basic Setup

### 1. Wrap Your App with DrawerProvider

In your root layout file (e.g., `app/_layout.tsx` for Expo Router):

```tsx
import React from 'react';
import { Stack } from 'expo-router';
import { DrawerProvider, ScalingDrawer } from './path-to-your-drawer-files';

// Your custom drawer content
function CustomDrawerContent() {
  return (
    <View style={{ flex: 1, backgroundColor: '#673AB7', padding: 20 }}>
      <Text style={{ color: 'white', fontSize: 18 }}>Menu Items</Text>
      {/* Add your menu items here */}
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

### 2. Control the Drawer from Any Component

```tsx
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useDrawer } from './path-to-your-drawer-files';

export function MenuButton() {
  const { toggle, isOpen } = useDrawer();

  return (
    <TouchableOpacity onPress={toggle}>
      <Text style={{ fontSize: 18, color: 'white' }}>
        {isOpen ? '✕' : '☰'}
      </Text>
    </TouchableOpacity>
  );
}
```

## ⚙️ Configuration Options

### DrawerProvider Props

```tsx
<DrawerProvider
  slideDistance={280}        // How far the drawer slides (default: 70% of screen width)
  scaleFactor={0.85}         // Scale factor for main content (default: 0.8)
  animationDuration={250}    // Animation duration in ms (default: 250)
  shadowOpacity={1}          // Shadow opacity when open (default: 1)
>
```

### ScalingDrawer Props

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

## 🎮 Using the Hooks

### useDrawer Hook (Simplified)

```tsx
import { useDrawer } from './hooks/useDrawer';

function MyComponent() {
  const { open, close, toggle, isOpen } = useDrawer();

  return (
    <View>
      <Button title="Open Menu" onPress={open} />
      <Button title="Close Menu" onPress={close} />
      <Button title="Toggle Menu" onPress={toggle} />
      <Text>Drawer is {isOpen ? 'open' : 'closed'}</Text>
    </View>
  );
}
```

### useDrawerContext Hook (Advanced)

```tsx
import { useDrawerContext } from './components/DrawerContext';

function AdvancedComponent() {
  const { 
    isOpen, 
    openDrawer, 
    closeDrawer, 
    slideAnim, 
    scaleAnim 
  } = useDrawerContext();

  // Access to all animated values for custom animations
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

## 🔧 Troubleshooting

### Common Issues

1. **"useDrawerContext must be used within a DrawerProvider"**
   - Make sure your component is wrapped with `<DrawerProvider>`

2. **Animations not working**
   - Ensure you're not mixing `useNativeDriver: true` with layout animations

3. **TypeScript errors**
   - Make sure all type definitions are properly imported

### Performance Tips

- Use `useNativeDriver: true` for better performance (already implemented)
- Avoid heavy computations in drawer content during animations
- Consider using `React.memo` for drawer content if it's complex

## 📱 Platform Considerations

- Works on both iOS and Android
- Handles safe areas automatically when used with `react-native-safe-area-context`
- Respects device orientation changes

## 🎯 Best Practices

1. Keep drawer content lightweight for smooth animations
2. Use consistent colors and styling across your app
3. Provide clear visual feedback for drawer state
4. Test on different screen sizes and orientations
5. Consider accessibility features (screen readers, etc.)

That's it! You now have a fully functional scaling drawer in your project. 🎉
