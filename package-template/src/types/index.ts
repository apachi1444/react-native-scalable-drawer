import { ReactNode } from 'react';
import { Animated, ViewStyle } from 'react-native';

/**
 * Configuration options for the scaling drawer
 */
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

/**
 * State and control functions returned by useScalingDrawer hook
 */
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
 * Props for the ScalingDrawer component
 */
export interface ScalingDrawerProps extends ScalingDrawerConfig {
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
  /** Whether to enable swipe gesture to open drawer (default: true) */
  enableSwipeGesture?: boolean;
  /** Minimum swipe distance to trigger drawer opening (default: 50) */
  swipeThreshold?: number;
}

/**
 * Props for drawer menu items
 */
export interface DrawerMenuItemProps {
  /** Text to display */
  title: string;
  /** Function called when item is pressed */
  onPress: () => void;
  /** Optional icon component */
  icon?: ReactNode;
  /** Whether the item is currently active */
  active?: boolean;
  /** Custom styles for the item */
  style?: ViewStyle;
}

/**
 * Props for drawer header component
 */
export interface DrawerHeaderProps {
  /** User name or title */
  title?: string;
  /** Subtitle or description */
  subtitle?: string;
  /** Avatar or profile image component */
  avatar?: ReactNode;
  /** Custom styles for the header */
  style?: ViewStyle;
}

/**
 * Animation easing types
 */
export type EasingType = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';

/**
 * Drawer position options
 */
export type DrawerPosition = 'left' | 'right';

/**
 * Shadow configuration
 */
export interface ShadowConfig {
  /** Whether to show shadows */
  enabled: boolean;
  /** Number of shadow layers (1-5) */
  layers: number;
  /** Shadow color */
  color: string;
  /** Shadow opacity */
  opacity: number;
}

/**
 * Advanced configuration options
 */
export interface AdvancedDrawerConfig extends ScalingDrawerConfig {
  /** Drawer position (default: 'left') */
  position?: DrawerPosition;
  /** Animation easing type */
  easing?: EasingType;
  /** Shadow configuration */
  shadow?: ShadowConfig;
  /** Whether to enable gestures */
  gestureEnabled?: boolean;
  /** Minimum swipe distance to trigger drawer */
  swipeThreshold?: number;
}
