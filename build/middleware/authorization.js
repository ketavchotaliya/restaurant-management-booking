"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const services_1 = require("../services");
const helper_1 = require("../utils/helper");
const logger_1 = require("../utils/logger");
class Authorization {
    /**
     * @description Route Authorization for status check
     * @param {Object} req
     * @param {Object} res
     * @param {Object} next
     */
    isAuthorized(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { authorization } = req.headers;
                if (!authorization) {
                    helper_1.createResponse(res, http_status_codes_1.default.UNPROCESSABLE_ENTITY, 'Authorization Token is required.');
                }
                const response = yield services_1.Identity.authorizeUser(authorization);
                if (!response.active) {
                    helper_1.createResponse(res, http_status_codes_1.default.UNAUTHORIZED, `Unauthorized access`);
                }
                else {
                    req.user = response;
                    next();
                }
            }
            catch (e) {
                if (e.statusCode !== undefined && e.statusMessage !== undefined) {
                    logger_1.logger.error(__filename, 'isAuthorized', '', 'status Check error', e); // Log
                    helper_1.createResponse(res, e.statusCode, e.body.message);
                }
                else {
                    logger_1.logger.error(__filename, 'isAuthorized', '', 'status Check error', e); // Log
                    helper_1.createResponse(res, http_status_codes_1.default.INTERNAL_SERVER_ERROR, `Server Error`);
                }
            }
        });
    }
}
const middlewareObj = new Authorization();
exports.default = middlewareObj;
//# sourceMappingURL=authorization.js.map