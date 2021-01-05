"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.i18n = void 0;
const i18n_1 = __importDefault(require("i18n"));
exports.i18n = i18n_1.default;
i18n_1.default.configure({
    defaultLocale: 'en',
    // where to store json files - defaults to './locales' relative to modules directory
    directory: __dirname + '/../../locales',
    // setup some locales - other locales default to en silently
    locales: ['en'],
    // sets a custom cookie name to parse locale settings from - defaults to NULL
    cookie: 'breakdown-analytics-admin',
    // watch for changes in json files to reload locale on updates - defaults to false
    autoReload: true,
    // enable object notation
    // enable object notation
    objectNotation: true
});
//# sourceMappingURL=i18n.js.map