import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import style from 'src/components/form/Forms.module.scss';
import { CustomHook } from 'src/hooks/myCustomHook';
import { getPages } from 'src/serveces/tools/getPages.ts';
import { useLazyGetQueryQuery } from 'src/store';
import { AppDispatch } from 'src/store';
import { setInputSlice } from 'src/store/inputSlice';
import { setLoadingSlice } from 'src/store/loadingSlice';
import { setResultSlice } from 'src/store/resultSlice';
import { setCountSlice } from 'src/store/countSlice';
import { useTheme } from 'src/context/useTheme';

export interface FormProps {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

export const Form: React.FC<FormProps> = ({ setActivePage }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [trigger] = useLazyGetQueryQuery();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = CustomHook();
  const { themeStyles } = useTheme();

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setActivePage('1');
    dispatch(setLoadingSlice(true));
    dispatch(setInputSlice(inputValue));

    try {
      const response = await trigger({ userQuery: inputValue, page: '1' }).unwrap();
      navigate(`/?search=${inputValue}&page=${'1'}`);
      dispatch(setResultSlice(response.results));
      const pages = getPages(response.count);
      dispatch(setCountSlice(pages));
      localStorage.setItem('pageData', JSON.stringify('1'));
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
