import React from 'react';
import ReactDOM from 'react-dom/client';

import 'virtual:uno.css';

import './index.css';
import Layout from './layout';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>,
);
