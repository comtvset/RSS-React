import { useEffect } from 'react';
import { Card } from '../Card/Card.tsx';
import style from '../form/Forms.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, getLoading, getQuery } from '../../store';
import { Person } from '@/pages/main/index.tsx';
import { useRouter } from 'next/router';
import { Loading } from '../Loading/Loading.tsx';
import { setLoadingSlice } from '@/store/loadingSlice.ts';

interface ResultsProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activePage: string;
  results: Person[];
}

export const Results: React.FC<ResultsProps> = ({ isOpen, setIsOpen, activePage, results }) => {
  const query = useSelector(getQuery);
  const loading = useSelector(getLoading);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    if (results.length === 0) {
      dispatch(setLoadingSlice(true));
    } else {
      dispatch(setLoadingSlice(false));
    }
  }, [results, dispatch]);

  const handleClick = () => {
    setIsOpen(true);
    if (isOpen) {
      router.push(`/main?search=${query}&page=${activePage}`);
      setIsOpen(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className={style.title} onClick={handleClick}>
        <div className={style.cardsContainer}>
          {results === undefined || results.length === 0 ? (
            <p className={style.ups}>ups...</p>
          ) : (
            results.map((result: Person, index: number) => (
              <Card key={index} result={result} activePage={activePage} isOpen={isOpen} />
            ))
          )}
        </div>
      </div>
    </>
  );
};
