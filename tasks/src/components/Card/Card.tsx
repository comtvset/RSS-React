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

export class Card extends React.Component<CardProps> {
  state = {};

  render() {
    const { result } = this.props;

    return (
      <>
        <div className="card">
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
  }
}
