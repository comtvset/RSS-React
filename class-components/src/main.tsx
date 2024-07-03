import React from 'react';
import { createRoot } from 'react-dom/client';
// import App from 'src/App.tsx';
import './index.css';
import AppNew from 'src/AppNew.tsx';

const rootElement = document.createElement('div');
rootElement.id = 'root';
document.body.appendChild(rootElement);

createRoot(rootElement).render(
    <React.StrictMode>
        {/* <App /> */}
        <AppNew />
    </React.StrictMode>
);
