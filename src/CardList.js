import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCard } from './redux/cardSlice';

function CardList() {
  const cardList = useSelector((state) => state.cards.value);
  const dispatch = useDispatch();
  return (
    <div className="App">
      <h1>カードリストのページ</h1>
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
