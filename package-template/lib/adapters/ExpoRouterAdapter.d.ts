import React, { ReactNode } from 'react';
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
export declare const DrawerMenuButton: React.FC<{
    style?: any;
    iconColor?: string;
}>;
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
export declare const ExpoRouterDrawer: React.FC<ExpoRouterDrawerProps>;
//# sourceMappingURL=ExpoRouterAdapter.d.ts.map