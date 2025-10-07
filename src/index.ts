/**
 * React Native Scaling Drawer
 *
 * A beautiful, performant drawer navigation with scaling animations and shadow effects.
 * Built for modern Expo Router applications with TypeScript support.
 *
 * @author 89viral1
 * @version 1.0.0
 */

// Core components
export { ScalingDrawer } from './components/ScalingDrawer';

// Context and hooks
export { DrawerProvider, useDrawerContext } from './context/DrawerContext';
export { useDrawer } from './hooks/useDrawer';
export { useScalingDrawer } from './hooks/useScalingDrawer';

// Expo Router integration (modern navigation)
export {
    DrawerMenuButton, ExpoRouterDrawer
} from './adapters/ExpoRouterAdapter';
export type {
    DrawerMenuItem, ExpoRouterDrawerProps
} from './adapters/ExpoRouterAdapter';

// Types
export type {
    AdvancedDrawerConfig, DrawerHeaderProps, DrawerMenuItemProps, DrawerPosition, EasingType, ScalingDrawerConfig, ScalingDrawerProps, ScalingDrawerState, ShadowConfig
} from './types';

// Default export for convenience
export { ScalingDrawer as default } from './components/ScalingDrawer';

