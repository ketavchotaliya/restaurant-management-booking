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
const constants_1 = require("../../utils/constants");
const helper_1 = require("../../utils/helper");
const logger_1 = require("../../utils/logger");
const reservation_helper_1 = __importDefault(require("./reservation.helper"));
const models_1 = require("./models");
class ReservationController {
    reservationList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { search, rowNumber, recordsPerPage, sortOrder, sortBy, showAll } = req.body;
                rowNumber = rowNumber ? +rowNumber : 1;
                recordsPerPage = recordsPerPage ? +recordsPerPage : constants_1.RECORDS_PER_PAGE;
                // Set sort order
                sortOrder = helper_1.getDefaultSortOrder(sortOrder);
                const { orderBy, sortField } = reservation_helper_1.default.getReservationOrder(sortBy, sortOrder);
                const other = {
                    order: orderBy,
                    offset: !showAll ? rowNumber - 1 : undefined,
                    limit: !showAll ? recordsPerPage : undefined,
                };
                let condition = [];
                // search filter
                if (search) {
                    const filters = JSON.parse(search);
                    condition = reservation_helper_1.default.getReservationFilters(filters);
                }
                // Get records
                const totalCount = !showAll ? yield models_1.ReservationModel.getTotal(condition) : undefined;
                const list = yield models_1.ReservationModel.getMany(condition, [], other);
                // If show all then pager will be empty
                const pager = showAll
                    ? {}
                    : {
                        sortField,
                        sortOrder,
                        rowNumber,
                        recordsPerPage,
                        filteredRecords: list.length,
                        totalRecords: totalCount,
                    };
                helper_1.createResponse(res, http_status_codes_1.default.OK, res.__('Reservation.LIST'), list, pager);
            }
            catch (error) {
                logger_1.logger.error(__filename, 'ReservationList', req.custom.uuid, 'ReservationList', error);
                helper_1.createResponse(res, http_status_codes_1.default.INTERNAL_SERVER_ERROR, res.__('SERVER_ERROR'));
            }
        });
    }
}
exports.default = new ReservationController();
//# sourceMappingURL=reservation.controller.js.map