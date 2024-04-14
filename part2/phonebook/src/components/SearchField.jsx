import { useState } from "react";

const SearchField = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const onChange = (event) => {
    setSearchTerm(event.target.value);
    onSearchChange(event.target.value);
  };

  return (
    <div>
      Search for a name: <input value={searchTerm} onChange={onChange} />
    </div>
  );
};

export default SearchField;
