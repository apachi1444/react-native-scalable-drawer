import React, { ReactNode } from 'react';
import { ScalingDrawerConfig, ScalingDrawerState } from '../hooks/useScalingDrawer';
export interface DrawerProviderProps extends ScalingDrawerConfig {
    children: ReactNode;
}
/**
 * Provider component that makes drawer state available to all children
 * This allows any component in the app to control the drawer
 */
export declare const DrawerProvider: React.FC<DrawerProviderProps>;
/**
 * Hook to access drawer state from any component
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const { openDrawer, closeDrawer, isOpen } = useDrawerContext();
 *
 *   return (
 *     <TouchableOpacity onPress={openDrawer}>
 *       <Text>Open Drawer</Text>
 *     </TouchableOpacity>
 *   );
 * };
 * ```
 */
export declare const useDrawerContext: () => ScalingDrawerState;
//# sourceMappingURL=DrawerContext.d.ts.map