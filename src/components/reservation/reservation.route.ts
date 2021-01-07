import { Request, Response, Router } from 'express';
import ReservationValidations from './reservation.validation';
import ReservationController from './reservation.controller';
import ReservationMiddleware from './reservation.middleware';
import RestaurantMiddleware from '../../middleware/restaurant.middleware';
const router = Router();

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

export default router;
