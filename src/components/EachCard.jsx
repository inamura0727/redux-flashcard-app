import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFetchCard } from '../redux/cardSlice';
import { memo, useEffect } from 'react';
import { fetchAsyncget } from '../redux/cardSlice';
import '../css/EachCard.css';

const EachCard = memo(() => {
  const cardList = useSelector((state) => state.cards.value);
  const dispatch = useDispatch();

  return (
    <div>
      <table>
        <tbody>
          <tr className="table__head">
            <th>単語</th>
            <th>意味</th>
            <th></th>
          </tr>
          {cardList.map((card) => (
            <tr key={card.ID.S}>
              <th className="word">{card.word.S}</th>
              <th>{card.mean.S}</th>
              <th>
                <button
                  className="btn"
                  onClick={() => dispatch(deleteFetchCard(card.ID.S))}
                >
                  削除
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default EachCard;
