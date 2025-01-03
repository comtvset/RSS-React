import { useEffect } from 'react';
import { Person } from 'src/pages/mainPage/MainPage.tsx';
import { Card } from '../Card/Card.tsx';
import { useNavigate } from 'react-router-dom';
import style from 'src/components/form/Forms.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, getQuery, getResult, useGetQueryQuery } from 'src/store';
import { setResultSlice } from 'src/store/resultSlice.ts';
import { Loading } from '../Loading/Loading.tsx';

interface ResultsProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activePage: string;
}

export const Results: React.FC<ResultsProps> = ({ isOpen, setIsOpen, activePage }) => {
  const query = useSelector(getQuery);
  const queryResult = useSelector(getResult);
  const dispatch = useDispatch<AppDispatch>();

  const { data, isFetching } = useGetQueryQuery({ userQuery: query, page: activePage });

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

  if (isFetching) {
    return <Loading />;
  }

  return (
    <>
      <div className={style.title} onClick={handleClick}>
        <div className={style.cardsContainer}>
          {queryResult.length === 0 ? (
            <p className={style.ups}>ups...</p>
          ) : (
            queryResult.map((result: Person, index: number) => <Card key={index} result={result} />)
          )}
        </div>
      </div>
    </>
  );
};
