import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary.tsx';
import { Form } from '@/components/form/Form.tsx';
import { Loading } from '@/components/Loading/Loading.tsx';
import { Pagination } from '@/components/Pagination/Pagination.tsx';
import { Results } from '@/components/Results/Results.tsx';
import style from './MainPage.module.scss';
import themeStyle from '@/theme/themeStyle.module.scss';
import { getCheckedCard, getLoading } from '@/store/index.ts';
import { useCustomHook } from '@/hooks/myCustomHook.ts';
import { SelectedWindow } from '@/components/SelectedWindow/SelectedWindow.tsx';
import { useTheme } from '@/context/useTheme';
import { ButtonError } from '@/components/ButtonError/ButtonError.tsx';
import { DetailWindow } from '@/components/DetailWindow/DetailWindow';
import { getServerSideProps } from '@/serveces/API/getServerSideProps';
import { useRouter } from 'next/router';
import { setActiveCard } from '@/store/activeCardSlice';
import NotFound from '../404';

export interface Person {
  birth_year: string;
  eye_color: string;
  films: string[];
  name: string;
  height: string;
  hair_color: string;
  homeworld: string;
  gender: string;
  mass: string;
  url: string;
}

export interface PersonAllFields extends Person {
  skin_color: string;
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
}

export interface InitialData {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
}

export interface HomePageProps {
  initialData: InitialData;
}

const Main: React.FC<HomePageProps> = ({ initialData }) => {
  const [results, setResults] = useState<Person[]>(initialData.results);
  const [activePage, setActivePage] = useState<string>('1');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue] = useCustomHook();
  const { theme } = useTheme();
  const checkedCard = useSelector(getCheckedCard);
  const router = useRouter();
  const isCheckedCard = checkedCard.length;
  const loading = useSelector(getLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    const query = router.query;
    const name = Object.keys(query).find((key) => key !== 'search' && key !== 'page');

    if (name) {
      const activeCard = results.find((result) => result.name === name);
      if (activeCard) {
        dispatch(setActiveCard(activeCard));
        setIsOpen(true);
      }
    } else {
      dispatch(setActiveCard(null));
    }

    setActivePage(String(query.page) || '1');
  }, [router.query, results, dispatch]);

  if (!initialData || !initialData.results) {
    return <NotFound />;
  }

  if (initialData.count < 0) {
    return <NotFound />;
  }

  return (
    <>
      <ErrorBoundary>
        <Form setActivePage={setActivePage} initialData={initialData} setResults={setResults} />
        <div className={style.infoContainer}>
          <div className={`${themeStyle[theme]}`}>
            <h2>Search Results:</h2>
            {loading ? (
              <Loading />
            ) : initialData.count === 0 ? (
              <p>Search returned no results. Try again</p>
            ) : (
              <Results
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                activePage={activePage}
                results={results}
              />
            )}
          </div>
          {isOpen && (
            <DetailWindow setIsOpen={setIsOpen} activePage={activePage} inputValue={inputValue} />
          )}
        </div>
        {loading ? (
          <span></span>
        ) : (
          <Pagination
            activePage={activePage}
            setActivePage={setActivePage}
            initialData={initialData}
            results={results}
            setResults={setResults}
          />
        )}

        <ButtonError customError="My custom Error" />

        {isCheckedCard ? <SelectedWindow /> : <></>}
      </ErrorBoundary>
    </>
  );
};

export default Main;
export { getServerSideProps };
