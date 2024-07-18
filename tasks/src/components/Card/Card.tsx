import React from 'react';
import style from 'src/components/Card/Card.module.scss';
import { Person } from 'src/pages/mainPage/MainPage';

interface CardProps {
  result: Person;
  setActiveCard: (card: Person | null) => void;
}

export const Card: React.FC<CardProps> = ({ result, setActiveCard }) => {
  const handleClick = () => {
    setActiveCard(result);
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
