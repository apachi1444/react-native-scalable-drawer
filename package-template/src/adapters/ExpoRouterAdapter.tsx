import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ScalingDrawer } from '../components/ScalingDrawer';
import { DrawerProvider } from '../context/DrawerContext';
import { useDrawerContext } from '../context/DrawerContext';
import { ScalingDrawerConfig } from '../hooks/useScalingDrawer';

export interface ExpoDrawerMenuItem {
  /** Display name for the menu item */
  label: string;
  /** Expo Router href (e.g., '/home', '/profile', '/(tabs)/settings') */
  href: string;
  /** Optional icon component */
  icon?: ReactNode;
  /** Whether this item is currently active */
  active?: boolean;
}

export interface ExpoRouterDrawerProps extends ScalingDrawerConfig {
  /** Array of menu items with Expo Router hrefs */
  menuItems: ExpoDrawerMenuItem[];
  /** Function to handle navigation (usually router.push) */
  onNavigate: (href: string) => void;
  /** Main content (usually your Slot or Stack) */
  children: ReactNode;
  /** Background color of the drawer */
  drawerBackgroundColor?: string;
  /** Custom header component for the drawer */
  drawerHeader?: ReactNode;
  /** Custom footer component for the drawer */
  drawerFooter?: ReactNode;
  /** Custom styles for menu items */
  menuItemStyle?: any;
  /** Custom styles for menu item text */
  menuItemTextStyle?: any;
}

/**
 * Header component that can be used with Expo Router
 * Provides a burger menu button that opens the drawer
 */
export const ExpoDrawerMenuButton: React.FC<{ 
  style?: any;
  iconColor?: string;
}> = ({ 
  style,
  iconColor = '#000' 
}) => {
  const { openDrawer } = useDrawerContext();

  return (
    <TouchableOpacity 
      style={[styles.menuButton, style]} 
      onPress={openDrawer}
    >
      <View style={styles.burgerIcon}>
        <View style={[styles.burgerLine, { backgroundColor: iconColor }]} />
        <View style={[styles.burgerLine, { backgroundColor: iconColor }]} />
        <View style={[styles.burgerLine, { backgroundColor: iconColor }]} />
      </View>
    </TouchableOpacity>
  );
};

/**
 * Default drawer content component for Expo Router
 */
const DefaultExpoDrawerContent: React.FC<{
  menuItems: ExpoDrawerMenuItem[];
  onNavigate: (href: string) => void;
  header?: ReactNode;
  footer?: ReactNode;
  menuItemStyle?: any;
  menuItemTextStyle?: any;
}> = ({ 
  menuItems, 
  onNavigate, 
  header, 
  footer,
  menuItemStyle,
  menuItemTextStyle 
}) => {
  const { closeDrawer } = useDrawerContext();

  const handleNavigation = (href: string) => {
    onNavigate(href);
    closeDrawer();
  };

  return (
    <View style={styles.drawerContent}>
      {header && <View style={styles.headerContainer}>{header}</View>}
      
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.menuItem, menuItemStyle]}
            onPress={() => handleNavigation(item.href)}
          >
            {item.icon && <View style={styles.iconContainer}>{item.icon}</View>}
            <Text style={[styles.menuItemText, menuItemTextStyle]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {footer && <View style={styles.footerContainer}>{footer}</View>}
    </View>
  );
};

/**
 * Expo Router Drawer Adapter
 * 
 * Provides seamless integration with Expo Router
 * 
 * @example
 * ```tsx
 * // app/_layout.tsx
 * import { Stack } from 'expo-router';
 * import { ExpoRouterDrawer, ExpoDrawerMenuButton } from 'react-native-scaling-drawer';
 * import { useRouter } from 'expo-router';
 * 
 * export default function RootLayout() {
 *   const router = useRouter();
 * 
 *   return (
 *     <ExpoRouterDrawer
 *       menuItems={[
 *         { label: 'Home', href: '/' },
 *         { label: 'Profile', href: '/profile' },
 *         { label: 'Settings', href: '/(tabs)/settings' },
 *       ]}
 *       onNavigate={(href) => router.push(href)}
 *     >
 *       <Stack
 *         screenOptions={{
 *           headerLeft: () => <ExpoDrawerMenuButton />,
 *         }}
 *       >
 *         <Stack.Screen name="index" options={{ title: 'Home' }} />
 *         <Stack.Screen name="profile" options={{ title: 'Profile' }} />
 *         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
 *       </Stack>
 *     </ExpoRouterDrawer>
 *   );
 * }
 * ```
 */
export const ExpoRouterDrawer: React.FC<ExpoRouterDrawerProps> = ({
  menuItems,
  onNavigate,
  children,
  drawerBackgroundColor = '#FF0000',
  drawerHeader,
  drawerFooter,
  menuItemStyle,
  menuItemTextStyle,
  ...drawerConfig
}) => {
  const drawerContent = (
    <DefaultExpoDrawerContent
      menuItems={menuItems}
      onNavigate={onNavigate}
      header={drawerHeader}
      footer={drawerFooter}
      menuItemStyle={menuItemStyle}
      menuItemTextStyle={menuItemTextStyle}
    />
  );

  return (
    <DrawerProvider {...drawerConfig}>
      <ScalingDrawer
        drawerContent={drawerContent}
        drawerBackgroundColor={drawerBackgroundColor}
      >
        {children}
      </ScalingDrawer>
    </DrawerProvider>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    padding: 10,
    marginLeft: 5,
  },
  burgerIcon: {
    width: 24,
    height: 18,
    justifyContent: 'space-between',
  },
  burgerLine: {
    width: '100%',
    height: 2,
    borderRadius: 1,
  },
  drawerContent: {
    flex: 1,
    paddingTop: 50,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  menuContainer: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  iconContainer: {
    marginRight: 15,
    width: 24,
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  footerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
});
