import React from 'react';

const UseLocalStorage = (defaultValue, key) => {
  const [value, setValue] = React.useState(() => {
    const storedValue = window.localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  });
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};

export default UseLocalStorage;
