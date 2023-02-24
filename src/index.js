import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CardList from './CardList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<App />} />
          <Route path={'/cardList'} element={<CardList />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
