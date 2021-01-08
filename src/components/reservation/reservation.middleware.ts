import { NextFunction } from 'express';
import STATUS_CODES from 'http-status-codes';
import { Op } from 'sequelize';
import { CustomRequest, CustomResponse } from '../../environment';
import { checkOverlap, createResponse } from '../../utils/helper';
import { logger } from '../../utils/logger';
import { ReservationModel } from './models';

class ReservationMiddleware {
  async compareRestaurantTiming(req: CustomRequest, res: CustomResponse, next: NextFunction) {
    try {
      const restaurantOpenTime2 = req.custom.restaurant.open_time_2;
      const restaurantCloseTime2 = req.custom.restaurant.close_time_2;
      let isTimeOverlaps = false;

      if (
        checkOverlap(
          req.custom.restaurant.open_time_1,
          req.custom.restaurant.close_time_1,
          req.body.reservation_start_time,
          req.body.reservation_end_time
        )
      ) {
        isTimeOverlaps = true;
      }

      if (restaurantOpenTime2 && restaurantCloseTime2 && isTimeOverlaps) {
        if (
          checkOverlap(
            restaurantOpenTime2,
            restaurantCloseTime2,
            req.body.reservation_start_time,
            req.body.reservation_end_time
          )
        ) {
          isTimeOverlaps = true;
        } else {
          isTimeOverlaps = false;
        }
      }

      if (isTimeOverlaps) {
        createResponse(res, STATUS_CODES.UNPROCESSABLE_ENTITY, 'Booking time is overlaps with Restaurant time');
        return;
      }

      next();
    } catch (e) {
      logger.error(__filename, 'Availability', '', 'Error in check booking availability', e);
      createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, 'Internal server error');
    }
  }

  async checkAvailability(req: CustomRequest, res: CustomResponse, next: NextFunction) {
    try {
      const totalTables = req.custom.restaurant.tables.length;
      // const minimumReservationPeriod = req.custom.restaurant.min_reservation_period;

      // Fetch booking details of restaurant on same day
      const bookingDetails = await ReservationModel.getMany({
        restaurant_id: req.custom.restaurant.restaurant_id,
        is_cancelled: 0,
        reservation_start_time: { [Op.lte]: req.body.reservation_start_time },
        reservation_end_time: { [Op.gte]: req.body.reservation_end_time },
        reservation_date: new Date(req.body.reservation_date),
      });

      // booking found in restaurant
      if (bookingDetails.length) {
        // count total available table and check if requested tables is available or not
        const totalAvailableTables = totalTables - bookingDetails.length;

        if (totalAvailableTables < Number(req.body.total_tables_to_book)) {
          createResponse(res, STATUS_CODES.UNPROCESSABLE_ENTITY, 'Required table is not available for given time');
          return;
        }

        const openTables: any[] = [];
        const reservedTables: any[] = [];

        for (let i in req.custom.restaurant.tables) {
          openTables.push(req.custom.restaurant.tables[i].table_id);
        }

        for (let j in bookingDetails) {
          reservedTables.push(bookingDetails[j].table_id);
        }

        // Remove reserved table from openTables list
        const availableTables = openTables.filter(function(obj) {
          return reservedTables.indexOf(obj) == -1;
        });

        req.body.availableTables = availableTables;
        next();
      } else {
        if (totalTables < Number(req.body.total_tables_to_book)) {
          createResponse(res, STATUS_CODES.UNPROCESSABLE_ENTITY, 'Required table is not available for given time');
          return;
        }

        const openTables: any[] = [];

        for (let i in req.custom.restaurant.tables) {
          openTables.push(req.custom.restaurant.tables[i].table_id);
        }
        req.body.availableTables = openTables;
        next();
      }
    } catch (e) {
      logger.error(__filename, 'checkAvailability', '', 'Error in checkAvailability', e);
      createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, 'Internal server error');
    }
  }
}

const reservationMW = new ReservationMiddleware();
export default reservationMW;
