const argv = require("yargs").argv;
const cont = require("./contacts");

// console.log('test',cont.listContacts());
// cont.listContacts();
// cont.removeContact(2);
// cont.addContact("testd", "testg", 1234);
// console.log(path.join(__dirname, "./db", "contacts.json"));
// exports.contactsPath = contactsPath;
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      cont.listContacts().then((data) => {
        console.table(data);
      });
      break;

    case "get":
      cont.getContactById(id).then((data) => {
        console.table(data);
      });
      break;

    case "add":
      cont.addContact(name, email, phone).then((data) => {
        console.table(data);
      });
      break;

    case "remove":
      cont.removeContact(id).then((data) => {
        console.table(data);
      });
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
