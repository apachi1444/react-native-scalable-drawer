/**
 * Simple hook to control the drawer from anywhere in your app
 *
 * @example
 * ```tsx
 * import { useDrawer } from 'react-native-scaling-drawer';
 *
 * function MyCustomHeader() {
 *   const { open, close, toggle, isOpen } = useDrawer();
 *
 *   return (
 *     <TouchableOpacity onPress={toggle}>
 *       <Text>{isOpen ? 'Close' : 'Open'} Menu</Text>
 *     </TouchableOpacity>
 *   );
 * }
 * ```
 */
export declare const useDrawer: () => {
    /** Whether the drawer is currently open */
    isOpen: boolean;
    /** Open the drawer */
    open: () => void;
    /** Close the drawer */
    close: () => void;
    /** Toggle drawer state */
    toggle: () => void;
    /** All animated values (for advanced usage) */
    animations: {
        slideAnim: import("react-native").Animated.Value;
        scaleAnim: import("react-native").Animated.Value;
        shadowOpacityAnim: import("react-native").Animated.Value;
    };
};
//# sourceMappingURL=useDrawer.d.ts.map