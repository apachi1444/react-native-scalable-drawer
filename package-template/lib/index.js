"use strict";
/**
 * React Native Scaling Drawer
 *
 * A beautiful, performant drawer navigation with scaling animations and shadow effects.
 * Built for modern Expo Router applications with TypeScript support.
 *
 * @author 89viral1
 * @version 1.0.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.ExpoRouterDrawer = exports.DrawerMenuButton = exports.useScalingDrawer = exports.useDrawerContext = exports.DrawerProvider = exports.ScalingDrawer = void 0;
// Core components
var ScalingDrawer_1 = require("./components/ScalingDrawer");
Object.defineProperty(exports, "ScalingDrawer", { enumerable: true, get: function () { return ScalingDrawer_1.ScalingDrawer; } });
// Context and hooks
var DrawerContext_1 = require("./context/DrawerContext");
Object.defineProperty(exports, "DrawerProvider", { enumerable: true, get: function () { return DrawerContext_1.DrawerProvider; } });
Object.defineProperty(exports, "useDrawerContext", { enumerable: true, get: function () { return DrawerContext_1.useDrawerContext; } });
var useScalingDrawer_1 = require("./hooks/useScalingDrawer");
Object.defineProperty(exports, "useScalingDrawer", { enumerable: true, get: function () { return useScalingDrawer_1.useScalingDrawer; } });
// Expo Router integration (modern navigation)
var ExpoRouterAdapter_1 = require("./adapters/ExpoRouterAdapter");
Object.defineProperty(exports, "DrawerMenuButton", { enumerable: true, get: function () { return ExpoRouterAdapter_1.DrawerMenuButton; } });
Object.defineProperty(exports, "ExpoRouterDrawer", { enumerable: true, get: function () { return ExpoRouterAdapter_1.ExpoRouterDrawer; } });
// Default export for convenience
var ScalingDrawer_2 = require("./components/ScalingDrawer");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return ScalingDrawer_2.ScalingDrawer; } });
//# sourceMappingURL=index.js.map