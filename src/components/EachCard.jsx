import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFetchCard } from '../redux/cardSlice';
import { memo,} from 'react';
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
            <th></th>
          </tr>
          {cardList.map((card) => (
            <tr key={card.ID.S}>
              <th className="word">{card.word.S}</th>
              <th>{card.mean.S}</th>
              <th>
                <a href={`/edit/${card.ID.S}`}>
                  <button className="btn">編集</button>
                </a>
              </th>
              <th>
                <button
                  className="btn btn_color_gray"
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
