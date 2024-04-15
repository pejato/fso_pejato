const CountryList = ({ countries, onCountryClick }) => {
  if (countries.length === 0) {
    return <div>No matches found, specify another filter</div>;
  } else if (countries.length > 100) {
    return <div>Too many matches, specify another filter</div>;
  }
  return (
    <>
      {countries.map((country) => {
        return (
          <div key={country.name.common}>
            {country.name.common}{" "}
            <button onClick={() => onCountryClick(country.name.common)}>
              show
            </button>
          </div>
        );
      })}
    </>
  );
};

export default CountryList;
