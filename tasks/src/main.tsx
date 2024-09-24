import React from 'react';
import { createRoot } from 'react-dom/client';
import 'src/index.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/errorPage/ErrorPage.tsx';
import { Home } from './pages/home/Home.tsx';
import { ManualForm } from './pages/manualForm/ManualForm.tsx';
import Root from './components/routes/Root.tsx';
import { ReactHookForm } from './pages/reactHookForm/ReactHookForm.tsx';
import { Provider } from 'react-redux';
import store from './store/store.ts';

const rootElement = document.createElement('div');
rootElement.id = 'root';
document.body.appendChild(rootElement);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/manual-form',
        element: <ManualForm />,
      },
      {
        path: '/react-hook-form',
        element: <ReactHookForm />,
      },
    ],
  },
]);

createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
