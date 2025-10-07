import React, { createContext, ReactNode, useContext } from 'react';
import { ScalingDrawerConfig, ScalingDrawerState, useScalingDrawer } from '../hooks/useScalingDrawer';

/**
 * Context for sharing drawer state across the app
 */
const DrawerContext = createContext<ScalingDrawerState | undefined>(undefined);

export interface DrawerProviderProps extends ScalingDrawerConfig {
  children: ReactNode;
  /** Whether to enable swipe gestures for opening/closing drawer (default: true) */
  enableGestures?: boolean;
}

/**
 * Provider component that makes drawer state available to all children
 * This allows any component in the app to control the drawer
 */
export const DrawerProvider: React.FC<DrawerProviderProps> = ({
  children,
  enableGestures = true,
  ...config
}) => {
  const drawerState = useScalingDrawer(config);

  // Add gesture control to the context
  const contextValue = {
    ...drawerState,
    enableGestures,
  };

  return (
    <DrawerContext.Provider value={contextValue}>
      {children}
    </DrawerContext.Provider>
  );
};

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
export const useDrawerContext = (): ScalingDrawerState => {
  const context = useContext(DrawerContext);
  if (context === undefined) {
    throw new Error('useDrawerContext must be used within a DrawerProvider');
  }
  return context;
};
