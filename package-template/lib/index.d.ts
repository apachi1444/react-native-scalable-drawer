/**
 * React Native Scaling Drawer
 *
 * A beautiful, performant drawer navigation with scaling animations and shadow effects.
 * Supports both React Navigation and Expo Router.
 *
 * @author 89viral1
 * @version 1.0.0
 */
export { ScalingDrawer } from './components/ScalingDrawer';
export { DrawerProvider, useDrawerContext } from './context/DrawerContext';
export { useScalingDrawer } from './hooks/useScalingDrawer';
export { ReactNavigationDrawer, DrawerMenuButton } from './adapters/ReactNavigationAdapter';
export type { ReactNavigationDrawerProps, DrawerMenuItem } from './adapters/ReactNavigationAdapter';
export { ExpoRouterDrawer, ExpoDrawerMenuButton } from './adapters/ExpoRouterAdapter';
export type { ExpoRouterDrawerProps, ExpoDrawerMenuItem } from './adapters/ExpoRouterAdapter';
export type { ScalingDrawerConfig, ScalingDrawerState, ScalingDrawerProps, DrawerMenuItemProps, DrawerHeaderProps, EasingType, DrawerPosition, ShadowConfig, AdvancedDrawerConfig, } from './types';
export { ScalingDrawer as default } from './components/ScalingDrawer';
//# sourceMappingURL=index.d.ts.map