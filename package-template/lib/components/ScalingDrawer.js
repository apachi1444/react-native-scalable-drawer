"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useScalingDrawer = exports.ScalingDrawer = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const DrawerContext_1 = require("../context/DrawerContext");
/**
 * ScalingDrawer Component
 *
 * A beautiful drawer component with scaling animations and shadow effects.
 * The main content scales down and slides to reveal the drawer underneath.
 *
 * @example
 * ```tsx
 * <ScalingDrawer
 *   drawerContent={<MyDrawerContent />}
 *   slideDistance={280}
 *   scaleFactor={0.85}
 *   drawerBackgroundColor="#2196F3"
 * >
 *   <MyMainContent />
 * </ScalingDrawer>
 * ```
 */
const ScalingDrawer = ({ drawerContent, children, drawerBackgroundColor = '#FF0000', showShadow = true, drawerStyle, contentStyle, onDrawerOpen, onDrawerClose, closeOnContentPress = true, borderRadius = 20, }) => {
    const { isOpen, slideAnim, scaleAnim, shadowOpacityAnim, openDrawer, closeDrawer, } = (0, DrawerContext_1.useDrawerContext)();
    const handleCloseDrawer = () => {
        closeDrawer();
        onDrawerClose?.();
    };
    const handleContentPress = () => {
        if (isOpen && closeOnContentPress) {
            handleCloseDrawer();
        }
    };
    return (<react_native_1.View style={styles.container}>
      {/* Drawer Background */}
      <react_native_1.View style={[styles.drawerBackground, { backgroundColor: drawerBackgroundColor }, drawerStyle]}>
        {drawerContent}
      </react_native_1.View>

      {/* Shadow Layers */}
      {showShadow && (<react_native_1.Animated.View style={[
                styles.shadowWrapper,
                {
                    transform: [
                        { translateX: slideAnim },
                        { scale: scaleAnim },
                    ],
                    opacity: shadowOpacityAnim,
                },
            ]}>
          <react_native_1.View style={styles.shadowContainer}>
            <react_native_1.View style={styles.shadowLayer1}/>
            <react_native_1.View style={styles.shadowLayer2}/>
            <react_native_1.View style={styles.shadowLayer3}/>
            <react_native_1.View style={styles.glowLayer}/>
          </react_native_1.View>
        </react_native_1.Animated.View>)}

      {/* Main Content Container */}
      <react_native_1.Animated.View style={[
            styles.animatedWrapper,
            {
                transform: [
                    { translateX: slideAnim },
                    { scale: scaleAnim },
                ],
            },
        ]}>
        <react_native_1.TouchableWithoutFeedback onPress={handleContentPress}>
          <react_native_1.View style={[
            styles.mainContainer,
            {
                borderRadius: isOpen ? borderRadius : 0,
                shadowColor: '#000',
                shadowOffset: {
                    width: isOpen ? -8 : 0,
                    height: isOpen ? 8 : 0,
                },
                shadowOpacity: isOpen ? 0.3 : 0,
                shadowRadius: isOpen ? 15 : 0,
                elevation: isOpen ? 10 : 0,
            },
            contentStyle,
        ]}>
            {children}

            {/* Invisible overlay when drawer is open */}
            {isOpen && (<react_native_1.TouchableOpacity style={styles.invisibleOverlay} onPress={handleCloseDrawer} activeOpacity={1}/>)}
          </react_native_1.View>
        </react_native_1.TouchableWithoutFeedback>
      </react_native_1.Animated.View>
    </react_native_1.View>);
};
exports.ScalingDrawer = ScalingDrawer;
// Export the hook for advanced usage
var useScalingDrawer_1 = require("../hooks/useScalingDrawer");
Object.defineProperty(exports, "useScalingDrawer", { enumerable: true, get: function () { return useScalingDrawer_1.useScalingDrawer; } });
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
    },
    shadowWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
    },
    shadowContainer: {
        flex: 1,
        position: 'relative',
    },
    shadowLayer1: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 20,
        transform: [{ translateX: -5 }, { translateY: 5 }],
    },
    shadowLayer2: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.08)',
        borderRadius: 20,
        transform: [{ translateX: -10 }, { translateY: 10 }],
    },
    shadowLayer3: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.06)',
        borderRadius: 20,
        transform: [{ translateX: -15 }, { translateY: 15 }],
    },
    glowLayer: {
        position: 'absolute',
        top: -10,
        left: -10,
        right: -10,
        bottom: -10,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 30,
    },
    animatedWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 3,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
    },
    invisibleOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent',
        zIndex: 999,
    },
});
//# sourceMappingURL=ScalingDrawer.js.map