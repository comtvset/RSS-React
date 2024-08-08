import { Provider, useDispatch } from 'react-redux';
import { store } from '../store';
import React, { useEffect } from 'react';
import { Switch } from '../components/Switch/Switch';
import '../index.scss';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '../context/ThemeContext';
import Router from 'next/router';
import { setLoadingSlice } from '@/store/loadingSlice';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const start = () => {
      dispatch(setLoadingSlice(true));
    };
    const end = () => {
      dispatch(setLoadingSlice(false));
    };

    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, [dispatch]);

  return (
    <ThemeProvider>
      <Switch />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

function AppWrapper(props: AppProps) {
  return (
    <Provider store={store}>
      <MyApp {...props} />
    </Provider>
  );
}

export default AppWrapper;
