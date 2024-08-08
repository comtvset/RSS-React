import { useDispatch } from 'react-redux';
import style from '../form/Forms.module.scss';
import { useCustomHook } from '../../hooks/myCustomHook';
import { AppDispatch } from '../../store';
import { setInputSlice } from '../../store/inputSlice';
import { setLoadingSlice } from '../../store/loadingSlice';
import { useTheme } from '../../context/useTheme';
import { useRouter } from 'next/router';
import { InitialData, Person } from '@/pages/main/index.tsx';
import { useEffect } from 'react';

export interface FormProps {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
  initialData: InitialData;

  setResults: React.Dispatch<React.SetStateAction<Person[]>>;
}

export const Form: React.FC<FormProps> = ({ setActivePage, initialData, setResults }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [inputValue, setInputValue] = useCustomHook();
  const { themeStyles } = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (router.query.search) {
      setInputValue(String(router.query.search));
    }
  }, [router.query.search, setInputValue]);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setActivePage('1');
    dispatch(setLoadingSlice(true));
    dispatch(setInputSlice(inputValue));

    try {
      router.push(`/main?search=${inputValue}&page=${'1'}`);
      setResults(initialData.results);
    } catch (error) {
      error;
    } finally {
      dispatch(setLoadingSlice(false));
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = event.target.value.trim();
    setInputValue(trimmedValue);
  };

  return (
    <form className={style.formForm} id="searchForm">
      <label htmlFor="search" />
      <input
        className={`${style.formInput} ${themeStyles.formInput}`}
        type="text"
        id="search"
        name="search"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button className={themeStyles.button} type="submit" onClick={handleClick}>
        Search
      </button>
    </form>
  );
};
