"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("../../utils/helper");
const validator_1 = require("../../utils/validator");
class ReservationValidations {
    list(req, res, next) {
        const { authorization } = req.headers;
        const { search, rowNumber, recordsPerPage, sortOrder, sortBy, showAll } = req.body;
        const errors = {};
        if (validator_1.isEmpty(authorization)) {
            errors.authorization = res.__('VALIDATIONS.COMMON.authorization.required');
        }
        if (!validator_1.isEmpty(search) && !validator_1.isJSON(search)) {
            errors.search = res.__('VALIDATIONS.COMMON.search.json');
        }
        if (!validator_1.isEmpty(rowNumber) && !validator_1.isNumber(rowNumber)) {
            errors.rowNumber = res.__('VALIDATIONS.COMMON.rowNumber.valid');
        }
        else if (!validator_1.isEmpty(rowNumber) && Number(rowNumber) <= 0) {
            errors.rowNumber = res.__('VALIDATIONS.COMMON.rowNumber.valid');
        }
        if (!validator_1.isEmpty(recordsPerPage) && !validator_1.isNumber(recordsPerPage)) {
            errors.recordsPerPage = res.__('VALIDATIONS.COMMON.recordsPerPage.valid');
        }
        if (!validator_1.isEmpty(sortOrder) && !validator_1.isString(sortOrder)) {
            errors.sortOrder = res.__('VALIDATIONS.COMMON.sortOrder.valid');
        }
        if (!validator_1.isEmpty(sortBy) && !validator_1.isString(sortBy)) {
            errors.sortBy = res.__('VALIDATIONS.COMMON.sortBy.valid');
        }
        if (!validator_1.isEmpty(showAll) && !validator_1.isBoolean(showAll)) {
            errors.showAll = res.__('VALIDATIONS.COMMON.showAll.valid');
        }
        if (Object.keys(errors).length > 0) {
            helper_1.createValidationResponse(res, errors);
        }
        else {
            next();
        }
    }
}
exports.default = new ReservationValidations();
//# sourceMappingURL=reservation.validation.js.map