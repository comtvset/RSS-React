import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from 'src/components/Pagination/Pagination.module.scss';
import { CustomHook } from 'src/hooks/myCustomHook';
import { getPages } from 'src/serveces/tools/getPages.ts';
import { AppDispatch, RootState, useGetQueryQuery, useLazyGetQueryQuery } from 'src/store';
import { setResultSlice } from 'src/store/resultSlice';
import { setCountSlice } from 'src/store/countSlice';
import { setLoadingSlice } from 'src/store/loadingSlice';
import { useTheme } from 'src/context/useTheme';

interface PaginationProps {
  activePage: string;
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

export const Pagination: React.FC<PaginationProps> = ({ activePage, setActivePage }) => {
  const [inputValue, setInputValue] = CustomHook();
  const userQuery = inputValue;
  const currentUserQuery = useSelector((state: RootState) => state.input.input);
  const countPage = useSelector((state: RootState) => state.count.count);

  const dispatch = useDispatch<AppDispatch>();
  const [trigger] = useLazyGetQueryQuery();
  const { data } = useGetQueryQuery({ userQuery, page: activePage });
  const { themeStyles } = useTheme();

  useEffect(() => {
    if (data) {
      const pages = getPages(data.count);
      dispatch(setCountSlice(pages));
      dispatch(setResultSlice(data.results));
    }
  }, [data, dispatch]);

  const handleClick = async (page: string) => {
    dispatch(setLoadingSlice(true));
    try {
      const response = await trigger({ userQuery: currentUserQuery, page }).unwrap();
      localStorage.setItem('pageData', JSON.stringify(page));
      dispatch(setResultSlice(response.results));
      const pages = getPages(response.count);
      dispatch(setCountSlice(pages));
      setActivePage(page);
      setInputValue(currentUserQuery);
    } catch (error) {
      error;
    } finally {
      dispatch(setLoadingSlice(false));
    }
  };

  const next = async (page: string) => {
    dispatch(setLoadingSlice(true));
    const pageNumber = Number(page) + 1;
    if (countPage.length + 1 !== pageNumber) {
      try {
        const pageStr = pageNumber.toString();
        const response = await trigger({ userQuery: currentUserQuery, page: pageStr }).unwrap();
        localStorage.setItem('pageData', JSON.stringify(pageStr));
        dispatch(setResultSlice(response.results));
        const pages = getPages(response.count);
        dispatch(setCountSlice(pages));
        setActivePage(String(pageNumber));
        setInputValue(currentUserQuery);
      } catch (error) {
        error;
      } finally {
        dispatch(setLoadingSlice(false));
      }
    }
  };

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
