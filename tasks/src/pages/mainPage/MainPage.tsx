import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ButtonError } from 'src/components/ButtonError/ButtonError.tsx';
import { ErrorBoundary } from 'src/components/ErrorBoundary/ErrorBoundary.tsx';
import { Form } from 'src/components/form/Form';
import { Loading } from 'src/components/Loading/Loading';
import { Pagination } from 'src/components/Pagination/Pagination.tsx';
import { Results } from 'src/components/Results/Results.tsx';
import style from 'src/pages/mainPage/MainPage.module.scss';
import { RootState } from 'src/store';
import { Outlet, useNavigate } from 'react-router-dom';
import { CustomHook } from 'src/hooks/myCustomHook';
import { setActiveCard } from 'src/store/activeCardSlice';

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
  const [activePage, setActivePage] = useState<string>('1');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [inputValue] = CustomHook();
  const activeCard = useSelector((state: RootState) => state.activeCard.activeCard);

  useEffect(() => {
    navigate(`/?search=${inputValue}&page=${activePage}`);
  }, [activePage, navigate, inputValue]);
  const setLoadingSlice = useSelector((state: RootState) => state.loading.loading);

  useEffect(() => {}, [setLoadingSlice]);

  return (
    <>
      <ErrorBoundary>
        <Form setActivePage={setActivePage} />
        <div className={style.infoContainer}>
          <div className={style.title}>
            <h2>Search Results:</h2>
            {setLoadingSlice ? (
              <Loading />
            ) : (
              <Results isOpen={isOpen} setIsOpen={setIsOpen} activePage={activePage} />
            )}
          </div>
          <Outlet context={{ setActiveCard, activeCard, setIsOpen, inputValue, activePage }} />
        </div>
        {setLoadingSlice ? (
          <span></span>
        ) : (
          <Pagination activePage={activePage} setActivePage={setActivePage} />
        )}

        <ButtonError customError="My custom Error" />
      </ErrorBoundary>
    </>
  );
};
