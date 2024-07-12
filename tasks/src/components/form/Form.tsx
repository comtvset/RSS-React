import React, { useEffect, useState } from 'react';
import { fetchData } from 'src/serveces/API/fetchData.ts';
import 'src/components/Form/Forms.scss';
import { Results } from '../Results/Results';

interface Person {}

interface FormState {
  query: string;
  results: Person[];
  isLoading: boolean;
}

export const Form: React.FC<FormState> = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const runFirstFetch = async (query: string) => {
    setIsLoading(true);
    try {
      const request = await fetchData(query);
      setResults(request);
    } catch (error) {
      error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const savedQuery = localStorage.getItem('queryData');
    if (savedQuery) {
      try {
        const localStorageData = JSON.parse(savedQuery);
        if (localStorageData.query === '') {
          runFirstFetch('');
        } else {
          setQuery(localStorageData.query);
          runFirstFetch(localStorageData.query);
        }
      } catch (error) {
        error;
        runFirstFetch('');
      }
    } else {
      runFirstFetch('');
    }
  }, []);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const searchData = { query };
    localStorage.setItem('queryData', JSON.stringify(searchData));
    setIsLoading(true);
    try {
      const results = await fetchData(query);
      setResults(results);
    } catch (error) {
      error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = event.target.value.trim();
    setQuery(trimmedValue);
  };

  return (
    <>
      <form className="form-form" id="searchForm">
        <label htmlFor="search" />
        <input
          className="form-input"
          type="text"
          id="search"
          name="search"
          value={query}
          onChange={handleInputChange}
        />

        <button
          type="submit"
          onClick={(event) => {
            handleClick(event);
          }}
        >
          search
        </button>
      </form>
      <Results query={query} results={results} isLoading={isLoading} />
    </>
  );
};
