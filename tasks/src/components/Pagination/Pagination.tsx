import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from '../Pagination/Pagination.module.scss';
import { getPages } from '../../serveces/tools/getPages.ts';
import { AppDispatch, getCountPage, getLoading } from '../../store';
import { setCountSlice } from '../../store/countSlice';
import { useTheme } from '../../context/useTheme';
import { InitialData, Person } from '@/pages/main/index.tsx';
import { useRouter } from 'next/router';
import { setLoadingSlice } from '@/store/loadingSlice.ts';

interface PaginationProps {
  activePage: string;
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
  initialData: InitialData;
  results: Person[];
  setResults: React.Dispatch<React.SetStateAction<Person[]>>;
}

export const Pagination: React.FC<PaginationProps> = ({
  activePage,
  setActivePage,
  setResults,
  initialData,
}) => {
  const router = useRouter();
  const countPage = useSelector(getCountPage);
  const loading = useSelector(getLoading);
  const dispatch = useDispatch<AppDispatch>();
  const { themeStyles } = useTheme();

  useEffect(() => {
    if (router.query.page) {
      setActivePage(String(router.query.page));
    }
  }, [router.query.page, setActivePage]);

  useEffect(() => {
    if (initialData) {
      const pages = getPages(initialData.count);
      dispatch(setCountSlice(pages));
      setResults(initialData.results);
      dispatch(setLoadingSlice(false));
    }
  }, [initialData, dispatch, setResults]);

  const handleClick = (page: string) => {
    setActivePage(page);
    router.push(`/main?search=${router.query.search || ''}&page=${page}`);
  };

  const next = (page: string) => {
    const pageNumber = Number(page) + 1;
    if (countPage.length + 1 !== pageNumber) {
      setActivePage(pageNumber.toString());
      router.push(`/main?search=${router.query.search || ''}&page=${pageNumber}`);
    }
  };

  if (loading) return <></>;

  return (
    <>
      <div className={style.pageContainer}>
        <div
          className={`${style.page} ${themeStyles.page} ${Number(activePage) === 1 ? style.disabled : ''}`}
          onClick={() => {
            if (Number(activePage) > 1) handleClick(String(Number(activePage) - 1));
          }}
        >
          {'<'}
        </div>
        {countPage.map((page, index) => (
          <div
            key={index}
            className={`${style.page} ${themeStyles.page} ${page === activePage ? style.pageActive : ''}`}
            onClick={() => {
              handleClick(page);
            }}
          >
            {page}
          </div>
        ))}
        <div
          className={`${style.page} ${themeStyles.page} ${Number(activePage) === countPage.length ? style.disabled : ''}`}
          onClick={() => {
            if (Number(activePage) < countPage.length) next(activePage);
          }}
        >
          {'>'}
        </div>
      </div>
    </>
  );
};
