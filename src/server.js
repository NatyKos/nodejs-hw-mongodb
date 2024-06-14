import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import env from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';

const PORT = Number(env('PORT', '3000'));

const setupServer = () => {
  const logger = pino({ transport: { target: 'pino-pretty' } });
  const app = express();

  app.use(logger);
  app.use(cors());

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    // Відповідь, якщо контакт не знайдено
    if (!contact) {
      res.status(404).json({
        status: 404,
        message: 'Contact not found',
      });
      return;
    }

    // Відповідь, якщо контакт знайдено
    res.status(200).json({
      status: 200,
      data: contact,
    });
    next();
  });
  app.use('*', (req, res) => {
    res.status(404).json({
      status: 404,
      message: 'Not found',
    });
  });
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
export default setupServer;
