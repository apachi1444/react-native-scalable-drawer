/**
 * React Native Scaling Drawer
 *
 * A beautiful, performant drawer navigation with scaling animations and shadow effects.
 * Supports both React Navigation and Expo Router.
 *
 * @author 89viral1
 * @version 1.0.0
 */

// Core components
export { ScalingDrawer } from './components/ScalingDrawer';

// Context and hooks
export { DrawerProvider, useDrawerContext } from './context/DrawerContext';
export { useScalingDrawer } from './hooks/useScalingDrawer';

// React Navigation adapter
export {
  ReactNavigationDrawer,
  DrawerMenuButton
} from './adapters/ReactNavigationAdapter';
export type {
  ReactNavigationDrawerProps,
  DrawerMenuItem
} from './adapters/ReactNavigationAdapter';

// Expo Router adapter
export {
  ExpoRouterDrawer,
  ExpoDrawerMenuButton
} from './adapters/ExpoRouterAdapter';
export type {
  ExpoRouterDrawerProps,
  ExpoDrawerMenuItem
} from './adapters/ExpoRouterAdapter';

// Types
export type {
  ScalingDrawerConfig,
  ScalingDrawerState,
  ScalingDrawerProps,
  DrawerMenuItemProps,
  DrawerHeaderProps,
  EasingType,
  DrawerPosition,
  ShadowConfig,
  AdvancedDrawerConfig,
} from './types';

// Default export for convenience
export { ScalingDrawer as default } from './components/ScalingDrawer';
