import React from 'react';
import style from 'src/components/Card/Card.module.scss';
import { Person } from 'src/pages/mainPage/MainPage';
import { setActiveCard } from 'src/store/activeCardSlice.ts';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store';
import { useNavigate } from 'react-router-dom';

interface CardProps {
  result: Person;
}

export const Card: React.FC<CardProps> = ({ result }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleClick = () => {
    const smt = dispatch(setActiveCard(result));
    if (smt) {
      navigate(`/details/${result.name}`);
    }
  };

  return (
    <>
      <div className={style.card} onClick={handleClick}>
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
