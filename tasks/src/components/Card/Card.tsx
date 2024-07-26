import React, { useEffect, useState } from 'react';
import style from 'src/components/Card/Card.module.scss';
import { Person } from 'src/pages/mainPage/MainPage';
import { setActiveCard } from 'src/store/activeCardSlice.ts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/store';
import { useNavigate } from 'react-router-dom';
import { addCheckedCard, removeCheckedCard } from 'src/store/checkedCardSlice';

interface CardProps {
  result: Person;
}

export const Card: React.FC<CardProps> = ({ result }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [checked, setChecked] = useState(false);
  const checkedCard = useSelector((state: RootState) => state.checkedCard.checkedCard);

  useEffect(() => {
    const isCardChecked = checkedCard.some((card) => card.name === result.name);
    setChecked(isCardChecked);
  }, [checkedCard, result.name]);

  const handleClick = () => {
    const smt = dispatch(setActiveCard(result));
    if (smt) {
      navigate(`/details/${result.name}`);
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
      <div className={style.card} onClick={handleClick}>
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
