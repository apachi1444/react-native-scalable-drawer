import React, { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScalingDrawer } from '../components/ScalingDrawer';
import { DrawerProvider, useDrawerContext } from '../context/DrawerContext';
import { ScalingDrawerConfig } from '../hooks/useScalingDrawer';

export interface DrawerMenuItem {
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
  /** Array of menu items with Expo Router hrefs (optional - for quick setup) */
  menuItems?: DrawerMenuItem[];
  /** Function to handle navigation (usually router.push) */
  onNavigate?: (href: string) => void;
  /** Main content (usually your Slot or Stack) */
  children: ReactNode;
  /** Custom drawer content - if provided, menuItems will be ignored */
  drawerContent?: ReactNode;
  /** Background color of the drawer */
  drawerBackgroundColor?: string;
  /** Custom header component for the drawer (only used with menuItems) */
  drawerHeader?: ReactNode;
  /** Custom footer component for the drawer (only used with menuItems) */
  drawerFooter?: ReactNode;
  /** Custom styles for menu items (only used with menuItems) */
  menuItemStyle?: any;
  /** Custom styles for menu item text (only used with menuItems) */
  menuItemTextStyle?: any;
}

/**
 * Menu button component for Expo Router headers
 * Provides a burger menu button that opens the drawer
 */
export const DrawerMenuButton: React.FC<{
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
const DefaultDrawerContent: React.FC<{
  menuItems: DrawerMenuItem[];
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
 * Modern Expo Router Drawer Component
 *
 * Provides seamless integration with Expo Router for modern React Native apps
 *
 * @example
 * ```tsx
 * // app/_layout.tsx
 * import { Stack } from 'expo-router';
 * import { ExpoRouterDrawer, DrawerMenuButton } from 'react-native-scaling-drawer';
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
 *         { label: 'Settings', href: '/settings' },
 *       ]}
 *       onNavigate={(href) => router.push(href)}
 *       drawerBackgroundColor="#673AB7"
 *       slideDistance={280}
 *       scaleFactor={0.85}
 *     >
 *       <Stack>
 *         <Stack.Screen name="index" options={{ title: 'Home' }} />
 *         <Stack.Screen name="profile" options={{ title: 'Profile' }} />
 *         <Stack.Screen name="settings" options={{ title: 'Settings' }} />
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
  drawerContent: customDrawerContent,
  drawerBackgroundColor = '#FF0000',
  drawerHeader,
  drawerFooter,
  menuItemStyle,
  menuItemTextStyle,
  ...drawerConfig
}) => {
  // Use custom drawer content if provided, otherwise use default with menu items
  const finalDrawerContent = customDrawerContent || (
    menuItems && onNavigate ? (
      <DefaultDrawerContent
        menuItems={menuItems}
        onNavigate={onNavigate}
        header={drawerHeader}
        footer={drawerFooter}
        menuItemStyle={menuItemStyle}
        menuItemTextStyle={menuItemTextStyle}
      />
    ) : null
  );

  if (!finalDrawerContent) {
    throw new Error('ExpoRouterDrawer: Either provide drawerContent or both menuItems and onNavigate');
  }

  return (
    <DrawerProvider {...drawerConfig}>
      <ScalingDrawer
        drawerContent={finalDrawerContent}
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
