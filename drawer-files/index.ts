/**
 * Scaling Drawer Package
 * 
 * A beautiful, performant drawer navigation with scaling animations and shadow effects.
 * Built for modern React Native applications with TypeScript support.
 */

// Core components
export { ScalingDrawer } from './components/ScalingDrawer';

// Context and hooks
export { DrawerProvider, useDrawerContext } from './components/DrawerContext';
export { useDrawer } from './hooks/useDrawer';
export { useScalingDrawer } from './hooks/useScalingDrawer';

// Types
export type { 
  ScalingDrawerConfig, 
  ScalingDrawerState 
} from './hooks/useScalingDrawer';

export type { 
  ScalingDrawerProps 
} from './components/ScalingDrawer';

export type { 
  DrawerProviderProps 
} from './components/DrawerContext';
