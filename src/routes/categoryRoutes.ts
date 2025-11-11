import express from 'express';
import auth from '../middlewares/auth';
import { createCategory, getAllCategories , updateCategory,deleteCategory } from '../controllers/categoryController';

const router = express.Router();
router.use(auth);

router.post('/', createCategory);
router.get('/', getAllCategories);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;