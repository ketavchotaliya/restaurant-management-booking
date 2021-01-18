import STATUS_CODES from 'http-status-codes';
import { CustomRequest, CustomResponse, Pager } from '../../environment';
import { Restaurant } from '../../services';
import { RECORDS_PER_PAGE } from '../../utils/constants';
import { createResponse, getDefaultSortOrder } from '../../utils/helper';
import { logger } from '../../utils/logger';
import { ReservationModel } from './models';
import reservationHelper from './reservation.helper';

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

  async bookingList(req: CustomRequest, res: CustomResponse) {
    try {
      let { search, pageNumber, recordsPerPage, sortOrder, sortBy, showAll } = req.body;

      pageNumber = pageNumber ? +pageNumber : 1;
      recordsPerPage = recordsPerPage ? +recordsPerPage : RECORDS_PER_PAGE;
      // Set sort order
      sortOrder = getDefaultSortOrder(sortOrder);
      const { orderBy, sortField } = reservationHelper.getReservationOrder(sortBy, sortOrder);

      // pagination paramter
      let skip = (pageNumber - 1) * recordsPerPage;

      const other = {
        order: orderBy,
        offset: !showAll ? skip : undefined,
        limit: !showAll ? recordsPerPage : undefined,
      };
      let condition: any = [];
      // search filter
      if (search) {
        const filters = JSON.parse(search);
        condition = reservationHelper.getReservationFilters(filters);
      }

      // add static condition
      condition.push({ user_id: req.headers.logged_in_user_id });
      // Get records
      const attr = [
        'reservation_id',
        'restaurant_id',
        'table_id',
        'reservation_date',
        'reservation_start_time',
        'reservation_end_time',
        'is_cancelled',
      ];
      const totalCount = !showAll ? await ReservationModel.getCount(condition) : undefined;
      const list: any[] = await ReservationModel.getMany(condition, attr, other);

      // Get Restaurant details form Restaurant service
      if (list.length) {
        const restaurantIds = [];
        for (let i = 0; i < list.length; i++) {
          restaurantIds.push(Number(list[i].restaurant_id));
        }
        // Restaurant details
        const restaurantDetails: any[] = await Restaurant.getRestaurantDetails(restaurantIds);

        if (restaurantDetails.length) {
          for (let i = 0; i < list.length; i++) {
            for (let j = 0; j < restaurantDetails.length; j++) {
              if (Number(list[i].restaurant_id) === Number(restaurantDetails[j].restaurant_id)) {
                list[i].dataValues.restaurant_name = restaurantDetails[j].restaurant_name;
              }

              if (restaurantDetails[j].tables.length) {
                for (let k = 0; k < restaurantDetails[j].tables.length; k++) {
                  if (Number(list[i].table_id) === Number(restaurantDetails[j].tables[k].table_id)) {
                    list[i].dataValues.table_number = restaurantDetails[j].tables[k].table_no;
                  }
                }
              }
            }
          }
        }
      }

      const resObj = {
        booking: list,
      };

      const pager = showAll
        ? {}
        : {
            sortField,
            sortOrder,
            pageNumber,
            recordsPerPage,
            filteredRecords: list.length,
            totalRecords: totalCount,
          };
      // Response
      return createResponse(res, STATUS_CODES.OK, res.__('BOOKING.booking_lists'), resObj, pager);
    } catch (error) {
      logger.error(__filename, 'bookingList', req.custom.uuid, 'bookingList', error);
      createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, res.__('SERVER_ERROR'));
    }
  }

  async cancelBooking(req: CustomRequest, res: CustomResponse) {
    try {
      const { reservation_id } = req.body;

      // cancel reservation
      await ReservationModel.updateOne(
        {
          reservation_id,
        },
        {
          is_cancelled: 1,
          updated_at: new Date(),
        }
      );

      createResponse(res, STATUS_CODES.OK, 'Booking cancelled');
    } catch (e) {
      logger.error(__filename, 'cancelBooking', req.custom.uuid, 'bookTable', e);
      createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, res.__('SERVER_ERROR'));
    }
  }
}

export default new ReservationController();
