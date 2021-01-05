"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConfig_1 = __importDefault(require("../../../utils/dbConfig"));
class Reservation extends sequelize_1.Model {
}
Reservation.init({
    reservation_id: {
        type: sequelize_1.DataTypes.BIGINT(),
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: new sequelize_1.DataTypes.BIGINT(),
        allowNull: false,
    },
    restaurant_id: {
        type: new sequelize_1.DataTypes.BIGINT(),
    },
    table_id: {
        type: new sequelize_1.DataTypes.INTEGER(),
    },
    reservation_date: {
        type: new sequelize_1.DataTypes.DATE(),
    },
    reservation_start_time: {
        type: new sequelize_1.DataTypes.STRING(),
    },
    reservation_end_time: {
        type: new sequelize_1.DataTypes.STRING(),
    },
    booking_at: {
        type: new sequelize_1.DataTypes.DATE(),
    },
    is_cancelled: {
        type: new sequelize_1.DataTypes.TINYINT(),
    },
    created_at: {
        type: new sequelize_1.DataTypes.DATE(),
    },
    updated_at: {
        type: new sequelize_1.DataTypes.DATE(),
    },
}, {
    sequelize: dbConfig_1.default,
    tableName: 'reservation',
    timestamps: false,
});
exports.default = Reservation;
//# sourceMappingURL=reservation.js.map