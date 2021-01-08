import { Application } from 'express';

import ReservationRoute from './reservation.route';

/**
 * Init All routes here
 */
export default (app: Application) => {
  // Provider Routes
  app.use('/reservation', ReservationRoute);
};
