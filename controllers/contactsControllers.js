import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updContact,
} from '../services/contactsServices.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../schemas/contactsSchemas.js';

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    return res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.id);
    if (contact) {
      return res.status(200).json(contact);
    } else {
      return res.status(404).send({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.id);
    if (contact) {
      return res.status(200).json(contact);
    } else {
      return res.status(404).send({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { error } = createContactSchema.validate({
    name,
    email,
    phone,
  });

  if (typeof error !== 'undefined') {
    return res.status(400).json({ message: error.message });
  }

  try {
    const contact = await addContact(name, email, phone);
    return res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ message: 'Body must have at least one field' });
    }

    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }

    const updatedContact = await updContact(req.params.id, req.body);
    if (!updatedContact) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};
