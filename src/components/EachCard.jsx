import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFetchCard } from '../redux/cardSlice';
import { memo } from 'react';
import '../css/EachCard.css';

const EachCard = memo(() => {
  const cardList = useSelector((state) => state.cards.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="btn_wrapper">
        <a href="/cardList">
          <button className="btn btn_size_l">始める</button>
        </a>
      </div>
      <table>
        <tbody>
          <tr className="table__head">
            <th>単語</th>
            <th>意味</th>
            <th></th>
            <th></th>
          </tr>
          {cardList.map((card) => (
            <tr key={card.ID}>
              <th className="word">{card.word}</th>
              <th>{card.mean}</th>
              <th>
                <a href={`/edit/${card.ID}`}>
                  <button className="btn">編集</button>
                </a>
              </th>
              <th>
                <button
                  className="btn btn_color_gray"
                  onClick={() => dispatch(deleteFetchCard(card.ID))}
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
