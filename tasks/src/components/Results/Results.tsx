import { Person } from 'src/pages/MainPage/MainPage';
import { Card } from '../Card/Card';

interface ResultsProps {
  query: string;
  results: Person[];
  isLoading: boolean;
}

export const Results: React.FC<ResultsProps> = ({ results, isLoading }) => {
  return (
    <>
      <div className="title">
        <h2>Search Results:</h2>
        <div className="cards-container">
          {isLoading ? (
            <p className="loading">Loading...</p>
          ) : results.length === 0 ? (
            <p className="ups">ups...</p>
          ) : (
            results.map((result, index) => <Card key={index} result={result} />)
          )}
        </div>
      </div>
    </>
  );
};
