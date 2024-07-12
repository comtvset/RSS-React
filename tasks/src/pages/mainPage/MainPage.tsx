import React, { useState } from 'react';
import { ButtonError } from 'src/components/ButtonError/ButtonError';
import { ErrorBoundary } from 'src/components/ErrorBoundary/ErrorBoundary';
import { Form } from 'src/components/Form/Form';
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
        />
        <Results query={query} results={results} isLoading={isLoading} />
        <ButtonError cusomError="My custom Error" />
      </ErrorBoundary>
    </>
  );
};
