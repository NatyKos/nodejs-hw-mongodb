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
    try {
      const allContacts = await getAllContacts();
      res.status(200).json({
        status: 200,
        message: 'Successfully found contacts!',
        data: allContacts,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: 'Oops, something went wrong',
        error: error.message,
      });
    }
  });

  app.get('/contacts/:contactId', async (req, res) => {
    try {
      const { contactId } = req.params;
      const contactById = await getContactById(contactId);

      // Відповідь, якщо контакт не знайдено
      if (!contactById) {
        res.status(404).json({
          status: 404,
          message: 'Contact not found',
        });
      }
      // Відповідь, якщо контакт знайдено
      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contactById,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: 'Oops, something went wrong',
        error: error.message,
      });
    }
  });

  app.use('*', (req, res) => {
    res.status(404).json({
      status: 404,
      message: 'Not found',
    });
  });

  app.use((error, req, res) => {
    res.status(500).json({
      status: 500,
      message: 'Something went wrong',
      error: error.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
export default setupServer;
