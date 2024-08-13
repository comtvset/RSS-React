import 'src/myApp.css';
import { Home } from 'src/pages/home/Home';
import { Provider } from 'react-redux';
import { store } from './store';

export const App = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};
