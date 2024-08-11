import { useEffect, useState } from 'react';

export const useCustomHook = (): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedQuery = localStorage.getItem('inputData');
      if (savedQuery) {
        try {
          const parsedValue = JSON.parse(savedQuery);
          setInputValue(parsedValue.userQuery ?? '');
        } catch (error) {
          error;
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('inputData', JSON.stringify({ userQuery: inputValue }));
    }
  }, [inputValue]);

  return [inputValue, setInputValue];
};
