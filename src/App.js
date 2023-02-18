import logo from './logo.svg';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { shuffleCard } from './redux/cardSlice';
import { CardItem } from './components/CardItem';
import { useState } from 'react';

function App() {
  const [isShuffled, setIshuffled] = useState(false);

  const cardList = useSelector((state) => state.cards.value);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(shuffleCard(cardList));
    setIshuffled(true);
  };

  return (
    <div className="App">
      <div>
        <h1>React-redux-単語帳アプリ</h1>
      </div>
      <button onClick={handleClick}>シャッフル</button>
      {isShuffled ? <p>シャッフルされた！</p> : null}
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
