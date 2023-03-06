import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { Loading } from './Loading';
import { sleep } from './Sleep';

import React from 'react';

export const UpdateCard = ({ id }) => {
  const [word, setWord] = useState('');
  const [mean, setMean] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const fetchCard = async () => {
    const result = await axios
      .post(`https://r8g482ppe4.execute-api.ap-northeast-1.amazonaws.com/dev`, {
        ID: id,
      })
      .then(await sleep(2000));
    return result.data;
  };

  const { loading, error, data } = useQuery(['cards'], fetchCard);

  // console.log('hello');
  const item = JSON.parse(data.body);
  useEffect(() => {
    // setCard(item);
    setWord(item.word.S);
    setMean(item.mean.S);
  }, []);

  const handleClick = async () => {
    if ((word === '') | (mean === '')) {
      setIsEmpty(true);
      return;
    }
    setIsLoading(true);
    await axios.patch(
      'https://ajcsom4nr4.execute-api.ap-northeast-1.amazonaws.com/dev',
      {
        ID: id,
        word: word,
        mean: mean,
      },
    );
    setIsUpdate(true);
    setIsLoading(false);
    setIsEmpty(false);
  };

  return (
    <main>
      <div className="content">
        <div className="input_wrapper">
          <span>単語：</span>
          <input
            type="text"
            value={word}
            onChange={(e) => {
              setIsUpdate(false);
              setWord(e.target.value);
            }}
          />
          <br />
          <span>意味：</span>
          <input
            type="text"
            value={mean}
            onChange={(e) => {
              setIsUpdate(false);
              setMean(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="btn_wrapper">
        <button className="btn btn_size_m" onClick={handleClick}>
          更新する
        </button>
        {isEmpty ? <p>単語、意味のどちらかが空欄だよ！</p> : null}
      </div>
      {isUpdate ? <p>アップデートできました！</p> : null}
      {isLoading ? <Loading /> : null}
    </main>
  );
};
