import Contact from '../db/models/Contact.js';
import HttpError from '../helpers/HttpError.js';

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);

    if (!contact) throw HttpError(404, 'Contact not found');

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) throw HttpError(404, 'Contact not found or already deleted');

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) throw HttpError(404, 'Contact not found');

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { favorite } = req.body;

    const result = await Contact.findByIdAndUpdate(
      id,
      { favorite },
      { new: true }
    );
    if (!result) throw HttpError(404, 'Contact not found');

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
