import React, { useEffect, useState } from 'react';
import style from 'src/components/DetailWindow/DetailWindow.module.scss';
import { Person } from 'src/pages/mainPage/MainPage';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { AppDispatch, RootState, useLazyGetQueryQuery } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveCard } from 'src/store/activeCardSlice';

interface DetailContext {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activePage: string;
  inputValue: string;
}

export const DetailWindow: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { setIsOpen, activePage, inputValue } = useOutletContext<DetailContext>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const activeCard = useSelector((state: RootState) => state.activeCard.activeCard);

  const [trigger] = useLazyGetQueryQuery();
  useEffect(() => {
    const runFirstFetch = async () => {
      try {
        const data = await trigger({ userQuery: id, page: '1' }).unwrap();
        if (data?.results?.length > 0) {
          const card: Person = {
            name: data.results[0].name,
            birth_year: data.results[0].birth_year,
            eye_color: data.results[0].eye_color,
            films: data.results[0].films,
            height: data.results[0].height,
            homeworld: data.results[0].homeworld,
            hair_color: data.results[0].hair_color,
            gender: data.results[0].gender,
            mass: data.results[0].mass,
            url: data.results[0].url,
          };
          dispatch(setActiveCard(card));
        } else {
          setError('No data found.');
        }
      } catch (error) {
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      runFirstFetch();
    }
  }, [dispatch, id, trigger]);

  const handleClick = () => {
    dispatch(setActiveCard(null));
    navigate(`/?search=${inputValue}&page=${activePage}`);
    setIsOpen(false);
  };

  if (loading) {
    return <div className={style.loading}>Loading...</div>;
  }

  if (error) {
    return (
      <div className={style.error} data-testid="error-message">
        {error}
      </div>
    );
  }

  if (!activeCard) {
    return null;
  }

  return (
    <div className={style.bord}>
      <div className={style.detailContainer}>
        <span className={style.cross} onClick={handleClick}>
          ❌
        </span>
        <h3>{activeCard.name}</h3>
        <p>Birth year: {activeCard.birth_year}</p>
        <p>Eye color: {activeCard.eye_color}</p>
        <p>Height: {activeCard.height}cm</p>
        <p>Homeworld: {activeCard.homeworld}</p>
        <p>Hair color: {activeCard.hair_color}</p>
        <p>Gender: {activeCard.gender}</p>
        <p>Mass: {activeCard.mass}</p>
        <p>URL: {activeCard.url}</p>
      </div>
    </div>
  );
};
