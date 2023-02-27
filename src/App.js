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
      <button>
        <a href="/cardList">カード一覧ページへ</a>
      </button>
    </div>
  );
}

export default App;
