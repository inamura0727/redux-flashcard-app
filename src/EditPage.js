import axios from 'axios';
// import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loading } from './components/Loading';
import './css/EditPage.css';
import React, { Suspense, useState } from 'react';
import { UpdateCard } from './components/UpdateCard';

function EditPage() {
  const [card, setCard] = useState(null);
  const [word, setWord] = useState('');
  const [mean, setMean] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const { id } = useParams();

  return (
    <>
      <main className="App">
        <div className="content">
          <h1>編集ページ</h1>
          <Suspense fallback={<Loading />}>
            <UpdateCard id={id} />
          </Suspense>
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
