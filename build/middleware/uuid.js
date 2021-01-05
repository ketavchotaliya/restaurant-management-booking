"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = __importDefault(require("uuid"));
const uuidFunction = (req, res, next) => {
    req.custom;
    if (!req.custom) {
        req.custom = {};
    }
    if (req.custom.uuid) {
        next();
    }
    else {
        req.custom.uuid = uuid_1.default();
        next();
    }
};
exports.default = uuidFunction;
//# sourceMappingURL=uuid.js.map