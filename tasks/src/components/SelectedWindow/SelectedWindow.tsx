import { AppDispatch, RootState } from 'src/store';
import style from './SelectedWindow.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { clearCheckedCard } from 'src/store/checkedCardSlice';
import { convertToCSV } from 'src/serveces/tools/convertToCSV';
import { downloadCSV } from 'src/serveces/tools/downloadCSV';
import { useTheme } from 'src/context/useTheme';

export const SelectedWindow = () => {
  const checkedCard = useSelector((state: RootState) => state.checkedCard.checkedCard);
  const dispatch = useDispatch<AppDispatch>();
  const { themeStyles } = useTheme();

  const unselect = () => {
    dispatch(clearCheckedCard());
  };

  const handleDownload = () => {
    const csv = convertToCSV(checkedCard);
    downloadCSV(csv, `${checkedCard.length}_items(StarWars).csv`);
  };

  return (
    <div className={`${style.selectedContainer} ${themeStyles.selectedContainer}`}>
      <p>{checkedCard.length} items are selected</p>
      <button className={themeStyles.btn} onClick={unselect}>
        Unselect all
      </button>
      <button className={themeStyles.btn} onClick={handleDownload}>
        Download
      </button>
    </div>
  );
};
