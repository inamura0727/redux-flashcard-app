import { createSlice } from '@reduxjs/toolkit';
import { CardData } from './DummyData';

export const cardSlice = createSlice({
  name: 'cards',
  initialState: {
    value: CardData,
  },
  reducers: {
    addCard: (state, action) => {
      state.value.push(action.payload);
    },
    deleteCard: (state, action) => {
      state.value = state.value.filter((card) => card.id !== action.payload.id);
    },
    shuffleCard: (state) => {
      let tmp = [...CardData];
      for (let i = tmp.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [tmp[i], tmp[j]] = [tmp[j], tmp[i]];
      }
      state.value = tmp;
    },
    update: (state, action) => {
      console.log(action.payload);
      let tmp = state.value.filter((card) => card.id === action.payload.id);
      console.log(tmp);
      tmp = action.payload;
      state.value = tmp;
    },
  },
});

export const getCards = () => {
  return async (dispatch) => {
    const res = await fetch(
      'https://qg5is56b4g.execute-api.ap-northeast-1.amazonaws.com/dev',
    );
    console.log(res);
    const data = await res.json();
    dispatch(addCard(data));
  };
};

export default cardSlice.reducer;
export const { addCard, deleteCard, shuffleCard, answer, update } =
  cardSlice.actions;
