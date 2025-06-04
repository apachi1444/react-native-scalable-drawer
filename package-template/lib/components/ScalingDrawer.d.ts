import React, { ReactNode } from 'react';
import { ViewStyle } from 'react-native';
export interface ScalingDrawerProps {
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
    /** Border radius for scaled content (default: 20) */
    borderRadius?: number;
}
/**
 * ScalingDrawer Component
 *
 * A beautiful drawer component with scaling animations and shadow effects.
 * The main content scales down and slides to reveal the drawer underneath.
 *
 * @example
 * ```tsx
 * <ScalingDrawer
 *   drawerContent={<MyDrawerContent />}
 *   slideDistance={280}
 *   scaleFactor={0.85}
 *   drawerBackgroundColor="#2196F3"
 * >
 *   <MyMainContent />
 * </ScalingDrawer>
 * ```
 */
export declare const ScalingDrawer: React.FC<ScalingDrawerProps>;
export { useScalingDrawer } from '../hooks/useScalingDrawer';
export type { ScalingDrawerConfig, ScalingDrawerState } from '../hooks/useScalingDrawer';
//# sourceMappingURL=ScalingDrawer.d.ts.map