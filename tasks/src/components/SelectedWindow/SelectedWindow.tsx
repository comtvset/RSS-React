import { AppDispatch, getCheckedCard } from '../../store';
import style from './SelectedWindow.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { clearCheckedCard } from '../../store/checkedCardSlice';
import { convertToCSV } from '../../serveces/tools/convertToCSV';
import { useTheme } from '../../context/useTheme';
import { useEffect, useState } from 'react';

export const SelectedWindow = () => {
  const [csvUrl, setCsvUrl] = useState<string>('');
  const checkedCard = useSelector(getCheckedCard);
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
