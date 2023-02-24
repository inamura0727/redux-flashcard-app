import { useEffect } from 'react';
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import  { shuffleCard } from '../redux/cardSlice';

export const CardItem = () => {
  const [count, setCount] = useState(0);
  const [isAnswer, setIsAnswer] = useState('');
  const [isFinished, setIsFinished] = useState(false);
  const [isShuffled, setIshuffled] = useState(false);
  const [isFirst, setIsFirst] = useState(true);

  const cards = useSelector((state) => state.cards.value);
  const dispatch = useDispatch();

  const answer = useRef(null);

  // APIカード情報が取得できない際はreturnを返す
  if (!cards.length) return;

  const shuffle = () => {
    dispatch(shuffleCard(cards));
    setIshuffled(true);
  };

  const handleClikc = () => {
    // カードを全部回し終えたらボタンを切り変え&「次へ」ボタンを表示させない
    if (count === cards.length - 1) {
      setIsFinished(true);
      return;
    }
    if (count < cards.length) {
      if (isFirst) {
        setIsFirst(false);
      }
      setCount((prev) => prev + 1);
    }
  };

  return (
    <div ref={answer}>
      <button onClick={shuffle}>シャッフル</button>
      {isShuffled ? <p>シャッフルされた！</p> : null}
      {isFinished ? (
        <button>
          <a href="/cardList">一覧画面へ戻る</a>
        </button>
      ) : (
        <button onClick={handleClikc}>{isFirst ? 'スタート' : '次へ'}</button>
      )}
      <h1>{cards[count].word.S}</h1>
      <p>{isAnswer}</p>
      <button onClick={() => setIsAnswer(cards[count].mean.S)}>答え</button>
    </div>
  );
};
