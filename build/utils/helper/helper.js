"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePassword = exports.getObjectKeys = exports.getRandom = exports.convertDateStringToDate = exports.convertToDateFormat = exports.getUTCDate = exports.getStringInitials = exports.stringWithZeroes = exports.getLeadingZero = exports.beautifyKey = exports.uniqString = exports.getHashedString = exports.getDefaultSortOrder = exports.createValidationResponse = exports.createResponse = void 0;
const bcrypt = __importStar(require("bcrypt"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const uuid_1 = __importDefault(require("uuid"));
const logger_1 = require("../logger");
const BCRYPT_SALT = process.env.BCRYPT_SALT;
/**
 * @description Create Response
 * @param {Object} res
 * @param {Number} status
 * @param {String} message
 * @param {Object} payload
 * @param {Object} pager
 */
exports.createResponse = (res, status, message, payload = {}, pager = {}) => {
    const resPager = typeof pager !== 'undefined' ? pager : {};
    return res.status(status).json({
        status,
        message,
        payload,
        pager: resPager,
    });
};
/**
 * @description Send Validation Response
 * @param {Object} res
 * @param {errors} errors - Errors Object
 *
 * @return {*|Sequelize.json|Promise<any>}
 */
exports.createValidationResponse = (res, errors) => {
    return exports.createResponse(res, http_status_codes_1.default.UNPROCESSABLE_ENTITY, errors[Object.keys(errors)[0]], { error: errors[Object.keys(errors)[0]] }, {});
};
/**
 * @description Get Default sort Order
 * @param sortOrder
 */
exports.getDefaultSortOrder = (sortOrder) => {
    const order = sortOrder && ['asc', 'desc'].indexOf(sortOrder.toLowerCase()) !== -1
        ? sortOrder.toLowerCase() === 'asc'
            ? 'ASC'
            : 'DESC'
        : 'DESC';
    return order;
};
/**
 * @description Get Hashed String
 * @param value
 */
exports.getHashedString = (value) => {
    let hashWithSalt = bcrypt.hashSync(value, BCRYPT_SALT);
    return hashWithSalt;
};
/**
 * @description Get Uniq String
 */
exports.uniqString = (uploadedFileExtension) => {
    const newName = `${uuid_1.default.v4()}.${uploadedFileExtension}`;
    return newName;
};
/**
 * @description To make object key useable
 * @param string
 */
exports.beautifyKey = (string) => {
    const key = string.toLowerCase().replace(' ', '_');
    return key;
};
/**
 * @description Get Leading Zero if single character
 * @param string
 */
exports.getLeadingZero = (string) => {
    return ('0' + string).slice(-2);
};
/**
 * @description Add leading zero to particular number
 * @param number
 * @param length
 */
exports.stringWithZeroes = (number, length) => {
    var my_string = '' + number;
    while (my_string.length < length) {
        my_string = '0' + my_string;
    }
    return my_string;
};
/**
 * @description Get String initials
 * @param string
 */
exports.getStringInitials = (string) => {
    const init = string.replace(/[^a-zA-Z ]/g, '').slice(0, 2);
    return init;
};
/**
 * @desc: Get UTC date
 * @param dateObj Date object or string
 */
exports.getUTCDate = (dateObj) => {
    let date = new Date(dateObj);
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
};
/**
 * @description Convert Date object to Office date format YYYY-MM-DD
 * @param date
 */
exports.convertToDateFormat = (date) => `${date.getFullYear()}-${exports.getLeadingZero(date.getMonth() + 1)}-${exports.getLeadingZero(date.getDate())}`; // Date format conversion
/**
 * @description convert string date to Date Object
 * @param date
 */
exports.convertDateStringToDate = (date) => {
    try {
        const year = parseInt(date.split('-')[2]);
        const month = parseInt(date.split('-')[1]) - 1;
        const day = parseInt(date.split('-')[0]);
        return new Date(year, month, day);
    }
    catch (error) {
        throw error;
    }
};
/**
 * It will return random value between min and max value.
 *
 * @return {number}
 */
exports.getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
exports.getObjectKeys = (obj) => {
    try {
        return Object.keys(obj);
    }
    catch (err) {
        logger_1.logger.error(__filename, 'getObjectKeys', '', 'Error in getObjectKeys', JSON.stringify(err.stack));
        throw err;
    }
};
/**
 * @description will generate passworf
 * @param length
 */
exports.generatePassword = (length) => {
    // Declare a alpha numeric variable
    // which stores all digits
    let smallDigits = 'abcdefghijklmnopqrstuvwxyz';
    let capDigits = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let number = '01234567890123456789';
    let spacialChar = '!@#$%^&';
    let pwd = '';
    for (let i = 0; i < length; i++) {
        if (i == 0) {
            pwd += capDigits[Math.floor(Math.random() * capDigits.length)];
        }
        else if (i == 4) {
            pwd += spacialChar[Math.floor(Math.random() * spacialChar.length)];
        }
        else if (i > 4) {
            pwd += number[Math.floor(Math.random() * number.length)];
        }
        else {
            pwd += smallDigits[Math.floor(Math.random() * smallDigits.length)];
        }
    }
    return pwd;
};
//# sourceMappingURL=helper.js.map