import React, { useEffect, useState } from 'react';
import { ButtonError } from 'src/components/ButtonError/ButtonError.tsx';
import { ErrorBoundary } from 'src/components/ErrorBoundary/ErrorBoundary.tsx';
import { Form } from 'src/components/form/Form';
import { Pagination } from 'src/components/Pagination/Pagination.tsx';
import { Results } from 'src/components/Results/Results.tsx';
import 'src/pages/mainPage/MainPage.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import { CustomHook } from 'src/components/myCustomHook/myCustomHook';

export interface Person {
  birth_year: string;
  eye_color: string;
  films: string[];
  name: string;
  height: string;
  hair_color: string;
  homeworld: string;
  gender: string;
  mass: string;
  url: string;
}

export const Main: React.FC = () => {
  const [results, setResults] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [countPage, setCountPage] = useState<string[]>([]);
  const [activePage, setActivePage] = useState<string>('1');
  const [activeCard, setActiveCard] = useState<Person | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const [query, setQuery] = CustomHook();

  useEffect(() => {
    navigate(`/?search=${query}&page=${activePage}`);
  }, [activePage, navigate, query]);

  const handleCardClick = (card: Person) => {
    if (card) {
      setActiveCard(card);
      navigate(`/details/${card.name}`);
    }
  };

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
        <div className="infoContainer">
          <Results
            query={query}
            results={results}
            isLoading={isLoading}
            setActiveCard={handleCardClick}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            activePage={activePage}
          />
          <Outlet context={{ setActiveCard, activeCard, setIsOpen, query, activePage }} />
        </div>
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
