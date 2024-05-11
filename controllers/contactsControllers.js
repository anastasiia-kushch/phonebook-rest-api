import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updContact,
} from '../services/contactsServices.js';
import HttpError from '../helpers/HttpError.js';

export const getAllContacts = async (req, res) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
};

export const getOneContact = async (req, res) => {
  try {
    const contact = await getContactById(req.params.id);
    res.status(200).json(contact);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }

};

export const deleteContact = async (req, res) => {
  const contact = await removeContact(req.params.id);
  if (!contact) {
    throw HttpError(404);
  }
  res.status(200).json(contact);
};

export const createContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const result = await addContact(name, email, phone);
  res.status(201).json(result);
};

export const updateContact = async (req, res) => {
  const updatedContact = await updContact(req.params.id, req.body);
  if (!updatedContact) {
    throw HttpError(404);
  }
  res.status(200).json(updatedContact);
};
