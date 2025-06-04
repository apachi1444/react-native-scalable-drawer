import React, { ReactNode } from 'react';
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
export declare const ExpoDrawerMenuButton: React.FC<{
    style?: any;
    iconColor?: string;
}>;
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
export declare const ExpoRouterDrawer: React.FC<ExpoRouterDrawerProps>;
//# sourceMappingURL=ExpoRouterAdapter.d.ts.map