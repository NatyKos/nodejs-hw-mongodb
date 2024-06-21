import { Router } from 'express';
import {
  getContactController,
  getContactByIdController,
  createContactController,
} from '../controllers/contacts.js';

const ctrlWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

const router = Router();

router.get('/contacts', ctrlWrapper(getContactController));
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));
router.post('/contacts', ctrlWrapper(createContactController));

export default router;
