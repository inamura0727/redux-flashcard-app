import axios from 'axios';
import { sleep } from './Sleep';

export const fetchCards = async () => {
  const result = await axios
    .get('https://d0srykgawf.execute-api.ap-northeast-1.amazonaws.com/dev')
    .then(await sleep(3000));
  return result.data;
};
