const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

/**
 * @returns {Promise<Array>}
 */

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading contacts:", err);
    return [];
  }
}

/**
 * @param {string} contactId -
 * @returns {Promise<Object|null>}
 */

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((c) => c.id === contactId);
    return contact || null;
  } catch (err) {
    console.error("Error getting contact:", err);
    return null;
  }
}

/**
 * @param {number} contactId
 * @returns {Promise<void>}
 */

async function removeContact(contactId) {
  try {
    let contacts = await listContacts();
    contacts = contacts.filter((c) => c.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8");
  } catch (err) {
    console.error("Error removing contact:", err);
  }
}

/**
 * @param {string} name
 * @param {string} email
 * @param {string} phone
 * @returns {Promise<void>}
 */

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: contacts.length ? Math.max(contacts.map((c) => c.id)) + 1 : 1,
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8");
  } catch (err) {
    console.error("Error adding contact:", err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
