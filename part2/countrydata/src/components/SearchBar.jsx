const SearchBar = ({ searchTerm, onSearchTermChange }) => {
  return (
    <div>
      Find countries <input value={searchTerm} onChange={onSearchTermChange} />
    </div>
  );
};

export default SearchBar;
