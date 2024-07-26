import { useEffect, useState } from 'react';

export const CustomHook = (): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [inputValue, setInputValue] = useState(() => {
    const savedQuery = localStorage.getItem('inputData');
    if (savedQuery) {
      try {
        const parsedValue = JSON.parse(savedQuery);
        return parsedValue.userQuery ?? '';
      } catch (error) {
        error;
      }
    }
    return '';
  });

  useEffect(() => {
    localStorage.setItem('inputData', JSON.stringify({ userQuery: inputValue }));
  }, [inputValue]);

  return [inputValue, setInputValue];
};
