import { Animated } from 'react-native';
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
export declare const useScalingDrawer: (config?: ScalingDrawerConfig) => ScalingDrawerState;
//# sourceMappingURL=useScalingDrawer.d.ts.map