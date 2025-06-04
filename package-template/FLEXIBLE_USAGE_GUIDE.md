# 🎨 Flexible Usage Guide - React Native Scaling Drawer

This guide shows you how to use the React Native Scaling Drawer with **maximum flexibility** - no forced headers, complete customization, and drawer control from anywhere in your app.

## 🚀 **Core Philosophy: Complete Flexibility**

The drawer is designed to be **completely customizable** and **non-opinionated**. You have full control over:

- ✅ **When to open/close** the drawer (custom buttons, gestures, programmatically)
- ✅ **What's inside** the drawer (completely custom content)
- ✅ **How it looks** (full styling control)
- ✅ **Where controls are placed** (anywhere in your app)

## 🎯 **Method 1: Complete Custom Control**

### Basic Setup with Full Control

```tsx
// app/_layout.tsx
import { DrawerProvider, ScalingDrawer, useDrawer } from 'react-native-scaling-drawer';

// Your custom drawer content
function MyCustomDrawer() {
  const { close } = useDrawer();
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#673AB7', padding: 20, paddingTop: 60 }}>
      <Text style={{ color: '#fff', fontSize: 24, marginBottom: 30 }}>My App</Text>
      
      <TouchableOpacity onPress={() => { router.push('/'); close(); }}>
        <Text style={{ color: '#fff', fontSize: 18, marginBottom: 20 }}>🏠 Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => { router.push('/profile'); close(); }}>
        <Text style={{ color: '#fff', fontSize: 18, marginBottom: 20 }}>👤 Profile</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => { router.push('/settings'); close(); }}>
        <Text style={{ color: '#fff', fontSize: 18, marginBottom: 20 }}>⚙️ Settings</Text>
      </TouchableOpacity>
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
        drawerContent={<MyCustomDrawer />}
        drawerBackgroundColor="#673AB7"
        showShadow={true}
        borderRadius={25}
      >
        <Stack>
          <Stack.Screen name="index" options={{ title: 'Home' }} />
          <Stack.Screen name="profile" options={{ title: 'Profile' }} />
          <Stack.Screen name="settings" options={{ title: 'Settings' }} />
        </Stack>
      </ScalingDrawer>
    </DrawerProvider>
  );
}
```

## 🎮 **Method 2: Control from Anywhere**

### Custom Header with Drawer Control

```tsx
// components/CustomHeader.tsx
import { useDrawer } from 'react-native-scaling-drawer';

export function CustomHeader({ title }: { title: string }) {
  const { open, isOpen } = useDrawer();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={open} style={styles.menuButton}>
        <Text style={styles.menuIcon}>☰</Text>
      </TouchableOpacity>
      
      <Text style={styles.title}>{title}</Text>
      
      <View style={styles.rightSection}>
        <Text style={styles.status}>
          {isOpen ? '🟢' : '🔴'}
        </Text>
      </View>
    </View>
  );
}
```

### Floating Action Button

```tsx
// components/FloatingMenuButton.tsx
import { useDrawer } from 'react-native-scaling-drawer';

export function FloatingMenuButton() {
  const { toggle, isOpen } = useDrawer();

  return (
    <TouchableOpacity 
      style={[styles.fab, { backgroundColor: isOpen ? '#f44336' : '#673AB7' }]}
      onPress={toggle}
    >
      <Text style={styles.fabText}>
        {isOpen ? '✕' : '☰'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fabText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
```

### Programmatic Control

```tsx
// Any component in your app
import { useDrawer } from 'react-native-scaling-drawer';

function MyComponent() {
  const { open, close, toggle, isOpen } = useDrawer();

  const handleSpecialAction = () => {
    // Open drawer programmatically
    open();
    
    // Or close it after some action
    setTimeout(() => {
      close();
    }, 2000);
  };

  return (
    <View>
      <Button title="Open Menu" onPress={open} />
      <Button title="Close Menu" onPress={close} />
      <Button title="Toggle Menu" onPress={toggle} />
      <Button title="Special Action" onPress={handleSpecialAction} />
      
      <Text>Drawer is {isOpen ? 'open' : 'closed'}</Text>
    </View>
  );
}
```

## 🎨 **Method 3: Quick Setup (Optional)**

If you want a quick setup with default menu items, you can still use the ExpoRouterDrawer:

```tsx
import { ExpoRouterDrawer } from 'react-native-scaling-drawer';

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
    >
      <Stack>
        {/* Your screens */}
      </Stack>
    </ExpoRouterDrawer>
  );
}
```

## 🎯 **Advanced Customization**

### Custom Drawer with Sections

```tsx
function AdvancedDrawer() {
  const { close } = useDrawer();
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#673AB7' }}>
      {/* Header */}
      <View style={{ padding: 20, paddingTop: 60, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.2)' }}>
        <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(255,255,255,0.2)', marginBottom: 10 }} />
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>John Doe</Text>
        <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>john@example.com</Text>
      </View>

      {/* Main Menu */}
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, marginBottom: 15, textTransform: 'uppercase' }}>
          Main
        </Text>
        
        {[
          { label: 'Home', href: '/', icon: '🏠' },
          { label: 'Profile', href: '/profile', icon: '👤' },
          { label: 'Messages', href: '/messages', icon: '💬' },
        ].map((item, index) => (
          <TouchableOpacity 
            key={index}
            style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }}
            onPress={() => { router.push(item.href); close(); }}
          >
            <Text style={{ fontSize: 20, marginRight: 15 }}>{item.icon}</Text>
            <Text style={{ color: '#fff', fontSize: 16 }}>{item.label}</Text>
          </TouchableOpacity>
        ))}

        <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 30, marginBottom: 15, textTransform: 'uppercase' }}>
          Settings
        </Text>
        
        {[
          { label: 'Settings', href: '/settings', icon: '⚙️' },
          { label: 'Help', href: '/help', icon: '❓' },
        ].map((item, index) => (
          <TouchableOpacity 
            key={index}
            style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }}
            onPress={() => { router.push(item.href); close(); }}
          >
            <Text style={{ fontSize: 20, marginRight: 15 }}>{item.icon}</Text>
            <Text style={{ color: '#fff', fontSize: 16 }}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Footer */}
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.2)' }}>
        <TouchableOpacity style={{ paddingVertical: 12 }}>
          <Text style={{ color: '#fff', fontSize: 16 }}>🚪 Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
```

## 🎮 **Gesture Support**

The drawer automatically supports:
- **Swipe from left edge** to open
- **Tap outside content** to close
- **Programmatic control** from anywhere

## 🎯 **Key Benefits**

1. **🚀 No Forced Structure** - Use your own headers, buttons, or controls
2. **🎨 Complete Customization** - Full control over drawer content and styling
3. **🎮 Global Control** - Open/close from anywhere in your app
4. **⚡ Simple API** - Just `useDrawer()` hook for all controls
5. **🔧 TypeScript Ready** - Full type safety and IntelliSense

## 🎊 **Summary**

The React Native Scaling Drawer gives you **complete freedom**:

- ✅ **No forced headers** - Use any header structure you want
- ✅ **Control from anywhere** - `useDrawer()` hook works globally
- ✅ **Custom drawer content** - Build exactly what you need
- ✅ **Flexible integration** - Works with any Expo Router setup
- ✅ **Gesture support** - Built-in swipe and tap gestures

**You're in complete control of when, where, and how the drawer opens!** 🎨
