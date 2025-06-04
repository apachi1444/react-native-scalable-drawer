import React, { ReactNode } from 'react';
import { ScalingDrawerConfig } from '../hooks/useScalingDrawer';
export interface DrawerMenuItem {
    /** Display name for the menu item */
    label: string;
    /** Screen name to navigate to */
    screenName: string;
    /** Optional icon component */
    icon?: ReactNode;
    /** Whether this item is currently active */
    active?: boolean;
}
export interface ReactNavigationDrawerProps extends ScalingDrawerConfig {
    /** Array of menu items */
    menuItems: DrawerMenuItem[];
    /** Function to handle navigation */
    onNavigate: (screenName: string) => void;
    /** Main content (usually your Stack.Navigator) */
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
 * Header component that can be used with React Navigation
 * Provides a burger menu button that opens the drawer
 */
export declare const DrawerMenuButton: React.FC<{
    style?: any;
    iconColor?: string;
}>;
/**
 * React Navigation Drawer Adapter
 *
 * Provides seamless integration with React Navigation Stack Navigator
 *
 * @example
 * ```tsx
 * import { NavigationContainer } from '@react-navigation/native';
 * import { createStackNavigator } from '@react-navigation/stack';
 * import { ReactNavigationDrawer, DrawerMenuButton } from 'react-native-scaling-drawer';
 *
 * const Stack = createStackNavigator();
 *
 * const App = () => (
 *   <NavigationContainer>
 *     <ReactNavigationDrawer
 *       menuItems={[
 *         { label: 'Home', screenName: 'Home' },
 *         { label: 'Profile', screenName: 'Profile' },
 *       ]}
 *       onNavigate={(screenName) => navigation.navigate(screenName)}
 *     >
 *       <Stack.Navigator
 *         screenOptions={{
 *           headerLeft: () => <DrawerMenuButton />,
 *         }}
 *       >
 *         <Stack.Screen name="Home" component={HomeScreen} />
 *         <Stack.Screen name="Profile" component={ProfileScreen} />
 *       </Stack.Navigator>
 *     </ReactNavigationDrawer>
 *   </NavigationContainer>
 * );
 * ```
 */
export declare const ReactNavigationDrawer: React.FC<ReactNavigationDrawerProps>;
//# sourceMappingURL=ReactNavigationAdapter.d.ts.map