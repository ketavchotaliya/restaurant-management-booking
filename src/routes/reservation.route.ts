import { Router } from 'express';

import ReservationRoutes from '../components/reservation';
const router = Router();
/**
 * Init All routes here
 */

// Private Routes
router.use('/api/v1/booking', ReservationRoutes);

export default router;
