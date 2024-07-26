import 'src/myApp.css';
import { Main } from 'src/pages/mainPage/MainPage.tsx';
import { Provider } from 'react-redux';
import { store } from './store';

export const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};
