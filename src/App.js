import logo from './logo.svg';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { addCard, shuffleCard } from './redux/cardSlice';
import { useState } from 'react';
import { CardItem } from './components/CardItem';

function App() {
  const cardList = useSelector((state) => state.cards.value);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <div>
        <h1>React-redux-単語帳アプリ</h1>
      </div>
      <button onClick={() => dispatch(shuffleCard(cardList))}>
        シャッフル
      </button>
      <br />
      <CardItem cardList={cardList} />
      <br />
      <button>
        <a href="/cardList">カード一覧ページへ</a>
      </button>
    </div>
  );
}

export default App;
