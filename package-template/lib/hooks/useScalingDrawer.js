"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useScalingDrawer = void 0;
const react_1 = require("react");
const react_native_1 = require("react-native");
const { width: screenWidth } = react_native_1.Dimensions.get('window');
/**
 * Hook for managing scaling drawer animations and state
 *
 * @param config Configuration options for the drawer
 * @returns Drawer state and control functions
 *
 * @example
 * ```tsx
 * const drawer = useScalingDrawer({
 *   slideDistance: 280,
 *   scaleFactor: 0.85,
 *   animationDuration: 300
 * });
 *
 * // Use drawer.openDrawer(), drawer.closeDrawer(), etc.
 * ```
 */
const useScalingDrawer = (config = {}) => {
    const { slideDistance = screenWidth * 0.7, scaleFactor = 0.8, animationDuration = 250, shadowOpacity = 1, } = config;
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const slideAnim = (0, react_1.useRef)(new react_native_1.Animated.Value(0)).current;
    const scaleAnim = (0, react_1.useRef)(new react_native_1.Animated.Value(1)).current;
    const shadowOpacityAnim = (0, react_1.useRef)(new react_native_1.Animated.Value(0)).current;
    const openDrawer = (0, react_1.useCallback)(() => {
        setIsOpen(true);
        react_native_1.Animated.parallel([
            react_native_1.Animated.timing(slideAnim, {
                toValue: slideDistance,
                duration: animationDuration,
                useNativeDriver: true,
            }),
            react_native_1.Animated.timing(scaleAnim, {
                toValue: scaleFactor,
                duration: animationDuration,
                useNativeDriver: true,
            }),
            react_native_1.Animated.timing(shadowOpacityAnim, {
                toValue: shadowOpacity,
                duration: animationDuration,
                useNativeDriver: true,
            }),
        ]).start();
    }, [slideDistance, scaleFactor, animationDuration, shadowOpacity, slideAnim, scaleAnim, shadowOpacityAnim]);
    const closeDrawer = (0, react_1.useCallback)(() => {
        react_native_1.Animated.parallel([
            react_native_1.Animated.timing(slideAnim, {
                toValue: 0,
                duration: animationDuration,
                useNativeDriver: true,
            }),
            react_native_1.Animated.timing(scaleAnim, {
                toValue: 1,
                duration: animationDuration,
                useNativeDriver: true,
            }),
            react_native_1.Animated.timing(shadowOpacityAnim, {
                toValue: 0,
                duration: animationDuration,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setIsOpen(false);
        });
    }, [animationDuration, slideAnim, scaleAnim, shadowOpacityAnim]);
    const toggleDrawer = (0, react_1.useCallback)(() => {
        if (isOpen) {
            closeDrawer();
        }
        else {
            openDrawer();
        }
    }, [isOpen, openDrawer, closeDrawer]);
    return {
        isOpen,
        slideAnim,
        scaleAnim,
        shadowOpacityAnim,
        openDrawer,
        closeDrawer,
        toggleDrawer,
    };
};
exports.useScalingDrawer = useScalingDrawer;
//# sourceMappingURL=useScalingDrawer.js.map