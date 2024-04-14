const NumbersList = ({ persons, onDelete }) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}{" "}
          <button
            onClick={() => {
              if (window.confirm(`Do you want to delete ${person.name}?`)) {
                onDelete(person.id);
              }
            }}
          >
            delete
          </button>
        </div>
      ))}
    </>
  );
};

export default NumbersList;
