"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactNavigationDrawer = exports.DrawerMenuButton = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const ScalingDrawer_1 = require("../components/ScalingDrawer");
const DrawerContext_1 = require("../context/DrawerContext");
const DrawerContext_2 = require("../context/DrawerContext");
/**
 * Header component that can be used with React Navigation
 * Provides a burger menu button that opens the drawer
 */
const DrawerMenuButton = ({ style, iconColor = '#000' }) => {
    const { openDrawer } = (0, DrawerContext_2.useDrawerContext)();
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
 * Default drawer content component for React Navigation
 */
const DefaultDrawerContent = ({ menuItems, onNavigate, header, footer, menuItemStyle, menuItemTextStyle }) => {
    const { closeDrawer } = (0, DrawerContext_2.useDrawerContext)();
    const handleNavigation = (screenName) => {
        onNavigate(screenName);
        closeDrawer();
    };
    return (<react_native_1.View style={styles.drawerContent}>
      {header && <react_native_1.View style={styles.headerContainer}>{header}</react_native_1.View>}
      
      <react_native_1.View style={styles.menuContainer}>
        {menuItems.map((item, index) => (<react_native_1.TouchableOpacity key={index} style={[styles.menuItem, menuItemStyle]} onPress={() => handleNavigation(item.screenName)}>
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
const ReactNavigationDrawer = ({ menuItems, onNavigate, children, drawerBackgroundColor = '#FF0000', drawerHeader, drawerFooter, menuItemStyle, menuItemTextStyle, ...drawerConfig }) => {
    const drawerContent = (<DefaultDrawerContent menuItems={menuItems} onNavigate={onNavigate} header={drawerHeader} footer={drawerFooter} menuItemStyle={menuItemStyle} menuItemTextStyle={menuItemTextStyle}/>);
    return (<DrawerContext_1.DrawerProvider {...drawerConfig}>
      <ScalingDrawer_1.ScalingDrawer drawerContent={drawerContent} drawerBackgroundColor={drawerBackgroundColor}>
        {children}
      </ScalingDrawer_1.ScalingDrawer>
    </DrawerContext_1.DrawerProvider>);
};
exports.ReactNavigationDrawer = ReactNavigationDrawer;
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
//# sourceMappingURL=ReactNavigationAdapter.js.map