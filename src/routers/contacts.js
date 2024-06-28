import { Router } from 'express';
import {
  getContactController,
  getContactByIdController,
  createContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { isValidId, validateBody } from '../server.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';

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
router.get(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController),
);
router.post(
  '/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
router.patch(
  '/contacts/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController),
);
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default router;
