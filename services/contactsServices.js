import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const contactsPath = path.resolve('db', 'contacts.json');

export async function listContacts() {
  const data = await fs.readFile(contactsPath, 'utf-8');
  const contacts = JSON.parse(data);

  return contacts;
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const foundContact = contacts.find((contact) => contact.id === contactId);

  return foundContact || null;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);

  if (index === -1) {
    return null;
  }

  const deletedData = contacts.splice(index, 1)[0];
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return deletedData;
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
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
}

export async function updContact(id, contact) {
  const contacts = await listContacts();
  const index = contacts.findIndex((c) => c.id === id);
  const updContact = { ...contacts[index], ...contact };
  contacts[index] = updContact;
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return updContact;
}
