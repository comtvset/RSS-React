import React from 'react';
import { createRoot } from 'react-dom/client';
import App from 'src/App.tsx';
import 'src/index.css';

const rootElement = document.createElement('div');
rootElement.id = 'root';
document.body.appendChild(rootElement);

createRoot(rootElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
