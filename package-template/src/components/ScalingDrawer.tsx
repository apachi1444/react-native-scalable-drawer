import React, { ReactNode, useRef } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  View,
  ViewStyle
} from 'react-native';
import { useDrawerContext } from '../context/DrawerContext';

// Additional imports for back handler and touch feedback
const { BackHandler, TouchableWithoutFeedback } = require('react-native');

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
  /** Whether to enable swipe gesture to open drawer (default: true) */
  enableSwipeGesture?: boolean;
  /** Minimum swipe distance to trigger drawer opening (default: 50) */
  swipeThreshold?: number;
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
  enableSwipeGesture,
  swipeThreshold = 50,
}) => {
  const {
    isOpen,
    slideAnim,
    scaleAnim,
    shadowOpacityAnim,
    closeDrawer,
    openDrawer,
    enableGestures
  } = useDrawerContext();

  // Final gesture control: both provider and component must allow gestures
  const gesturesEnabled = enableGestures && enableSwipeGesture;

  // Get screen width for swipe calculations
  const screenWidth = Dimensions.get('window').width;

  // Handle hardware back button
  React.useEffect(() => {
    const backAction = () => {
      if (isOpen) {
        closeDrawer();
        onDrawerClose?.();
        return true; // Prevent default back action
      }
      return false; // Allow default back action
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [isOpen, closeDrawer, onDrawerClose]);





  // Track gesture state for real-time animation
  const gestureProgress = useRef(new Animated.Value(0)).current;
  const isGesturing = useRef(false);
  const currentProgress = useRef(0);
  const gestureStartTime = useRef(0);

  // Create PanResponder for smooth real-time swipe gesture (both opening and closing)
  const panResponder = useRef(
    PanResponder.create({
      // Don't capture on start - let scroll views have first chance
      onStartShouldSetPanResponder: () => false,

      // Only capture after movement, and be very conservative
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if (!gesturesEnabled) return false;

        const { dx, dy } = gestureState;

        // SCROLL-FIRST PRIORITY: Be much more strict about when to capture gestures
        const isStronglyHorizontal = Math.abs(dx) > Math.abs(dy) * 4; // Require 4:1 ratio for horizontal
        const hasSignificantMovement = Math.abs(dx) > 25; // Require even more movement

        // Absolutely don't interfere with any vertical movement
        if (Math.abs(dy) > 5) return false;

        if (isOpen) {
          // When drawer is open: only capture very strong leftward swipes
          const isStrongLeftSwipe = dx < -30 && isStronglyHorizontal;
          return isStrongLeftSwipe && hasSignificantMovement;
        } else {
          // When drawer is closed: only capture from tiny edge with very strong rightward movement
          const isFromTinyEdge = evt.nativeEvent.pageX < 15; // Reduced to 15px
          const isVeryStrongRightSwipe = dx > 30 && isStronglyHorizontal;
          return isFromTinyEdge && isVeryStrongRightSwipe && hasSignificantMovement;
        }
      },

      onPanResponderGrant: () => {
        // Gesture started - prepare for real-time animation
        isGesturing.current = true;
        gestureProgress.stopAnimation();
        gestureStartTime.current = Date.now();
      },
      
      onPanResponderMove: (_, gestureState) => {
        // Real-time finger following animation for both opening and closing
        const { dx, dy } = gestureState;

        // If vertical movement becomes significant, release the gesture to scroll views
        if (Math.abs(dy) > Math.abs(dx) * 0.5) {
          // This is becoming more vertical than horizontal - let scroll views handle it
          return;
        }

        if (!isOpen && dx > 0) {
          // OPENING: Calculate progress (0 to 1) based on rightward swipe distance
          const maxSwipeDistance = screenWidth * 0.7; // 70% of screen width
          const progress = Math.min(dx / maxSwipeDistance, 1);

          // Store current progress for release calculation
          currentProgress.current = progress;

          // Apply real-time transformations for opening
          const slideValue = progress * (screenWidth * 0.7); // 0 to slideDistance
          const scaleValue = 1 - (progress * 0.2); // 1.0 to 0.8

          // Update animations in real-time
          slideAnim.setValue(slideValue);
          scaleAnim.setValue(scaleValue);
          shadowOpacityAnim.setValue(progress);
        } else if (isOpen && dx < 0) {
          // CLOSING: Calculate progress (1 to 0) based on leftward swipe distance
          const maxSwipeDistance = screenWidth * 0.7; // 70% of screen width
          const swipeDistance = Math.abs(dx); // Make positive for calculation
          const progress = Math.min(swipeDistance / maxSwipeDistance, 1);

          // Store current progress for release calculation (inverted for closing)
          currentProgress.current = progress;

          // Apply real-time transformations for closing
          const slideDistance = screenWidth * 0.7;
          const slideValue = slideDistance - (progress * slideDistance); // slideDistance to 0
          const scaleValue = 0.8 + (progress * 0.2); // 0.8 to 1.0
          const shadowValue = 1 - progress; // 1 to 0

          // Update animations in real-time
          slideAnim.setValue(slideValue);
          scaleAnim.setValue(scaleValue);
          shadowOpacityAnim.setValue(shadowValue);
        }
      },

      onPanResponderRelease: (_, gestureState) => {
        const { vx } = gestureState;
        isGesturing.current = false;

        const progress = currentProgress.current;
        const progressThreshold = swipeThreshold / (screenWidth * 0.7); // Convert pixels to progress



        if (!isOpen) {
          // OPENING LOGIC: Calculate if we should complete the opening
          const shouldOpen = progress > progressThreshold || vx > 0.5; // Threshold progress or fast rightward velocity

          if (shouldOpen) {
            // Complete the opening animation
            openDrawer();
            onDrawerOpen?.();
          } else {
            // Snap back to closed position
            Animated.parallel([
              Animated.timing(slideAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
              }),
              Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
              }),
              Animated.timing(shadowOpacityAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
              }),
            ]).start();
          }
        } else {
          // CLOSING LOGIC: Calculate if we should complete the closing
          const shouldClose = progress > progressThreshold || vx < -0.5; // Threshold progress or fast leftward velocity

          if (shouldClose) {
            // Complete the closing animation
            closeDrawer();
            onDrawerClose?.();
          } else {
            // Snap back to open position
            const slideDistance = screenWidth * 0.7;
            Animated.parallel([
              Animated.timing(slideAnim, {
                toValue: slideDistance,
                duration: 200,
                useNativeDriver: true,
              }),
              Animated.timing(scaleAnim, {
                toValue: 0.8,
                duration: 200,
                useNativeDriver: true,
              }),
              Animated.timing(shadowOpacityAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
              }),
            ]).start();
          }
        }

        // Reset gesture progress
        gestureProgress.setValue(0);
        currentProgress.current = 0;
      },

      onPanResponderTerminate: () => {
        // Gesture was interrupted - snap back to original state
        isGesturing.current = false;

        if (!isOpen) {
          // Snap back to closed position
          Animated.parallel([
            Animated.timing(slideAnim, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(shadowOpacityAnim, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }),
          ]).start();
        } else {
          // Snap back to open position
          const slideDistance = screenWidth * 0.7;
          Animated.parallel([
            Animated.timing(slideAnim, {
              toValue: slideDistance,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
              toValue: 0.8,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(shadowOpacityAnim, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
          ]).start();
        }

        gestureProgress.setValue(0);
        currentProgress.current = 0;
      },
    })
  ).current;

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
        {...(gesturesEnabled ? panResponder.panHandlers : {})}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            if (isOpen && closeOnContentPress) {
              closeDrawer();
              onDrawerClose?.();
            }
          }}
        >
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
});
