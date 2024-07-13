import 'src/components/Pagination/Pagination.scss';
import { Person } from 'src/pages/MainPage/MainPage';
import { fetchData } from 'src/serveces/API/fetchData';
import { getPages } from 'src/serveces/tools/getPages';

interface PaginationProps {
  setResults: React.Dispatch<React.SetStateAction<Person[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  countPage: string[];
  setCountPage: React.Dispatch<React.SetStateAction<string[]>>;
  query: string;
  activePage: string;
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

export const Pagination: React.FC<PaginationProps> = ({
  setResults,
  setIsLoading,
  countPage,
  setCountPage,
  query,
  activePage,
  setActivePage,
}) => {
  const handleClick = async (page: string) => {
    setIsLoading(true);

    try {
      const data = await fetchData(query, page);
      localStorage.setItem('queryDataPage', JSON.stringify(page));
      setCountPage(getPages(data.count));
      setResults(data.results);
      setActivePage(page);
    } catch (error) {
      error;
    } finally {
      setIsLoading(false);
    }
  };

  const next = async (page: string) => {
    setIsLoading(true);
    const pageNumber = Number(page) + 1;

    if (countPage.length + 1 !== pageNumber) {
      try {
        const data = await fetchData(query, String(pageNumber));
        localStorage.setItem('queryDataPage', JSON.stringify(String(pageNumber)));
        setCountPage(getPages(data.count));
        setResults(data.results);
        setActivePage(String(pageNumber));
      } catch (error) {
        error;
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="pageContainer">
      <div
        className={`page ${Number(activePage) === 1 ? 'disabled' : ''}`}
        onClick={() => {
          if (Number(activePage) > 1) handleClick(String(Number(activePage) - 1));
        }}
      >
        {'<'}
      </div>
      {countPage.map((page, index) => (
        <div
          key={index}
          className={`page ${page === activePage ? 'pageActive' : ''}`}
          onClick={() => {
            handleClick(page);
          }}
        >
          {page}
        </div>
      ))}
      <div
        className={`page ${Number(activePage) === countPage.length ? 'disabled' : ''}`}
        onClick={() => {
          if (Number(activePage) < countPage.length) next(activePage);
        }}
      >
        {'>'}
      </div>
    </div>
  );
};
