export default function getContacts(contacts) {
  const persons = contacts.map(({ name, age }) => {
    return `${name} is ${age} years ${age > 70 ? "young" : "old"}.`;
  });
  return persons;
}
