import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFetchCard } from '../redux/cardSlice';
import { memo, useEffect } from 'react';
import { fetchAsyncget } from '../redux/cardSlice';

const EachCard = memo(() => {
  const cardList = useSelector((state) => state.cards.value);
  const dispatch = useDispatch();


  return (
    <div>
      <div className="displayCards">
        {cardList.map((card) => (
          <div key={card.ID.S}>
            <h1>{card.word.S}</h1>
            <p>{card.mean.S}</p>
            <button onClick={() => dispatch(deleteFetchCard(card.ID.S))}>
              削除
            </button>
          </div>
        ))}
      </div>
    </div>
  );
});

export default EachCard;
