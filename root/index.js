const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.log("Contacts:", contacts);
      break;

    case "get":
      const contact = await getContactById(id);
      console.log("Contact:", contact);
      break;

    case "add":
      await addContact(name, email, phone);
      console.log("Contact added");
      break;

    case "remove":
      await removeContact(Number(id));
      console.log("Contact removed");
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

if (Object.keys(argv).length > 0) {
  invokeAction(argv);
} else {
  testContactsFunctions();
}

async function testContactsFunctions() {
  console.log("Listing contacts:");
  const contactList = await listContacts();
  console.log(contactList);

  console.log("\nAdding new contact:");
  await addContact("Alice Johnson", "alice.johnson@example.com", "555-1234");
  const updatedListAfterAdd = await listContacts();
  console.log(updatedListAfterAdd);

  console.log("\nGetting contact by ID (ID 1):");
  const contactById = await getContactById(1);
  console.log(contactById);

  console.log("\nRemoving contact by ID (ID 1):");
  await removeContact(1);
  const updatedListAfterRemove = await listContacts();
  console.log(updatedListAfterRemove);
}
