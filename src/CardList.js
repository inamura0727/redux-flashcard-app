import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCard, deleteCard } from './redux/cardSlice';
import { useState } from 'react';

function CardList() {
  const [word, setWord] = useState('');
  const [mean, setMean] = useState('');

  const cardList = useSelector((state) => state.cards.value);
  const dispatch = useDispatch();

  // 単語を追加
  const handleClick = () => {
    dispatch(
      addCard({
        id: cardList.length + 1,
        word: word,
        mean: mean,
      }),
    );
    setWord('');
    setMean('');
  };

  return (
    <div className="App">
      <div>
        <h1>React-redux-単語帳アプリ</h1>
      </div>
      <h1>カードリストのページ</h1>
      <div className="addPost">
        <input
          type="text"
          placeholder="単語を書いてね！"
          onChange={(e) => setWord(e.target.value)}
          value={word}
        />
        <input
          type="text"
          placeholder="意味を書いてね！"
          onChange={(e) => setMean(e.target.value)}
          value={mean}
        />
        <button onClick={() => handleClick()}>追加</button>
        <hr />
      </div>
      <button>
        <a href="/">始める</a>
      </button>
      <div className="displayCards">
        {cardList.map((card) => (
          <div key={card.id}>
            <h1>{card.word}</h1>
            <p>{card.mean}</p>
            <button onClick={() => dispatch(deleteCard({ id: card.id }))}>
              削除
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardList;
