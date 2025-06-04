import { useRef, useState, useCallback } from 'react';
import { Animated, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export interface ScalingDrawerConfig {
  /** Distance the drawer slides (default: 70% of screen width) */
  slideDistance?: number;
  /** Scale factor for the main content (default: 0.8) */
  scaleFactor?: number;
  /** Animation duration in milliseconds (default: 250) */
  animationDuration?: number;
  /** Shadow opacity when drawer is open (default: 1) */
  shadowOpacity?: number;
  /** Border radius for scaled content (default: 20) */
  borderRadius?: number;
}

export interface ScalingDrawerState {
  /** Whether the drawer is currently open */
  isOpen: boolean;
  /** Animated value for slide animation */
  slideAnim: Animated.Value;
  /** Animated value for scale animation */
  scaleAnim: Animated.Value;
  /** Animated value for shadow opacity */
  shadowOpacityAnim: Animated.Value;
  /** Function to open the drawer */
  openDrawer: () => void;
  /** Function to close the drawer */
  closeDrawer: () => void;
  /** Function to toggle drawer state */
  toggleDrawer: () => void;
}

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
export const useScalingDrawer = (config: ScalingDrawerConfig = {}): ScalingDrawerState => {
  const {
    slideDistance = screenWidth * 0.7,
    scaleFactor = 0.8,
    animationDuration = 250,
    shadowOpacity = 1,
  } = config;

  const [isOpen, setIsOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const shadowOpacityAnim = useRef(new Animated.Value(0)).current;

  const openDrawer = useCallback(() => {
    setIsOpen(true);
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: slideDistance,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: scaleFactor,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(shadowOpacityAnim, {
        toValue: shadowOpacity,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start();
  }, [slideDistance, scaleFactor, animationDuration, shadowOpacity, slideAnim, scaleAnim, shadowOpacityAnim]);

  const closeDrawer = useCallback(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(shadowOpacityAnim, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsOpen(false);
    });
  }, [animationDuration, slideAnim, scaleAnim, shadowOpacityAnim]);

  const toggleDrawer = useCallback(() => {
    if (isOpen) {
      closeDrawer();
    } else {
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
