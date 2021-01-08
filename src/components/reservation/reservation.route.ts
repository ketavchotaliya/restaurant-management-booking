import { Request, Response, Router } from 'express';
import ReservationValidations from './reservation.validation';
import ReservationController from './reservation.controller';
import ReservationMiddleware from './reservation.middleware';
import RestaurantMiddleware from '../../middleware/restaurant.middleware';
const router = Router();

// create booking
router.post(
  '/',
  ReservationValidations.bookTable,
  RestaurantMiddleware.validateRestaurant,
  ReservationMiddleware.compareRestaurantTiming,
  ReservationMiddleware.checkAvailability,
  (req: Request, res: Response) => {
    ReservationController.bookTable(req, res);
  }
);

// list my booking
router.post(
  '/list',
  ReservationValidations.bookingList,
  (req: Request, res: Response) => {
    ReservationController.bookingList(req, res);
  }
);

export default router;
