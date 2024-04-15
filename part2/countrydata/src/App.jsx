import { useState, useEffect } from "react";
import "./App.css";
import countryService from "./services/countryData";
import CountryList from "./components/CountryList";
import CountryDetail from "./components/CountryDetail";
import SearchBar from "./components/SearchBar";
import ErrorNotification from "./components/ErrorNotification";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState(null);
  const [errorText, setErrorText] = useState(null);

  useEffect(() => {
    countryService
      .getAll()
      .then((data) => setCountries(data))
      .catch(() => {
        setErrorText("Failed fetching countries");
        setTimeout(() => {
          setErrorText(null), 5000;
        });
      });
  }, []);

  if (countries === null) {
    return null;
  }

  const filteredCountries = countries.filter((country) => {
    return country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const onSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const onCountryClick = (countryName) => {
    setSearchTerm(countryName);
  };

  let countryComponent;
  if (filteredCountries.length === 1) {
    countryComponent = <CountryDetail country={filteredCountries[0]} />;
  } else {
    countryComponent = (
      <CountryList
        countries={filteredCountries}
        onCountryClick={onCountryClick}
      />
    );
  }

  return (
    <>
      <ErrorNotification message={errorText} />
      <SearchBar
        searchTerm={searchTerm}
        onSearchTermChange={onSearchTermChange}
      />
      {countryComponent}
    </>
  );
};

export default App;
