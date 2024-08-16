import { useRouteError } from 'react-router-dom';
import style from './ErrorPage.module.scss';

interface RouteError {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;

  return (
    <div id="error-page" className={style.error}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{error?.statusText || error?.message || 'Unknown error'}</p>
    </div>
  );
}
