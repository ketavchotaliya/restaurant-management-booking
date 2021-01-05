"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reservation_validation_1 = __importDefault(require("./reservation.validation"));
const reservation_controller_1 = __importDefault(require("./reservation.controller"));
const router = express_1.Router();
router.post('/list', [/* Authorization.isAuthorized, */ reservation_validation_1.default.list], (req, res) => {
    reservation_controller_1.default.reservationList(req, res);
});
exports.default = router;
//# sourceMappingURL=reservation.route.js.map