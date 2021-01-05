import STATUS_CODES from 'http-status-codes';
import { CustomRequest, CustomResponse, Pager } from '../../environment';
import { RECORDS_PER_PAGE } from '../../utils/constants';
import { createResponse, getDefaultSortOrder } from '../../utils/helper';
import { logger } from '../../utils/logger';
import ReservationHelper from './reservation.helper';
import { ReservationModel } from './models';

class ReservationController {
  async reservationList(req: CustomRequest, res: CustomResponse) {
    try {
      let { search, rowNumber, recordsPerPage, sortOrder, sortBy, showAll } = req.body;
      rowNumber = rowNumber ? +rowNumber : 1;
      recordsPerPage = recordsPerPage ? +recordsPerPage : RECORDS_PER_PAGE;

      // Set sort order
      sortOrder = getDefaultSortOrder(sortOrder);
      const { orderBy, sortField } = ReservationHelper.getReservationOrder(sortBy, sortOrder);

      const other = {
        order: orderBy,
        offset: !showAll ? rowNumber - 1 : undefined,
        limit: !showAll ? recordsPerPage : undefined,
      };

      let condition: any = [];
      // search filter
      if (search) {
        const filters = JSON.parse(search);
        condition = ReservationHelper.getReservationFilters(filters);
      }
      // Get records
      const totalCount = !showAll ? await ReservationModel.getTotal(condition) : undefined;
      const list = await ReservationModel.getMany(condition, [], other);

      // If show all then pager will be empty
      const pager: Pager | {} = showAll
        ? {}
        : {
            sortField,
            sortOrder,
            rowNumber,
            recordsPerPage,
            filteredRecords: list.length,
            totalRecords: totalCount,
          };

      createResponse(res, STATUS_CODES.OK, res.__('Reservation.LIST'), list, pager);
    } catch (error) {
      logger.error(__filename, 'ReservationList', req.custom.uuid, 'ReservationList', error);
      createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, res.__('SERVER_ERROR'));
    }
  }
}

export default new ReservationController();
