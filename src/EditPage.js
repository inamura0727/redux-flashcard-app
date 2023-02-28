import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loading } from './components/Loading';
import './css/EditPage.css';

function EditPage() {
  const [card, setCard] = useState(null);
  const [word, setWord] = useState('');
  const [mean, setMean] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    (async () => {
      const response = await axios.post(
        `https://r8g482ppe4.execute-api.ap-northeast-1.amazonaws.com/dev`,
        {
          ID: id,
        },
      );
      const item = JSON.parse(response.data.body);
      setCard(item);
      setWord(item.word.S);
      setMean(item.mean.S);
    })();
  }, [id]);

  if (card === null) {
    return;
  }

  const handleClick = async () => {
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
  };

  return (
    <>
      <main className="App">
        <div className="content">
          <h1>編集ページ</h1>
          <div className="input_wrapper">
            <span>単語：</span>
            <input
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
            />
            <br />
            <span>意味：</span>
            <input
              type="text"
              value={mean}
              onChange={(e) => setMean(e.target.value)}
            />
          </div>
          <div className="btn_wrapper">
            <button className="btn btn_size_m" onClick={handleClick}>
              更新する
            </button>
          </div>
          {isUpdate ? <p>アップデートできました！</p> : null}
          {isLoading ? <Loading /> : null}
          <div>
            <a href="/">
              <button className="btn btn_size_l">カード一覧ページへ</button>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}

export default EditPage;
