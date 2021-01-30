const path = require("path");
const { v4: uuidv4 } = require("uuid");
const util = require("util");
const fs = require("fs");
const writeFilePromisified = util.promisify(fs.writeFile);
const readFilePromise = util.promisify(fs.readFile);
const contactsPath = path.join("./db", "contacts.json");

async function listContacts() {
  const data = await readFilePromise(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await listContacts();
  return data.filter(({ id }) => id.toString() === contactId);
}
async function removeContact(contactId) {
  try {
    const data = await listContacts();
    const infData = data.filter(({ id }) => id.toString() === contactId);
    const newArr = data.filter(({ id }) => id.toString() !== contactId);
    await writeFilePromisified(contactsPath, JSON.stringify(newArr));
    if (infData.length > 0) {
      return true;
    } else {
      return false;
    }
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
async function updateContact(id, body) {
  try {
    function isEmpty(obj) {
      for (let key in obj) {
        return true;
      }
      return false;
    }
    if (isEmpty(body) === false) {
      return { inf: false, message: "missing fields" };
    } else {
      const data = await listContacts();
      const idx = data.findIndex((el) => {
        return el.id.toString() === id;
      });
      if (idx === -1) {
        return { inf: false, message: "Not found" };
      } else {
        let foundObj = data[idx];
        function setData(dataNew, dataOld) {
          if (dataNew === undefined || dataNew.trim() === "") {
            return dataOld;
          } else {
            return dataNew;
          }
        }

        const setObj = {
          id: foundObj.id,
          name: setData(body.name, foundObj.name),
          email: setData(body.email, foundObj.email),
          phone: setData(body.phone, foundObj.phone),
        };
        const newArr = [...data.slice(0, idx), setObj, ...data.slice(idx + 1)];

        await writeFilePromisified(contactsPath, JSON.stringify(newArr));
        return { inf: true, obj: setObj };
      }
    }
  } catch (err) {
    console.log(err);
  }
}
exports.listContacts = listContacts;
exports.getContactById = getContactById;
exports.removeContact = removeContact;
exports.addContact = addContact;
exports.updateContact = updateContact;
