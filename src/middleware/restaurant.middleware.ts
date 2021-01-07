import { NextFunction } from 'express';
import STATUS_CODES from 'http-status-codes';
import { CustomRequest, CustomResponse } from '../environment';
import restaurant from '../services/restaurant';
import { createResponse } from '../utils/helper';
import { logger } from '../utils/logger';

class RestaurantMiddleware {
  async validateRestaurant(req: CustomRequest, res: CustomResponse, next: NextFunction) {
    try {
      const response = await restaurant.getRestaurantDetails(Number(req.body.restaurant_id));
      req.custom.restaurant = response;
      next();
    } catch (e) {
      if (e.statusCode !== undefined && e.statusMessage !== undefined) {
        logger.error(__filename, 'validateRestaurant', '', 'status Check error', e); // Log
        createResponse(res, e.statusCode, e.body.message);
      } else {
        logger.error(__filename, 'isAuthorized', '', 'status Check error', e); // Log
        createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, `Server Error`);
      }
    }
  }
}

const restaurantMW = new RestaurantMiddleware();
export default restaurantMW;
