import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCard } from '../redux/cardSlice';

export const CardItem = ({ cardList }) => {
  const [count, setCount] = useState(0);
  const [output, setOutput] = useState([cardList[0]]);
  const [isAnswer, setIsAnswer] = useState('');
  const answer = useRef(null);

  const dispatch = useDispatch();

  const handleClikc = () => {
    if (count === cardList.length) {
      return;
    }
    if (count < cardList.length) {
      setCount((prev) => prev + 1);
      setOutput(cardList[count]);
    }
  };

  console.log(output.id)
  return (
    <div ref={answer}>
      <h1>hello world</h1>
      <button onClick={handleClikc}>次へ</button>
      <h1>{output.word}</h1>
      <p>{isAnswer}</p>
      <button onClick={() => setIsAnswer(output.mean)}>答え</button>
      <br />
      <button onClick={() => dispatch(deleteCard({ id: output.id }))}>
        削除
      </button>
    </div>
  );
};
