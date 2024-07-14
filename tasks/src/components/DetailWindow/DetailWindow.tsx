import React, { useEffect, useState } from 'react';
import 'src/components/DetailWindow/DetailWindow.scss';
import { Person } from 'src/pages/mainPage/MainPage';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { fetchData } from 'src/serveces/API/fetchData.ts';

interface DetailContext {
  setActiveCard: (card: Person | null) => void;
  activeCard: Person | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activePage: string;
  query: string;
}

export const DetailWindow: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { setActiveCard, activeCard, setIsOpen, activePage, query } =
    useOutletContext<DetailContext>();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const runFirstFetch = async () => {
      try {
        const data = await fetchData(id);
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
        setActiveCard(card);
        setLoading(false);
      } catch (error) {
        error;
        setLoading(false);
      }
    };

    runFirstFetch();
  }, [id, setActiveCard]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!activeCard) {
    return null;
  }

  const handleClick = () => {
    setActiveCard(null);
    navigate(`/?search=${query}&page=${activePage}`);
    setIsOpen(false);
  };

  return (
    <div className="bord">
      <div className="detailContainer">
        <span className="cross" onClick={handleClick}>
          ❌
        </span>
        <h3>{activeCard.name}</h3>
        <p>{`Birth year: ${activeCard.birth_year}`}</p>
        <p>{`Eye color: ${activeCard.eye_color}`}</p>
        <p>{`Height: ${activeCard.height}cm`}</p>
        <p>{`Homeworld: ${activeCard.homeworld}`}</p>
        <p>{`Hair color: ${activeCard.hair_color}`}</p>
        <p>{`Gender: ${activeCard.gender}`}</p>
        <p>{`Mass: ${activeCard.mass}`}</p>
        <p>{`Url: ${activeCard.url}`}</p>
      </div>
    </div>
  );
};
