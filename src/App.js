import './css/App.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAsyncget } from './redux/cardSlice';
import { CardItem } from './components/CardItem';
import { Suspense, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Loading } from './components/Loading';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncget());
  }, [dispatch]);

  return (
    <div className="App">
      <HelmetProvider>
        <Helmet>
          <title>単語帳アプリ</title>
        </Helmet>
      </HelmetProvider>
      <div>
        <h1>単語帳アプリ</h1>
      </div>
      <div className="content">
        <Suspense fallback={<Loading />}>
          <CardItem />
        </Suspense>
        <br />
        <a href="/">
          <button className="btn btn_size_l">カード一覧ページへ</button>
        </a>
      </div>
    </div>
  );
}

export default App;
