import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query.search || '';
  const activePage = context.query.page || '1';
  const cardName = context.query.cardName || '';

  const response = await fetch(`https://swapi.dev/api/people/?search=${query}&page=${activePage}`);
  const data = await response.json();

  let activeCard = null;
  if (cardName) {
    const cardResponse = await fetch(
      `https://swapi.dev/api/people/?search=${query}&page=${activePage}&${cardName}`,
    );
    const cardData = await cardResponse.json();
    if (cardData.results.length > 0) {
      activeCard = cardData.results[0];
    }
  }

  return {
    props: {
      initialData: data || {},
      initialActiveCard: activeCard,
    },
  };
};
