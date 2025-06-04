import React, { ReactNode } from 'react';
import {
    Animated,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    ViewStyle
} from 'react-native';
import { useDrawerContext } from '../context/DrawerContext';

export interface ScalingDrawerProps {
  /** Content to render inside the drawer */
  drawerContent: ReactNode;
  /** Main content that will be scaled when drawer opens */
  children: ReactNode;
  /** Background color of the drawer (default: '#FF0000') */
  drawerBackgroundColor?: string;
  /** Whether to show shadow layers (default: true) */
  showShadow?: boolean;
  /** Custom styles for the drawer container */
  drawerStyle?: ViewStyle;
  /** Custom styles for the main content container */
  contentStyle?: ViewStyle;
  /** Function called when drawer opens */
  onDrawerOpen?: () => void;
  /** Function called when drawer closes */
  onDrawerClose?: () => void;
  /** Whether to close drawer when main content is pressed (default: true) */
  closeOnContentPress?: boolean;
  /** Border radius for scaled content (default: 20) */
  borderRadius?: number;
}

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
export const ScalingDrawer: React.FC<ScalingDrawerProps> = ({
  drawerContent,
  children,
  drawerBackgroundColor = '#FF0000',
  showShadow = true,
  drawerStyle,
  contentStyle,
  onDrawerOpen,
  onDrawerClose,
  closeOnContentPress = true,
  borderRadius = 20,
}) => {
  const {
    isOpen,
    slideAnim,
    scaleAnim,
    shadowOpacityAnim,
    openDrawer,
    closeDrawer,
  } = useDrawerContext();

  const handleCloseDrawer = () => {
    closeDrawer();
    onDrawerClose?.();
  };

  const handleContentPress = () => {
    if (isOpen && closeOnContentPress) {
      handleCloseDrawer();
    }
  };

  return (
    <View style={styles.container}>
      {/* Drawer Background */}
      <View style={[styles.drawerBackground, { backgroundColor: drawerBackgroundColor }, drawerStyle]}>
        {drawerContent}
      </View>

      {/* Shadow Layers */}
      {showShadow && (
        <Animated.View
          style={[
            styles.shadowWrapper,
            {
              transform: [
                { translateX: slideAnim },
                { scale: scaleAnim },
              ],
              opacity: shadowOpacityAnim,
            },
          ]}
        >
          <View style={styles.shadowContainer}>
            <View style={styles.shadowLayer1} />
            <View style={styles.shadowLayer2} />
            <View style={styles.shadowLayer3} />
            <View style={styles.glowLayer} />
          </View>
        </Animated.View>
      )}

      {/* Main Content Container */}
      <Animated.View
        style={[
          styles.animatedWrapper,
          {
            transform: [
              { translateX: slideAnim },
              { scale: scaleAnim },
            ],
          },
        ]}
      >
        <TouchableWithoutFeedback onPress={handleContentPress}>
          <View
            style={[
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
            ]}
          >
            {children}

            {/* Invisible overlay when drawer is open */}
            {isOpen && (
              <TouchableOpacity
                style={styles.invisibleOverlay}
                onPress={handleCloseDrawer}
                activeOpacity={1}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </View>
  );
};

// Export the hook for advanced usage
export { useScalingDrawer } from '../hooks/useScalingDrawer';
export type { ScalingDrawerConfig, ScalingDrawerState } from '../hooks/useScalingDrawer';

const styles = StyleSheet.create({
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
