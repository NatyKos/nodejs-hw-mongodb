import { Router } from 'express';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import {
  getContactController,
  getContactByIdController,
  createContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';

const contactsRouter = Router();
contactsRouter.use(authenticate);
contactsRouter.get('/', ctrlWrapper(getContactController));
contactsRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController),
);
contactsRouter.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
contactsRouter.patch(
  '/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController),
);
contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactController));

export default contactsRouter;
