import { expect, test } from 'vitest';
import { convertToCSV } from 'src/serveces/tools/convertToCSV';
import { PersonAllFields } from 'src/pages/mainPage/MainPage';

const sampleData: PersonAllFields[] = [
  {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    homeworld: 'https://swapi.dev/api/planets/1/',
    films: ['film1', 'film2'],
    species: ['species1'],
    vehicles: ['vehicle1'],
    starships: ['starship1'],
    created: '2020-01-01T00:00:00.000Z',
    edited: '2020-01-01T00:00:00.000Z',
    url: 'https://swapi.dev/api/people/1/',
  },
  {
    name: 'Darth Vader',
    height: '202',
    mass: '136',
    hair_color: 'none',
    skin_color: 'white',
    eye_color: 'yellow',
    birth_year: '41.9BBY',
    gender: 'male',
    homeworld: 'https://swapi.dev/api/planets/1/',
    films: ['film1', 'film2'],
    species: ['species1'],
    vehicles: ['vehicle1'],
    starships: ['starship1'],
    created: '2020-01-01T00:00:00.000Z',
    edited: '2020-01-01T00:00:00.000Z',
    url: 'https://swapi.dev/api/people/4/',
  },
];

test('convertToCSV should convert array of Person objects to CSV format', () => {
  const csv = convertToCSV(sampleData);
  const expectedCsv =
    `name, height, mass, hair_color, skin_color, eye_color, birth_year, gender, homeworld, films, species, vehicles, starships, created, edited, url\n` +
    `"Luke Skywalker", "172", "77", "blond", "fair", "blue", "19BBY", "male", "https://swapi.dev/api/planets/1/", "film1,film2", "species1", "vehicle1", "starship1", "2020-01-01T00:00:00.000Z", "2020-01-01T00:00:00.000Z", "https://swapi.dev/api/people/1/"\n` +
    `"Darth Vader", "202", "136", "none", "white", "yellow", "41.9BBY", "male", "https://swapi.dev/api/planets/1/", "film1,film2", "species1", "vehicle1", "starship1", "2020-01-01T00:00:00.000Z", "2020-01-01T00:00:00.000Z", "https://swapi.dev/api/people/4/"`;

  expect(csv).toEqual(expectedCsv);
});

test('convertToCSV should return an empty string for an empty array', () => {
  const csv = convertToCSV([]);
  expect(csv).toEqual('');
});
