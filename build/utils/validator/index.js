"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObject = exports.isString = exports.isAlphaNumeric = exports.isBoolean = exports.isNumber = exports.isDecimalNumber = exports.isArray = exports.isEmail = exports.customRegex = exports.isValidString = exports.isEmpty = exports.isURL = exports.isIn = exports.isNumeric = exports.matches = exports.isInt = exports.isLength = exports.isJSON = void 0;
const isJSON_1 = __importDefault(require("validator/lib/isJSON"));
exports.isJSON = isJSON_1.default;
const isLength_1 = __importDefault(require("validator/lib/isLength"));
exports.isLength = isLength_1.default;
const isInt_1 = __importDefault(require("validator/lib/isInt"));
exports.isInt = isInt_1.default;
const matches_1 = __importDefault(require("validator/lib/matches"));
exports.matches = matches_1.default;
const isNumeric_1 = __importDefault(require("validator/lib/isNumeric"));
exports.isNumeric = isNumeric_1.default;
const isIn_1 = __importDefault(require("validator/lib/isIn"));
exports.isIn = isIn_1.default;
const isURL_1 = __importDefault(require("validator/lib/isURL"));
exports.isURL = isURL_1.default;
// Custom Validators
const customValidations_1 = require("./customValidations");
Object.defineProperty(exports, "isEmpty", { enumerable: true, get: function () { return customValidations_1.isEmpty; } });
Object.defineProperty(exports, "isValidString", { enumerable: true, get: function () { return customValidations_1.isValidString; } });
Object.defineProperty(exports, "customRegex", { enumerable: true, get: function () { return customValidations_1.customRegex; } });
Object.defineProperty(exports, "isEmail", { enumerable: true, get: function () { return customValidations_1.isEmail; } });
Object.defineProperty(exports, "isArray", { enumerable: true, get: function () { return customValidations_1.isArray; } });
Object.defineProperty(exports, "isDecimalNumber", { enumerable: true, get: function () { return customValidations_1.isDecimalNumber; } });
Object.defineProperty(exports, "isNumber", { enumerable: true, get: function () { return customValidations_1.isNumber; } });
Object.defineProperty(exports, "isBoolean", { enumerable: true, get: function () { return customValidations_1.isBoolean; } });
Object.defineProperty(exports, "isAlphaNumeric", { enumerable: true, get: function () { return customValidations_1.isAlphaNumeric; } });
Object.defineProperty(exports, "isString", { enumerable: true, get: function () { return customValidations_1.isString; } });
Object.defineProperty(exports, "isObject", { enumerable: true, get: function () { return customValidations_1.isObject; } });
//# sourceMappingURL=index.js.map