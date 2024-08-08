import { useEffect, useState } from 'react';
import style from '../Card/Card.module.scss';
import { setActiveCard } from '../../store/activeCardSlice.ts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, getCheckedCard, getQuery } from '../../store';
import { addCheckedCard, removeCheckedCard } from '../../store/checkedCardSlice';
import { useTheme } from '../../context/useTheme';
import { Person } from '@/pages/main/index.tsx';
import router from 'next/router';

interface CardProps {
  result: Person;
  activePage: string;
  isOpen: boolean;
}

export const Card: React.FC<CardProps> = ({ result, activePage, isOpen }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [checked, setChecked] = useState(false);
  const checkedCard = useSelector(getCheckedCard);
  const { themeStyles } = useTheme();
  const query = useSelector(getQuery);

  useEffect(() => {
    const isCardChecked = checkedCard.some((card) => card.name === result.name);
    setChecked(isCardChecked);
  }, [checkedCard, result.name]);

  const handleClick = () => {
    const smt = dispatch(setActiveCard(result));
    if (!isOpen && smt) {
      router.push(`/main?search=${query}&page=${activePage}&${result.name}`);
    } else if (!smt) {
      router.push(`/main?search=${query}&page=${activePage}`);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    if (e.target.checked) {
      dispatch(addCheckedCard(result));
    } else {
      dispatch(removeCheckedCard(result));
    }
  };

  return (
    <>
      <div className={`${style.card} ${themeStyles.card}`} onClick={handleClick}>
        <div className={style.checkboxContainer}>
          <input
            className={style.checkbox}
            type="checkbox"
            checked={checked}
            onChange={handleCheckboxChange}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        <h3>{result.name}</h3>
        <p>{`Birth year: ${result.birth_year}`}</p>
        <p>{`Eye color: ${result.eye_color}`}</p>
        <p>{`Height: ${result.height}cm`}</p>
        <p>{`Hair color: ${result.hair_color}`}</p>
        <p>{`Gender: ${result.gender}`}</p>
        <p>{`Mass: ${result.mass}`}</p>
      </div>
    </>
  );
};
