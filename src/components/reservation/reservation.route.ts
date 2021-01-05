import { Request, Response, Router } from 'express';
import ReservationValidations from './reservation.validation';
import ReservationController from './reservation.controller';
import Authorization from '../../middleware/authorization';

const router = Router();

router.post('/list', [/* Authorization.isAuthorized, */ ReservationValidations.list], (req: Request, res: Response) => {
  ReservationController.reservationList(req, res);
});

export default router;
