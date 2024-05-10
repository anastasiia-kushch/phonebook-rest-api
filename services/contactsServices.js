import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import HttpError from '../helpers/HttpError.js';

const contactsPath = path.resolve('db', 'contacts.json');

export async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    HttpError(400);
  }
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const foundContact = contacts.find(contact => contact.id === contactId);
  if (!foundContact) {
    HttpError(404, 'Contact not found');
  }
  return foundContact || null;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null;
  } else {
    const deletedData = contacts.splice(index, 1)[0];
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return deletedData;
  }
}

export async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    HttpError(409);
  }

  return newContact;
}

export async function updContact(id, contact) {
  const contacts = await listContacts();
  const index = contacts.findIndex(c => c.id === id);
  if (index === -1) {
    return null;
  }

  const updContact = { ...contacts[index], ...contact };
  contacts[index] = updContact;
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return updContact;
  } catch (error) {
    throw HttpError(400);
  }
}
