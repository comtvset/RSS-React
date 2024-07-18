import { useEffect, useState } from 'react';

export const CustomHook = (): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [inputValue, setInputValue] = useState(() => {
    const savedQuery = localStorage.getItem('queryData');
    if (savedQuery) {
      try {
        const parsedValue = JSON.parse(savedQuery);
        return parsedValue.query ?? '';
      } catch (error) {
        error;
      }
    }
    return '';
  });

  useEffect(() => {
    localStorage.setItem('queryData', JSON.stringify({ query: inputValue }));
  }, [inputValue]);

  return [inputValue, setInputValue];
};
