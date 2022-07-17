import { TextField } from '@mui/material';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginCheck } from '../hooks/useLoginCheck';
import { db, setData, uploadeImage } from '../plugins/firebase';
import './Tweet.css';

const Tweet = () => {
  const isLogin = useLoginCheck();
  const [chat, setChat] = useState<any[]>([]);
  useEffect(() => {
    if (!isLogin) {
      console.log(`login status : [ ${isLogin} ]`);
    }
  }, [isLogin]);

  const [message, setMessage] = useState('');

  const [tweetImage, setTweetImage] = useState<File | null>(null);

  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setTweetImage(e.target.files![0]);
      e.target.value = '';
    }
  };

  const navigate = useNavigate();
  const movePage = (path: string) => {
    navigate(`${path}`);
  };

  const handleClick = () => {
    setData(message);
  };

  const handlClick2 = () => {
    uploadeImage(tweetImage!);
  };

  useEffect(() => {
    const q = query(collection(db, 'message'), orderBy('time'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesInfo: any[] = [];
      querySnapshot.forEach((doc) => {
        messagesInfo.push(doc.data());
      });
      setChat(messagesInfo);
    });

    console.log(unsubscribe);
    return unsubscribe;
  }, []);

  return (
    <div>
      <h1>Tweet画面</h1>
      {/* <h2>name:{user.displayName}</h2> */}

      <div className="show-message-area">
        {chat.map((chat, index) => {
          return (
            <h3>
              {' '}
              key={index} message={chat.message}
            </h3>
          );
        })}
      </div>

      <div className="sent">
        <TextField onChange={(e) => setMessage(e.target.value)}></TextField>

        <button onClick={handleClick}>setData</button>
        <input type="file" onChange={onChangeImageHandler}></input>

        <button onClick={handlClick2}>画像アップロード</button>
      </div>
    </div>
  );
};

export default Tweet;
