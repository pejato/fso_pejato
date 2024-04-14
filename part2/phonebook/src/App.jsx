import { useState, useEffect } from "react";
import InputForm from "./components/InputForm";
import NumbersList from "./components/NumbersList";
import SearchField from "./components/SearchField";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [personFilter, setPersonFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const filteredPersons =
    personFilter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(personFilter.toLowerCase())
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
