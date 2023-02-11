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
    }
  },
});

export default cardSlice.reducer;
export const { addCard, deleteCard, shuffleCard, answer } = cardSlice.actions;
