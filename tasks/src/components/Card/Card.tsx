import React from 'react';
import 'src/components/Card/Card.scss';

interface CardProps {
  result: {
    birth_year: string;
    eye_color: string;
    films: string[];
    name: string;
    height: string;
    hair_color: string;
    gender: string;
    mass: string;
  };
}

export const Card: React.FC<CardProps> = (props) => {
  return (
    <>
      <div className="card">
        <h3>{props.result.name}</h3>
        <p>{`Birth year: ${props.result.birth_year}`}</p>
        <p>{`Eye color: ${props.result.eye_color}`}</p>
        <p>{`Height: ${props.result.height}cm`}</p>
        <p>{`Hair color: ${props.result.hair_color}`}</p>
        <p>{`Gender: ${props.result.gender}`}</p>
        <p>{`Mass: ${props.result.mass}`}</p>
      </div>
    </>
  );
};
