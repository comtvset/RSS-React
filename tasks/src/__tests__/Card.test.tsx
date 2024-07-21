import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from 'src/components/Card/Card';
import '@testing-library/jest-dom';

const result = {
  birth_year: '19BBY',
  eye_color: 'blue',
  films: ['A New Hope', 'The Empire Strikes Back'],
  name: 'Luke Skywalker',
  height: '172',
  hair_color: 'blond',
  homeworld: 'Tatooine',
  gender: 'male',
  mass: '77',
  url: 'https://swapi.dev/api/people/1/',
};

describe('Card', () => {
  it('should render card with correct data', () => {
    render(<Card result={result} setActiveCard={() => result} />);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText(/Birth year: 19BBY/i)).toBeInTheDocument();
    expect(screen.getByText(/Eye color: blue/i)).toBeInTheDocument();
    expect(screen.getByText(/Height: 172cm/i)).toBeInTheDocument();
    expect(screen.getByText(/Hair color: blond/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender: male/i)).toBeInTheDocument();
    expect(screen.getByText(/Mass: 77/i)).toBeInTheDocument();
  });
});
