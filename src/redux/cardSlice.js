import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

let cards = [];

// GET データの取得
export const fetchAsyncget = createAsyncThunk('fetch/get', async () => {
  const res = await axios.get(
    'https://d0srykgawf.execute-api.ap-northeast-1.amazonaws.com/dev',
  );
  cards = JSON.stringify(res.data);
  return res.data;
});

// POST データの追加
export const addFetchCard = createAsyncThunk('fetch/post', async (req) => {
  const res = await axios.post(
    'https://qg5is56b4g.execute-api.ap-northeast-1.amazonaws.com/dev',
    {
      word: req.word,
      mean: req.mean,
    },
  );
  const data = JSON.parse(res.data.body);
  return data;
});

// DELETE データの削除
export const deleteFetchCard = createAsyncThunk('fetch/delete', async (req) => {
  console.log('きた');
  const res = await axios.request({
    method: 'delete',
    url: 'https://8iodlvn98h.execute-api.ap-northeast-1.amazonaws.com/dev',
    data: { ID: req },
  });
  console.log('きた22');
  const data = JSON.parse(res.data.body);
  console.log(data.Items);
  return data.Items;
});

export const cardSlice = createSlice({
  name: 'cards',
  initialState: {
    value: cards,
  },
  reducers: {
    addCard: (state, action) => {
      state.value.push(action.payload);
    },
    deleteCard: (state, action) => {
      state.value = state.value.filter((card) => card.id !== action.payload.id);
    },
    shuffleCard: (state) => {
      let cardsTmp = JSON.parse(cards);
      let tmp = [...cardsTmp];
      for (let i = tmp.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [tmp[i], tmp[j]] = [tmp[j], tmp[i]];
      }
      state.value = tmp;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncget.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchAsyncget.fulfilled, (state, action) => {
      state.value = action.payload;
      state.status = 'succeeded';
    });
    builder.addCase(fetchAsyncget.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(addFetchCard.fulfilled, (state, action) => {
      state.value = action.payload;
      state.status = 'succeeded';
    });
    builder.addCase(deleteFetchCard.fulfilled, (state, action) => {
      state.value = action.payload;
      state.status = 'succeeded';
    });
  },
});

export default cardSlice.reducer;
export const { addCard, deleteCard, shuffleCard, answer, update } =
  cardSlice.actions;
