import { useState } from "react";
import InputForm from "./components/InputForm";
import NumbersList from "./components/NumbersList";
import SearchField from "./components/SearchField";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "678-999-8212" },
  ]);
  const [personFilter, setPersonFilter] = useState("");

  const filteredPersons =
    personFilter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().startsWith(personFilter.toLowerCase())
        );

  const onSearchChange = (searchTerm) => {
    setPersonFilter(searchTerm);
  };

  const onNewPerson = (newPerson) => {
    if (persons.some((person) => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to the phonebook`);
    } else {
      setPersons(persons.concat(newPerson));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchField onSearchChange={onSearchChange} />
      <InputForm onNewPerson={onNewPerson} />
      <NumbersList persons={filteredPersons} />
    </div>
  );
};

export default App;
