"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class ReservationHelper {
    getReservationOrder(sortBy, sortOrder) {
        let orderBy, sortField;
        if (sortBy) {
            if (['country_name', 'code', 'dial_code', 'is_active'].includes(sortBy)) {
                orderBy = [[sortBy, sortOrder]];
                sortField = sortBy;
            }
            else {
                orderBy = [['country_name', sortOrder]];
                sortField = 'country_name';
            }
        }
        else {
            orderBy = [['country_name', sortOrder]];
            sortField = 'country_name';
        }
        return { orderBy, sortField };
    }
    getReservationFilters(filters) {
        let condition = [];
        for (var key in filters) {
            const data = filters[key];
            if (['country_name', 'code', 'dial_code'].includes(key)) {
                condition.push({
                    [key]: { [sequelize_1.Op.like]: `%${data}%` },
                });
            }
            if (key === 'is_active') {
                if (+data === 0 || +data === 1) {
                    condition.push({
                        [key]: data,
                    });
                }
            }
        }
        return condition;
    }
}
exports.default = new ReservationHelper();
//# sourceMappingURL=reservation.helper.js.map