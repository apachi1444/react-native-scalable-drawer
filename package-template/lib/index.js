"use strict";
/**
 * React Native Scaling Drawer
 *
 * A beautiful, performant drawer navigation with scaling animations and shadow effects.
 * Supports both React Navigation and Expo Router.
 *
 * @author 89viral1
 * @version 1.0.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.ExpoDrawerMenuButton = exports.ExpoRouterDrawer = exports.DrawerMenuButton = exports.ReactNavigationDrawer = exports.useScalingDrawer = exports.useDrawerContext = exports.DrawerProvider = exports.ScalingDrawer = void 0;
// Core components
let ScalingDrawer_1 = require("./components/ScalingDrawer");
Object.defineProperty(exports, "ScalingDrawer", { enumerable: true, get: function () { return ScalingDrawer_1.ScalingDrawer; } });
// Context and hooks
let DrawerContext_1 = require("./context/DrawerContext");
Object.defineProperty(exports, "DrawerProvider", { enumerable: true, get: function () { return DrawerContext_1.DrawerProvider; } });
Object.defineProperty(exports, "useDrawerContext", { enumerable: true, get: function () { return DrawerContext_1.useDrawerContext; } });
let useScalingDrawer_1 = require("./hooks/useScalingDrawer");
Object.defineProperty(exports, "useScalingDrawer", { enumerable: true, get: function () { return useScalingDrawer_1.useScalingDrawer; } });
// React Navigation adapter
let ReactNavigationAdapter_1 = require("./adapters/ReactNavigationAdapter");
Object.defineProperty(exports, "ReactNavigationDrawer", { enumerable: true, get: function () { return ReactNavigationAdapter_1.ReactNavigationDrawer; } });
Object.defineProperty(exports, "DrawerMenuButton", { enumerable: true, get: function () { return ReactNavigationAdapter_1.DrawerMenuButton; } });
// Expo Router adapter
let ExpoRouterAdapter_1 = require("./adapters/ExpoRouterAdapter");
Object.defineProperty(exports, "ExpoRouterDrawer", { enumerable: true, get: function () { return ExpoRouterAdapter_1.ExpoRouterDrawer; } });
Object.defineProperty(exports, "ExpoDrawerMenuButton", { enumerable: true, get: function () { return ExpoRouterAdapter_1.ExpoDrawerMenuButton; } });
// Default export for convenience
let ScalingDrawer_2 = require("./components/ScalingDrawer");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return ScalingDrawer_2.ScalingDrawer; } });
//# sourceMappingURL=index.js.map