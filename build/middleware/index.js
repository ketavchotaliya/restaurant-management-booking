"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const i18n_1 = require("./i18n");
const uuid_1 = __importDefault(require("./uuid"));
exports.default = (app) => {
    app.use(compression_1.default());
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(i18n_1.i18n.init);
    app.use(uuid_1.default);
};
//# sourceMappingURL=index.js.map