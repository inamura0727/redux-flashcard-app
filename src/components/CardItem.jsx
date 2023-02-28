import { useEffect } from 'react';
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { shuffleCard } from '../redux/cardSlice';
import '../css/CardItem.css';
import { Loading } from './Loading';

export const CardItem = () => {
  const [count, setCount] = useState(0);
  const [isAnswer, setIsAnswer] = useState('');
  const [isFinished, setIsFinished] = useState(false);
  const [isShuffled, setIshuffled] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const [active, setActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const cards = useSelector((state) => state.cards.value);
  const dispatch = useDispatch();

  const answer = useRef(null);
  useEffect(() => {
    if (cards.length !== 0) {
      setIsLoading(false);
    }
  }, [cards]);

  console.log(cards);
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
        setActive(true);
        setIsFirst(false);
      }
      if (isAnswer !== '') {
        setIsAnswer('');
      }
      setCount((prev) => prev + 1);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <main>
          <div ref={answer}>
            <div className="btn_wrapper">
              <button
                onClick={shuffle}
                className={`${active ? 'none' : ''} btn btn_size_m`}
              >
                シャッフル
              </button>
            </div>
            {isShuffled ? <p>シャッフルされた！</p> : null}
            {isFinished ? (
              <a href="/cardList">
                <button className="btn btn_size_l">一覧画面へ戻る</button>
              </a>
            ) : (
              <button className="btn btn_size_m" onClick={handleClikc}>
                {isFirst ? 'スタート' : '次へ'}
              </button>
            )}
            <h1>{cards[count].word.S}</h1>
            <p>答え：{isAnswer}</p>
            <button
              className="btn_answer"
              onClick={() => setIsAnswer(cards[count].mean.S)}
            >
              クリックして答えを表示
            </button>
          </div>
        </main>
      )}
    </>
  );
};
