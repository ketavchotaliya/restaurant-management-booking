"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const restaurant_route_1 = __importDefault(require("./restaurant.route"));
/**
 * Init All routes here
 */
exports.default = (app) => {
    // Provider Routes
    app.use('/restaurant', restaurant_route_1.default);
};
//# sourceMappingURL=index.js.map