import { useState, useEffect } from "react";
import InputForm from "./components/InputForm";
import NumbersList from "./components/NumbersList";
import Notification from "./components/Notification";
import SearchField from "./components/SearchField";
import peopleService from "./services/people";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [personFilter, setPersonFilter] = useState("");
  const [notificationInfo, setNotificationInfo] = useState(null);

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
      peopleService
        .update(existingPerson.id, updatedPerson)
        .then((data) => {
          createNotification(`Updated ${data.name}'s number to ${data.number}`);
          setPersons(
            persons.map((person) => {
              if (person.id === data.id) {
                return data;
              } else {
                return person;
              }
            })
          );
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            createNotification(
              `Information of ${newPerson.name} has already been removed from the server`,
              true
            );
          } else {
            createNotification(
              `Unknown error updating ${newPerson.name}`,
              true
            );
          }
        });
    } else {
      peopleService.create(newPerson).then((data) => {
        createNotification(`Added ${data.name}`);
        setPersons(persons.concat(data));
      });
    }
  };

  const onDeletePerson = (id) => {
    peopleService
      .remove(id)
      .then(() => {
        const deletedPerson = persons.find((person) => person.id === id);
        createNotification(`Deleted ${deletedPerson.name}`);
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          createNotification("User already deleted", true);
        } else {
          createNotification("Unknown error deleting user", true);
        }
      });
  };

  const createNotification = (message, isError = false) => {
    setNotificationInfo({ message, isError });
    setTimeout(() => {
      setNotificationInfo(null);
    }, 5000);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification {...notificationInfo} />
      <SearchField onSearchChange={onSearchChange} />
      <InputForm onNewPerson={onNewPerson} />
      <NumbersList persons={filteredPersons} onDelete={onDeletePerson} />
    </div>
  );
};

export default App;
