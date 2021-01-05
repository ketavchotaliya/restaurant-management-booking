import { Router } from 'express';

import RestaurantRoutes from '../components/reservation';
const router = Router();
/**
 * Init All routes here
 */

// Private Routes
router.use('/api/v1/restaurant', RestaurantRoutes);

export default router;
