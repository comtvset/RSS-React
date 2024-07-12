import { Card } from '../Card/Card';

interface MyComponentProps {
  query: string;
  results: never[];
  isLoading: boolean;
}

export const Results: React.FC<MyComponentProps> = (props) => {
  return (
    <>
      <div className="title">
        <h2>Search Results:</h2>
        <div className="cards-container">
          {props.isLoading ? (
            <p className="loading">Loading...</p>
          ) : props.results.length === 0 ? (
            <p className="ups">ups...</p>
          ) : (
            props.results.map((result, index) => <Card key={index} result={result} />)
          )}
        </div>
      </div>
    </>
  );
};
