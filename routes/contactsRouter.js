import express from 'express';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getOneContact,
  updateContact,
  updateStatusContact,
} from '../controllers/contactsControllers.js';


const contactsRouter = express.Router();
contactsRouter.get('/', getAllContacts);
contactsRouter.get('/:id', getOneContact);
contactsRouter.delete('/:id', deleteContact);
contactsRouter.post('/', createContact);
contactsRouter.put('/:id', updateContact);
contactsRouter.patch('/:id/favorite', updateStatusContact);

export default contactsRouter;
