import 'src/myApp.css';
import { Main } from 'src/pages/mainPage/MainPage.tsx';
import { Provider } from 'react-redux';
import { store } from './store';
import { Switch } from './components/Switch/Switch';
import { ThemeProvider } from './context/ThemeContext';

export const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Switch />
        <Main />
      </ThemeProvider>
    </Provider>
  );
};
