import React from 'react';
import { createRoot } from 'react-dom/client';
import 'src/index.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './components/Routes/root.tsx';
import ErrorPage from './pages/ErrorPage/ErrorPage.tsx';
import { DetailWindow } from './components/DetailWindow/DetailWindow.tsx';

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
        path: 'details/:id',
        element: <DetailWindow />,
      },
    ],
  },
]);

createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
