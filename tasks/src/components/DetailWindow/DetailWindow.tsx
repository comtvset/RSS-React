import style from './DetailWindow.module.scss';
import { AppDispatch, getActiveCard, getLoading, getQuery } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@/context/useTheme';
import { useRouter } from 'next/router';
import { Loading } from '@/components/Loading/Loading';
import { setActiveCard } from '@/store/activeCardSlice';

interface DetailContext {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activePage: string;
  inputValue: string;
}

export const DetailWindow: React.FC<DetailContext> = ({ setIsOpen, activePage }) => {
  const { themeStyles } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const activeCard = useSelector(getActiveCard);
  const query = useSelector(getQuery);
  const router = useRouter();
  const loading = useSelector(getLoading);

  const handleClick = () => {
    dispatch(setActiveCard(null));
    router.push(`/main?search=${query}&page=${activePage}`);
    setIsOpen(false);
  };

  if (loading) {
    return <Loading />;
  }

  if (!activeCard) {
    return null;
  }

  return (
    <>
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
    </>
  );
};
