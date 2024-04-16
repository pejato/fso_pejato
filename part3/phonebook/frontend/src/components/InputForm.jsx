import { useState } from "react";

const InputForm = ({ onNewPerson }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const onNameChange = (event) => {
    setNewName(event.target.value);
  };
  const onNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    onNewPerson(newPerson);
    setNewName("");
    setNewNumber("");
  };

  return (
    <>
      <h2>Add someone new</h2>
      <form onSubmit={onFormSubmit}>
        <NameField value={newName} onChange={onNameChange} />
        <NumberField value={newNumber} onChange={onNumberChange} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

const NameField = ({ value, onChange }) => {
  return (
    <div>
      name: <input value={value} onChange={onChange} />
    </div>
  );
};

const NumberField = ({ value, onChange }) => {
  return (
    <div>
      number: <input value={value} onChange={onChange} />
    </div>
  );
};

export default InputForm;
