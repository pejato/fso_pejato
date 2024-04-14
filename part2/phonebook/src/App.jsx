import { useState, useEffect } from "react";
import InputForm from "./components/InputForm";
import NumbersList from "./components/NumbersList";
import SearchField from "./components/SearchField";
import peopleService from "./services/people";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [personFilter, setPersonFilter] = useState("");

  useEffect(() => {
    peopleService.getAll().then((data) => {
      setPersons(data);
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
    const existingPerson = persons.find(
      (person) => person.name === newPerson.name
    );
    if (existingPerson !== undefined) {
      const updatedPerson = { ...existingPerson, number: newPerson.number };
      peopleService.update(existingPerson.id, updatedPerson).then((data) => {
        setPersons(
          persons.map((person) => {
            if (person.id === data.id) {
              return data;
            } else {
              return person;
            }
          })
        );
      });
    } else {
      peopleService.create(newPerson).then((data) => {
        setPersons(persons.concat(data));
      });
    }
  };

  const onDeletePerson = (id) => {
    peopleService.remove(id).then((data) => {
      console.log(data);
      console.log(persons.filter((person) => person.id !== data.id));
      setPersons(persons.filter((person) => person.id !== data.id));
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchField onSearchChange={onSearchChange} />
      <InputForm onNewPerson={onNewPerson} />
      <NumbersList persons={filteredPersons} onDelete={onDeletePerson} />
    </div>
  );
};

export default App;
