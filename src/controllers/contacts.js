import { createContact } from '../services/contacts.js';
import { getAllContacts, getContactById } from './services/contacts.js';
import createHttpError from 'http-errors';

export const getContactController = async (req, res) => {
  const allContacts = await getAllContacts();
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: allContacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contactById = await getContactById(contactId);

  // Відповідь, якщо контакт не знайдено
  if (!contactById) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  // Відповідь, якщо контакт знайдено
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contactById,
  });
};

export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};
