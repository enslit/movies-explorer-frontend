import { useEffect, useState } from 'react';

const PREFIX = 'movies-explorer-';

function useLocalStorage<T>(key: string, initialValue: T) {
  const prefixedKey = PREFIX + key;
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(prefixedKey);

    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof initialValue === 'function') {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue] as const;
}

export default useLocalStorage;
