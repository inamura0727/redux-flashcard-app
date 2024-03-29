import { useState, useRef } from 'react';
import '../css/CardItem.css';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Config } from '../config';

export const CardItem = () => {
  // データ取得に時間がかかる想定のため
  const sleep = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };
  const fetchCards = async () => {
    const result = await axios
      .get(Config.REACT_APP_CARD)
      .then(await sleep(3000));
    return result.data;
  };
  let { data, error } = useQuery(['cards'], fetchCards);

  const [count, setCount] = useState(0);
  const [isAnswer, setIsAnswer] = useState('');
  const [isFinished, setIsFinished] = useState(false);
  const [isShuffled, setIshuffled] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const [active, setActive] = useState(false);
  const [cards, setCards] = useState(data);
  const answer = useRef(null);

  // APIカード情報が取得できない際はreturnを返す
  if (error) return <div>Fetch Failed!</div>;

  // カードの順番をシャッフル
  const shuffle = () => {
    let tmp = [...data];
    for (let i = tmp.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [tmp[i], tmp[j]] = [tmp[j], tmp[i]];
    }
    setCards(tmp);
    setIshuffled(true);
  };

  const handleClikc = () => {
    // カードを全部回し終えたらボタンを切り変え&「次へ」ボタンを表示させない
    if (count === data.length - 1) {
      setIsFinished(true);
      return;
    }
    if (count < data.length) {
      if (isFirst) {
        // シャッフルを押させないため
        setActive(true);
        // ボタンの切り替え
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
            <a href="/">
              <button className="btn btn_size_l">一覧画面へ戻る</button>
            </a>
          ) : (
            <button className="btn btn_size_m" onClick={handleClikc}>
              {isFirst ? 'スタート' : '次へ'}
            </button>
          )}
          <h1>{cards[count].word}</h1>
          <p>答え：{isAnswer}</p>
          <button
            className="btn_answer"
            onClick={() => setIsAnswer(cards[count].mean)}
          >
            クリックして答えを表示
          </button>
        </div>
      </main>
    </>
  );
};
