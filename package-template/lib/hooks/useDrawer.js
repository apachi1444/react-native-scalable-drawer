"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDrawer = void 0;
const DrawerContext_1 = require("../context/DrawerContext");
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
const useDrawer = () => {
    const context = (0, DrawerContext_1.useDrawerContext)();
    return {
        /** Whether the drawer is currently open */
        isOpen: context.isOpen,
        /** Open the drawer */
        open: context.openDrawer,
        /** Close the drawer */
        close: context.closeDrawer,
        /** Toggle drawer state */
        toggle: context.toggleDrawer,
        /** All animated values (for advanced usage) */
        animations: {
            slideAnim: context.slideAnim,
            scaleAnim: context.scaleAnim,
            shadowOpacityAnim: context.shadowOpacityAnim,
        }
    };
};
exports.useDrawer = useDrawer;
//# sourceMappingURL=useDrawer.js.map