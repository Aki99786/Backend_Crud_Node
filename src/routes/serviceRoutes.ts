import express from 'express';
import auth from '../middlewares/auth';
import { addService , listServicesInCategory , updateService, deleteService } from '../controllers/serviceController';

const router = express.Router();
router.use(auth);
router.post('/:categoryId', addService);
router.get('/:categoryId', listServicesInCategory);
router.put('/:categoryId/:serviceId', updateService);
router.delete('/:categoryId/:serviceId', deleteService);
export default router;
