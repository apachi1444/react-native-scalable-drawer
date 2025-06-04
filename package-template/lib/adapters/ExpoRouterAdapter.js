"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpoRouterDrawer = exports.DrawerMenuButton = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const ScalingDrawer_1 = require("../components/ScalingDrawer");
const DrawerContext_1 = require("../context/DrawerContext");
/**
 * Menu button component for Expo Router headers
 * Provides a burger menu button that opens the drawer
 */
const DrawerMenuButton = ({ style, iconColor = '#000' }) => {
    const { openDrawer } = (0, DrawerContext_1.useDrawerContext)();
    return (<react_native_1.TouchableOpacity style={[styles.menuButton, style]} onPress={openDrawer}>
      <react_native_1.View style={styles.burgerIcon}>
        <react_native_1.View style={[styles.burgerLine, { backgroundColor: iconColor }]}/>
        <react_native_1.View style={[styles.burgerLine, { backgroundColor: iconColor }]}/>
        <react_native_1.View style={[styles.burgerLine, { backgroundColor: iconColor }]}/>
      </react_native_1.View>
    </react_native_1.TouchableOpacity>);
};
exports.DrawerMenuButton = DrawerMenuButton;
/**
 * Default drawer content component for Expo Router
 */
const DefaultDrawerContent = ({ menuItems, onNavigate, header, footer, menuItemStyle, menuItemTextStyle }) => {
    const { closeDrawer } = (0, DrawerContext_1.useDrawerContext)();
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
const ExpoRouterDrawer = ({ menuItems, onNavigate, children, drawerContent: customDrawerContent, drawerBackgroundColor = '#FF0000', drawerHeader, drawerFooter, menuItemStyle, menuItemTextStyle, ...drawerConfig }) => {
    // Use custom drawer content if provided, otherwise use default with menu items
    const finalDrawerContent = customDrawerContent || (menuItems && onNavigate ? (<DefaultDrawerContent menuItems={menuItems} onNavigate={onNavigate} header={drawerHeader} footer={drawerFooter} menuItemStyle={menuItemStyle} menuItemTextStyle={menuItemTextStyle}/>) : null);
    if (!finalDrawerContent) {
        throw new Error('ExpoRouterDrawer: Either provide drawerContent or both menuItems and onNavigate');
    }
    return (<DrawerContext_1.DrawerProvider {...drawerConfig}>
      <ScalingDrawer_1.ScalingDrawer drawerContent={finalDrawerContent} drawerBackgroundColor={drawerBackgroundColor}>
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