"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDrawerContext = exports.DrawerProvider = void 0;
const react_1 = __importStar(require("react"));
const useScalingDrawer_1 = require("../hooks/useScalingDrawer");
/**
 * Context for sharing drawer state across the app
 */
const DrawerContext = (0, react_1.createContext)(undefined);
/**
 * Provider component that makes drawer state available to all children
 * This allows any component in the app to control the drawer
 */
const DrawerProvider = ({ children, ...config }) => {
    const drawerState = (0, useScalingDrawer_1.useScalingDrawer)(config);
    return (<DrawerContext.Provider value={drawerState}>
      {children}
    </DrawerContext.Provider>);
};
exports.DrawerProvider = DrawerProvider;
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
const useDrawerContext = () => {
    const context = (0, react_1.useContext)(DrawerContext);
    if (context === undefined) {
        throw new Error('useDrawerContext must be used within a DrawerProvider');
    }
    return context;
};
exports.useDrawerContext = useDrawerContext;
//# sourceMappingURL=DrawerContext.js.map