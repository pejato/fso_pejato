import axios from 'axios';
import { useEffect, useState } from 'react';

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`,
        );
        setCountry({
          data: {
            name: response.data.name.common,
            population: response.data.population,
            capital: response.data.capital[0],
            flag: response.data.flags.svg,
          },
          found: true,
        });
      } catch (error) {
        setCountry({ found: false });
      }
    };
    if (name) {
      fetch();
    }
  }, [name]);

  return country;
};
export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};
