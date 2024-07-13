import React, { useState } from 'react';
import { ButtonError } from 'src/components/ButtonError/ButtonError';
import { ErrorBoundary } from 'src/components/ErrorBoundary/ErrorBoundary';
import { Form } from 'src/components/Form/Form';
import { Pagination } from 'src/components/Pagination/Pagination';
import { Results } from 'src/components/Results/Results';

export interface Person {
  birth_year: string;
  eye_color: string;
  films: string[];
  name: string;
  height: string;
  hair_color: string;
  gender: string;
  mass: string;
}

export const Main: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [countPage, setCountPage] = useState<string[]>([]);
  const [activePage, setActivePage] = useState<string>('1');

  return (
    <>
      <ErrorBoundary>
        <Form
          query={query}
          setQuery={setQuery}
          results={results}
          setResults={setResults}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setCountPage={setCountPage}
          setActivePage={setActivePage}
        />
        <Results query={query} results={results} isLoading={isLoading} />
        <Pagination
          setResults={setResults}
          setIsLoading={setIsLoading}
          countPage={countPage}
          setCountPage={setCountPage}
          query={query}
          activePage={activePage}
          setActivePage={setActivePage}
        />
        <ButtonError cusomError="My custom Error" />
      </ErrorBoundary>
    </>
  );
};
