const path = require("path");
const { v4: uuidv4 } = require("uuid");
const util = require("util");
const fs = require("fs");
const writeFilePromisified = util.promisify(fs.writeFile);
const readFilePromise = util.promisify(fs.readFile);
const contactsPath = path.join(__dirname, "./db", "contacts.json");

async function listContacts() {
  const data = await readFilePromise(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await listContacts();
  return data.filter(({ id }) => id === contactId);
}
async function removeContact(contactId) {
  try {
    const data = await listContacts();
    const newArr = data.filter(({ id }) => id !== contactId);
    await writeFilePromisified(contactsPath, JSON.stringify(newArr));
    return newArr;
  } catch (err) {
    console.log(err);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await listContacts();
    const newObj = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    const arrNew = [newObj, ...data];
    await writeFilePromisified(contactsPath, JSON.stringify(arrNew));
    return newObj;
  } catch (err) {
    console.log(err);
  }
}
exports.listContacts = listContacts;
exports.getContactById = getContactById;
exports.removeContact = removeContact;
exports.addContact = addContact;
