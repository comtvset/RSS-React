import React, { useEffect } from 'react';
import style from 'src/components/DetailWindow/DetailWindow.module.scss';
import { Person } from 'src/pages/mainPage/MainPage';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { AppDispatch, RootState, useGetQueryQuery } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveCard } from 'src/store/activeCardSlice';
import { useTheme } from 'src/context/useTheme';
import { Loading } from '../Loading/Loading';

interface DetailContext {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activePage: string;
  inputValue: string;
}

export const DetailWindow: React.FC = () => {
  const { themeStyles } = useTheme();
  const { id } = useParams<{ id: string }>();
  const { setIsOpen, activePage, inputValue } = useOutletContext<DetailContext>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const activeCard = useSelector((state: RootState) => state.activeCard.activeCard);

  const { data, isFetching, isError } = useGetQueryQuery(
    { userQuery: id, page: '1' },
    {
      skip: !id,
    },
  );

  useEffect(() => {
    if (data && data.results.length > 0) {
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
    }
  }, [data, dispatch]);

  const handleClick = () => {
    dispatch(setActiveCard(null));
    navigate(`/?search=${inputValue}&page=${activePage}`);
    setIsOpen(false);
  };

  if (isFetching) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className={style.error} data-testid="error-message">
        Failed to fetch data. Please try again later.
      </div>
    );
  }

  if (!activeCard) {
    return null;
  }

  return (
    <div className={style.bord}>
      <div className={`${style.detailContainer} ${themeStyles.detailContainer}`}>
        <span className={style.cross} onClick={handleClick}>
          ❌
        </span>
        <h3 className={`${style.title} ${themeStyles.title}`}>{activeCard.name}</h3>
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
