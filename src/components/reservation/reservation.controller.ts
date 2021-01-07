import STATUS_CODES from 'http-status-codes';
import { CustomRequest, CustomResponse, Pager } from '../../environment';
import { createResponse } from '../../utils/helper';
import { logger } from '../../utils/logger';
import { ReservationModel } from './models';

class ReservationController {
  async bookTable(req: CustomRequest, res: CustomResponse) {
    try {
      let {
        restaurant_id,
        reservation_date,
        reservation_start_time,
        reservation_end_time,
        total_tables_to_book,
      } = req.body;

      const reservationArr: any[] = [];
      for (let i = 0; i < total_tables_to_book; i++) {
        const reservationObj = {
          user_id: Number(req.headers.logged_in_user_id),
          restaurant_id,
          table_id: req.body.availableTables[i],
          reservation_date,
          reservation_start_time,
          reservation_end_time,
          booking_at: new Date(),
          is_cancelled: 0,
          created_at: new Date(),
        };
        reservationArr.push(reservationObj);
      }

      // create booking
      await ReservationModel.addMany(reservationArr);

      createResponse(res, STATUS_CODES.OK, 'Booking confirmed');
    } catch (error) {
      logger.error(__filename, 'bookTable', req.custom.uuid, 'bookTable', error);
      createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, res.__('SERVER_ERROR'));
    }
  }
}

export default new ReservationController();
