import React, { useEffect } from 'react';
import { Person } from 'src/pages/mainPage/MainPage.tsx';
import { Card } from '../Card/Card.tsx';
import { useNavigate } from 'react-router-dom';
import style from 'src/components/form/Forms.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, useGetQueryQuery } from 'src/store';
import { setResultSlice } from 'src/store/resultSlice.ts';
import { CustomHook } from 'src/hooks/myCustomHook.ts';
import { Loading } from '../Loading/Loading.tsx';

interface ResultsProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activePage: string;
}

export const Results: React.FC<ResultsProps> = ({ isOpen, setIsOpen, activePage }) => {
  const query = useSelector((state: RootState) => state.input.input);
  const queryResult = useSelector((state: RootState) => state.result.result);

  const [inputValue] = CustomHook();
  const userQuery = inputValue;
  const page = '1';
  const { data, isLoading } = useGetQueryQuery({ userQuery, page });
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (data && data.results) {
      dispatch(setResultSlice(data.results));
    }
  }, [data, dispatch]);

  const navigate = useNavigate();

  const handleClick = () => {
    setIsOpen(true);
    if (isOpen) {
      navigate(`/?search=${query}&page=${activePage}`);
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className={style.title} onClick={handleClick}>
        <div className={style.cardsContainer}>
          {isLoading ? (
            <Loading />
          ) : queryResult.length === 0 ? (
            <p className={style.ups}>ups...</p>
          ) : (
            queryResult.map((result: Person, index: number) => <Card key={index} result={result} />)
          )}
        </div>
      </div>
    </>
  );
};
