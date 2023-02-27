import logo from './logo.svg';
import './css/App.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAsyncget } from './redux/cardSlice';
import { CardItem } from './components/CardItem';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const cardList = useSelector((state) => state.cards.value);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncget());
  }, [dispatch]);

  return (
    <div className="App">
      <div>
        <h1>React-redux-単語帳アプリ</h1>
      </div>
      <CardItem />
      <br />
      <a href="/cardList">
        <button className="btn btn_size_l">カード一覧ページへ</button>
      </a>
    </div>
  );
}

export default App;
