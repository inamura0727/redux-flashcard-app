import logo from './logo.svg';
import './App.css';
import {useSelector, useDispatch} from "react-redux";
import {addCard, deleteCard, shuffleCard} from './redux/cardSlice'
import { useState } from 'react';

function App() {
  const [word, setWord] = useState('')
  const [mean, setMean] = useState('')

  const cardList = useSelector((state) =>state.cards.value)
  const dispatch = useDispatch()

  // 単語を追加
  const handleClick=()=>{
    dispatch(addCard({
      id: cardList.length +1,
      word: word,
      mean: mean
    }))
    setWord('')
    setMean('')
  }
  
  return (
    <div className="App">
      <div>
        <h1>React-redux-単語帳アプリ</h1>
      </div>
      <div className='addPost'>
        <input 
        type="text" 
        placeholder='単語を書いてね！' 
        onChange={(e)=>  setWord(e.target.value)} 
        value={word}
        />
        <input 
        type="text" 
        placeholder='意味を書いてね！' 
        onChange={(e)=>  setMean(e.target.value)} 
        value={mean}
        />
        <button onClick={()=>handleClick()}>追加</button>
        <hr />
        <div className='displayCards'>
          {cardList.map((card)=>(
            <div key={card.id}>
              <h1>{card.word}</h1>
              <p>{card.mean}</p>
              <button onClick={()=>dispatch(deleteCard({id:card.id}))}>削除</button>
              </div>
          ))}
        </div>
        <br />
        <button onClick={()=>dispatch(shuffleCard(cardList))}>シャッフル</button>
      </div>
    </div>
  );
}

export default App;
