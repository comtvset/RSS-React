import { AppDispatch, RootState } from 'src/store';
import style from './SelectedWindow.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { clearCheckedCard } from 'src/store/checkedCardSlice';
import { convertToCSV } from 'src/serveces/tools/convertToCSV';
import { useTheme } from 'src/context/useTheme';
import { useEffect, useState } from 'react';

export const SelectedWindow = () => {
  const [csvUrl, setCsvUrl] = useState<string>('');
  const checkedCard = useSelector((state: RootState) => state.checkedCard.checkedCard);
  const dispatch = useDispatch<AppDispatch>();
  const { themeStyles } = useTheme();

  useEffect(() => {
    if (checkedCard.length > 0) {
      const csvBlob = convertToCSV(checkedCard);
      const url = URL.createObjectURL(csvBlob);
      setCsvUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [checkedCard]);

  const unselect = () => {
    dispatch(clearCheckedCard());
  };

  return (
    <div className={`${style.selectedContainer} ${themeStyles.selectedContainer}`}>
      <p>{checkedCard.length} items are selected</p>
      <button className={themeStyles.btn} onClick={unselect}>
        Unselect all
      </button>
      <a
        className={style.link}
        href={csvUrl}
        download={`${checkedCard.length}_items(StarWars).csv`}
      >
        Download
      </a>
    </div>
  );
};
