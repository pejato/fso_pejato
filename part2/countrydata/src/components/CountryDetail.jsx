import "../App.css";

const CountryDetail = ({ country }) => {
  return (
    <>
      <h2>{country.name.common}</h2>
      <div>Capital: {country.capital[0]}</div>
      <div>Currency: {Object.values(country.currencies)[0].name}</div>
      <h4>Languages</h4>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <h4>Flag</h4>
      <img src={country.flags.svg} className="country-flag-img" />
    </>
  );
};

export default CountryDetail;
