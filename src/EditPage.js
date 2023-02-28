import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function EditPage() {
  const [card, setCard] = useState(null);
  const [word, setWord] = useState('');
  const [mean, setMean] = useState('');

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

  return (
    <>
      <h1>編集ページ</h1>
      <p>パラメータ{id}です</p>
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
    </>
  );
}

export default EditPage;
