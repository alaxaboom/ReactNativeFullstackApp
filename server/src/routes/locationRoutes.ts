import { Router } from 'express';
import locationController from '../controllers/locationController';

const router = Router();

router.post('/', locationController.createLocation);
router.get('/', locationController.getAllLocations);
router.get('/search', locationController.searchLocations);
router.get('/:id', locationController.getLocationById);

export default router;

