import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { addFetchCard, fetchAsyncget } from './redux/cardSlice';
import { useState } from 'react';
import { useEffect } from 'react';
import EachCard from './components/EachCard';
import './css/CardList.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Loading } from './components/Loading';

function CardList() {
  const [word, setWord] = useState('');
  const [mean, setMean] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncget());
    setIsLoading(false);
  }, [dispatch]);

  // 単語を追加
  const handleClick = () => {
    if ((word === '') | (mean === '')) {
      setIsEmpty(true);
      return;
    }
    dispatch(addFetchCard({ word: word, mean: mean }));
    setWord('');
    setMean('');
    setIsEmpty(false);
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>単語帳アプリ</title>
        </Helmet>
      </HelmetProvider>
      <div className="App">
        <div className="upper_part">
          <div>
            <h1>単語帳アプリ</h1>
          </div>
          <h1>カード一覧のページ</h1>
          <div className="addPost">
            <input
              type="text"
              placeholder="単語を書いてね！"
              onChange={(e) => setWord(e.target.value)}
              value={word}
              style={{ marginRight: '10px' }}
            />
            <input
              type="text"
              placeholder="意味を書いてね！"
              onChange={(e) => setMean(e.target.value)}
              value={mean}
            />
            <button
              className="btn btn_wrapper btn_marginLeft"
              onClick={() => handleClick()}
            >
              追加
            </button>
            <p>{isEmpty ? '単語、意味のどちらかが空欄だよ！' : null}</p>
            <hr />
          </div>
        </div>
        <div className="content">
          <div className="btn_wrapper">
            <a href="/cardList">
              <button className="btn btn_size_l">始める</button>
            </a>
          </div>
          {isLoading ? <Loading /> : <EachCard />}
        </div>
      </div>
    </>
  );
}

export default CardList;
