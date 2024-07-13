import React, { useEffect } from 'react';
import { fetchData } from 'src/serveces/API/fetchData.ts';
import 'src/components/Form/Forms.scss';
import { Person } from 'src/pages/MainPage/MainPage.tsx';
import { getPages } from 'src/serveces/tools/getPages.ts';

interface FormProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  results: Person[];
  setResults: React.Dispatch<React.SetStateAction<Person[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setCountPage: React.Dispatch<React.SetStateAction<string[]>>;
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

export const Form: React.FC<FormProps> = ({
  query,
  setQuery,
  setResults,
  setIsLoading,
  setCountPage,
  setActivePage,
}) => {
  useEffect(() => {
    const runFirstFetch = async (query: string) => {
      setIsLoading(true);
      try {
        const data = await fetchData(query);
        setCountPage(getPages(data.count));
        setResults(data.results);
      } catch (error) {
        error;
      } finally {
        setIsLoading(false);
      }
    };

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
  }, [setIsLoading, setQuery, setResults, setCountPage]);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const searchData = { query };
    localStorage.setItem('queryData', JSON.stringify(searchData));
    setIsLoading(true);
    try {
      const data = await fetchData(query);
      setCountPage(getPages(data.count));
      setActivePage('1');
      localStorage.setItem('queryDataPage', JSON.stringify('1'));
      setResults(data.results);
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
    </>
  );
};
