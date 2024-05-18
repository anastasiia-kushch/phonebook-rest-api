import Contact from '../db/models/Contact.js';
import HttpError from '../helpers/HttpError.js';

export const getAllContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1) * limit;
    const query = favorite
      ? { favorite: favorite === 'true', owner: req.user.id }
      : { owner: req.user.id };
    const contacts = await Contact.find(query).skip(skip).limit(Number(limit));
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

    if (contact.owner.toString() !== req.user.id) throw HttpError(403);

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

    if (contact.owner.toString() !== req.user.id) throw HttpError(403);

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { id } = req.user;
    const result = await Contact.create({ ...req.body, owner: id });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    if (req.body.length === 0)
      throw HttpError(400, 'Body must have at least one field');

    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) throw HttpError(404, 'Contact not found');

    if (result.owner.toString() !== req.user.id) throw HttpError(403);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    if (req.body.length === 0)
      throw HttpError(400, 'Body must have at least one field');

    const { id } = req.params;
    const { favorite } = req.body;

    const result = await Contact.findByIdAndUpdate(
      id,
      { favorite },
      { new: true }
    );
    if (!result) throw HttpError(404, 'Contact not found');

    if (result.owner.toString() !== req.user.id) throw HttpError(403);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
