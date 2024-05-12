import express from 'express';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getOneContact,
  updateContact,
} from '../controllers/contactsControllers.js';
import validateBody from '../helpers/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../schemas/contactsSchemas.js';

const contactsRouter = express.Router();
contactsRouter.get('/', getAllContacts);
contactsRouter.get('/:id', getOneContact);
contactsRouter.delete('/:id', deleteContact);
contactsRouter.post('/', createContact);
contactsRouter.put('/:id', updateContact);

export default contactsRouter;
