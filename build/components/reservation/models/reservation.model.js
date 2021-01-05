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
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = require("../schemas");
class ReservationModel {
    addOne(reservationObj, transaction = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const insertedObj = yield schemas_1.Reservation.create(reservationObj, {
                    transaction: transaction ? transaction : undefined,
                });
                return insertedObj;
            }
            catch (error) {
                throw error;
            }
        });
    }
    addMany(reservationArr, transaction = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield schemas_1.Reservation.bulkCreate(reservationArr, { transaction: transaction ? transaction : undefined });
            }
            catch (error) {
                throw error;
            }
        });
    }
    getSingle(whereObj) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield schemas_1.Reservation.findOne({
                    where: whereObj,
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateOne(whereObj, reservationObj, transaction = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield schemas_1.Reservation.update(reservationObj, {
                    where: whereObj,
                    transaction: transaction ? transaction : undefined,
                });
                return;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getTotal(condition = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const count = yield schemas_1.Reservation.count({
                    where: condition,
                });
                return count;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getMany(condition = {}, attributes = [], other = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield schemas_1.Reservation.findAll(Object.assign({ attributes: attributes.length > 0 ? attributes : undefined, where: condition }, other));
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new ReservationModel();
//# sourceMappingURL=reservation.model.js.map