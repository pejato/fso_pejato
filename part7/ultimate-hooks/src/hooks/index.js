import axios from 'axios';
import { useEffect, useState } from 'react';

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

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    if (!baseUrl) {
      return;
    }
    const fetch = async () => {
      // doesn't handle errors
      const response = await axios.get(baseUrl);
      setResources(response.data);
    };
    fetch();
  }, [baseUrl]);

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource);
    setResources([...resources, response.data]);
  };

  const service = {
    create,
  };

  return [resources, service];
};
