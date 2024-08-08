import Main, { HomePageProps } from './main';
import { useEffect } from 'react';
import router from 'next/router';
import { getServerSideProps } from '@/serveces/API/getServerSideProps';

const HomePage = ({ initialData }: HomePageProps) => {
  useEffect(() => {
    router.push('main/?search=&page=1');
  }, []);

  if (!initialData || !initialData.results) {
    return <div>No data available</div>;
  }

  return <Main initialData={initialData} />;
};

export default HomePage;
export { getServerSideProps };
