import { Person } from 'src/pages/mainPage/MainPage.tsx';
import { Card } from '../Card/Card.tsx';
import { useNavigate } from 'react-router-dom';

interface ResultsProps {
  query: string;
  results: Person[];
  isLoading: boolean;
  setActiveCard: (card: Person) => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activePage: string;
}

export const Results: React.FC<ResultsProps> = ({
  results,
  isLoading,
  setActiveCard,
  isOpen,
  setIsOpen,
  query,
  activePage,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    setIsOpen(true);
    if (isOpen) {
      navigate(`/?search=${query}&page=${activePage}`);

      setIsOpen(false);
    }
  };
  return (
    <>
      <div className="title" onClick={handleClick}>
        <h2>Search Results:</h2>
        <div className="cards-container">
          {isLoading ? (
            <p className="loading">Loading...</p>
          ) : results.length === 0 ? (
            <p className="ups">ups...</p>
          ) : (
            results.map((result, index) => (
              <Card key={index} result={result} setActiveCard={() => setActiveCard(result)} />
            ))
          )}
        </div>
      </div>
    </>
  );
};
