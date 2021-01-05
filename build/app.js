"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = __importDefault(require("./middleware"));
const routes_1 = __importDefault(require("./routes"));
const app = express_1.default();
// User Middleware
middleware_1.default(app);
// Use routes
routes_1.default(app);
/**
 * Health Check
 * @route GET /health
 * @group Base - API of base routes
 * @returns {string} 200 - healthy
 */
app.get('/health', (req, res) => {
    return res.status(200).send('healthy');
});
// Invalid Route
app.all('/*', (req, res) => {
    return res.status(400).json({ status: 400, message: 'Bad Request' });
});
exports.default = app;
//# sourceMappingURL=app.js.map