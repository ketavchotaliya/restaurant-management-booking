import { NextFunction, Request, Response } from 'express';
import { createValidationResponse } from '../../utils/helper';
import { isBoolean, isEmpty, isJSON, isNumber, isString, matches } from '../../utils/validator';
const TIME_VALIDATION_REGEX = /(\d{1,2})\:(\d{1,2})\:(\d{1,2})/;
import moment from 'moment';

class ReservationValidations {
  bookTable(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const {
      restaurant_id,
      reservation_start_time,
      reservation_end_time,
      reservation_date,
      total_tables_to_book,
    } = req.body;
    const errors: any = {};

    if (isEmpty(authorization)) {
      errors.authorization = res.__('VALIDATIONS.COMMON.authorization.required');
    }

    if (isEmpty(restaurant_id)) {
      errors.restaurant_id = res.__('BOOKING.restaurant_id.required');
    } else if (!isNumber(restaurant_id)) {
      errors.restaurant_id = res.__('BOOKING.restaurant_id.number');
    }

    if (isEmpty(reservation_date)) {
      errors.reservation_date = res.__('BOOKING.reservation_date.required');
    } else if (!moment(reservation_date).isValid()) {
      errors.reservation_date = res.__('BOOKING.reservation_date.valid');
    } else if (new Date(reservation_date) < new Date()) {
      errors.reservation_date = res.__('BOOKING.reservation_date.past_date');
    }

    if (isEmpty(reservation_start_time)) {
      errors.reservation_start_time = res.__('BOOKING.start_time.required');
    } else if (!/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(reservation_start_time)) {
      errors.reservation_start_time = res.__('BOOKING.start_time.valid');
    }

    if (reservation_start_time) {
      if (isEmpty(reservation_end_time)) {
        errors.reservation_end_time = res.__('BOOKING.end_time.required');
      } else if (!/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(reservation_end_time)) {
        errors.reservation_end_time = res.__('BOOKING.end_time.valid');
      } else if (
        reservation_end_time.replace(TIME_VALIDATION_REGEX, '$1$2$3') <=
        reservation_start_time.replace(TIME_VALIDATION_REGEX, '$1$2$3')
      ) {
        errors.reservation_end_time = res.__('BOOKING.end_time.less_then_start_time');
      }
    }

    if (isEmpty(total_tables_to_book)) {
      errors.total_tables_to_book = res.__('BOOKING.total_tables_to_book.required');
    } else if (!isNumber(total_tables_to_book)) {
      errors.total_tables_to_book = res.__('BOOKING.total_tables_to_book.number');
    }

    if (Object.keys(errors).length > 0) {
      createValidationResponse(res, errors);
    } else {
      next();
    }
  }

  bookingList(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const { search, pageNumber, recordsPerPage, sortOrder, sortBy, showAll } = req.body;
    const errors: any = {};

    if (isEmpty(authorization)) {
      errors.authorization = res.__('VALIDATIONS.COMMON.authorization.required');
    }

    if (!isEmpty(search) && !isJSON(search)) {
      errors.search = res.__('VALIDATIONS.COMMON.search.json');
    }
    if (!isEmpty(pageNumber) && !isNumber(pageNumber)) {
      errors.pageNumber = res.__('VALIDATIONS.COMMON.pageNumber.valid');
    } else if (!isEmpty(pageNumber) && Number(pageNumber) <= 0) {
      errors.pageNumber = res.__('VALIDATIONS.COMMON.pageNumber.valid');
    }
    if (!isEmpty(recordsPerPage) && !isNumber(recordsPerPage)) {
      errors.recordsPerPage = res.__('VALIDATIONS.COMMON.recordsPerPage.valid');
    }
    if (!isEmpty(sortOrder) && !isString(sortOrder)) {
      errors.sortOrder = res.__('VALIDATIONS.COMMON.sortOrder.valid');
    }
    if (!isEmpty(sortBy) && !isString(sortBy)) {
      errors.sortBy = res.__('VALIDATIONS.COMMON.sortBy.valid');
    }

    if (!isEmpty(showAll) && !isBoolean(showAll)) {
      errors.showAll = res.__('VALIDATIONS.COMMON.showAll.valid');
    }

    if (Object.keys(errors).length > 0) {
      createValidationResponse(res, errors);
    } else {
      next();
    }
  }
}

export default new ReservationValidations();
