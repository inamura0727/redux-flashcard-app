import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { addFetchCard, fetchAsyncget } from './redux/cardSlice';
import { useState } from 'react';
import { useEffect } from 'react';
import EachCard from './components/EachCard';
import './css/CardList.css';
import { Helmet } from 'react-helmet';

function CardList() {
  const [word, setWord] = useState('');
  const [mean, setMean] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncget());
  }, [dispatch]);

  // 単語を追加
  const handleClick = () => {
    dispatch(addFetchCard({ word: word, mean: mean }));
    setWord('');
    setMean('');
  };

  return (
    <>
      <Helmet>
        <title>単語帳アプリ</title>
      </Helmet>
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
          <hr />
        </div>
        <div className="btn_wrapper">
          <a href="/">
            <button className="btn btn_size_l">始める</button>
          </a>
        </div>
        <EachCard />
      </div>
    </>
  );
}

export default CardList;
