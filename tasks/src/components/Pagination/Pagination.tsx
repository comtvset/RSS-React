import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from 'src/components/Pagination/Pagination.module.scss';
import { getPages } from 'src/serveces/tools/getPages.ts';
import { AppDispatch, getCountPage, getQuery, useGetQueryQuery } from 'src/store';
import { setResultSlice } from 'src/store/resultSlice';
import { setCountSlice } from 'src/store/countSlice';
import { useTheme } from 'src/context/useTheme';

interface PaginationProps {
  activePage: string;
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

export const Pagination: React.FC<PaginationProps> = ({ activePage, setActivePage }) => {
  const currentUserQuery = useSelector(getQuery);
  const countPage = useSelector(getCountPage);

  const dispatch = useDispatch<AppDispatch>();
  const { data, isFetching } = useGetQueryQuery({ userQuery: currentUserQuery, page: activePage });
  const { themeStyles } = useTheme();

  useEffect(() => {
    if (data && !isFetching) {
      const pages = getPages(data.count);
      dispatch(setCountSlice(pages));
      dispatch(setResultSlice(data.results));
    }
  }, [data, dispatch, isFetching]);

  const handleClick = (page: string) => {
    setActivePage(page);
  };

  const next = (page: string) => {
    const pageNumber = Number(page) + 1;
    if (countPage.length + 1 !== pageNumber) {
      setActivePage(pageNumber.toString());
    }
  };

  if (isFetching) return <></>;

  return (
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
  );
};
