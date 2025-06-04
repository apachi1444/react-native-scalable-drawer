"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpoRouterDrawer = exports.ExpoDrawerMenuButton = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const ScalingDrawer_1 = require("../components/ScalingDrawer");
const DrawerContext_1 = require("../context/DrawerContext");
const DrawerContext_2 = require("../context/DrawerContext");
/**
 * Header component that can be used with Expo Router
 * Provides a burger menu button that opens the drawer
 */
const ExpoDrawerMenuButton = ({ style, iconColor = '#000' }) => {
    const { openDrawer } = (0, DrawerContext_2.useDrawerContext)();
    return (<react_native_1.TouchableOpacity style={[styles.menuButton, style]} onPress={openDrawer}>
      <react_native_1.View style={styles.burgerIcon}>
        <react_native_1.View style={[styles.burgerLine, { backgroundColor: iconColor }]}/>
        <react_native_1.View style={[styles.burgerLine, { backgroundColor: iconColor }]}/>
        <react_native_1.View style={[styles.burgerLine, { backgroundColor: iconColor }]}/>
      </react_native_1.View>
    </react_native_1.TouchableOpacity>);
};
exports.ExpoDrawerMenuButton = ExpoDrawerMenuButton;
/**
 * Default drawer content component for Expo Router
 */
const DefaultExpoDrawerContent = ({ menuItems, onNavigate, header, footer, menuItemStyle, menuItemTextStyle }) => {
    const { closeDrawer } = (0, DrawerContext_2.useDrawerContext)();
    const handleNavigation = (href) => {
        onNavigate(href);
        closeDrawer();
    };
    return (<react_native_1.View style={styles.drawerContent}>
      {header && <react_native_1.View style={styles.headerContainer}>{header}</react_native_1.View>}
      
      <react_native_1.View style={styles.menuContainer}>
        {menuItems.map((item, index) => (<react_native_1.TouchableOpacity key={index} style={[styles.menuItem, menuItemStyle]} onPress={() => handleNavigation(item.href)}>
            {item.icon && <react_native_1.View style={styles.iconContainer}>{item.icon}</react_native_1.View>}
            <react_native_1.Text style={[styles.menuItemText, menuItemTextStyle]}>
              {item.label}
            </react_native_1.Text>
          </react_native_1.TouchableOpacity>))}
      </react_native_1.View>

      {footer && <react_native_1.View style={styles.footerContainer}>{footer}</react_native_1.View>}
    </react_native_1.View>);
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
const ExpoRouterDrawer = ({ menuItems, onNavigate, children, drawerBackgroundColor = '#FF0000', drawerHeader, drawerFooter, menuItemStyle, menuItemTextStyle, ...drawerConfig }) => {
    const drawerContent = (<DefaultExpoDrawerContent menuItems={menuItems} onNavigate={onNavigate} header={drawerHeader} footer={drawerFooter} menuItemStyle={menuItemStyle} menuItemTextStyle={menuItemTextStyle}/>);
    return (<DrawerContext_1.DrawerProvider {...drawerConfig}>
      <ScalingDrawer_1.ScalingDrawer drawerContent={drawerContent} drawerBackgroundColor={drawerBackgroundColor}>
        {children}
      </ScalingDrawer_1.ScalingDrawer>
    </DrawerContext_1.DrawerProvider>);
};
exports.ExpoRouterDrawer = ExpoRouterDrawer;
const styles = react_native_1.StyleSheet.create({
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
//# sourceMappingURL=ExpoRouterAdapter.js.map