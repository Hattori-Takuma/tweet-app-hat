import { TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../features/user/userSlice';
import { useLoginCheck } from '../hooks/useLoginCheck';
import { useAppSelector } from '../hooks/useRTK';
import { logout } from '../models/authApplicationServics';
import { sendMessageAndUploadeImage } from '../models/tweetApplicationService';
import { db, setData } from '../plugins/firebase';
import './Tweet.css';

const Tweet = () => {
  const user = useAppSelector(selectUser);
  const isLogin = useLoginCheck();
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<any[]>([]);
  const [tweetImage, setTweetImage] = useState<File | null>(null);

  useEffect(() => {
    if (!isLogin) {
      console.log(`login status : [ ${isLogin} ]`);
    }
  }, [isLogin]);

  useEffect(() => {
    const q = query(collection(db, 'message'), orderBy('time'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesInfo: any[] = [];
      querySnapshot.forEach((doc) => {
        messagesInfo.push(doc.data());
      });
      setChat(messagesInfo);
    });
    return unsubscribe;
  }, []);

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
    sendMessageAndUploadeImage('', '', tweetImage!);
  };

  const handleClick3 = async (message: string, file: File | null) => {
    if (message === '') return;
    if (file === null) {
      await setData(message);
    } else {
      await sendMessageAndUploadeImage(user.displayName, message, file);
    }
  };

  const googleLogOut = async () => {
    await logout();
    movePage('/Login');
    console.log('logout');
  };

  return (
    <div>
      <header className="header">
        <Avatar alt="User" src={user.photoUrl} />

        <div className="userIcon">{user.displayName}</div>
        {/* <div className="home">home</div> */}
        <div className="logout">
          <div>{user.email}</div>
          <button onClick={googleLogOut}>ログアウト</button>
        </div>
      </header>

      <div className="show-message-area">
        {chat.map((chat, index) => {
          return (
            <h3>
              {' '}
              key={index} message={chat.message} name={chat.name}
            </h3>
          );
        })}
      </div>

      <div className="sent">
        <TextField onChange={(e) => setMessage(e.target.value)}></TextField>

        <button onClick={handleClick}>setData</button>
        <input type="file" onChange={onChangeImageHandler}></input>

        {/* <button onClick={() => uploadeImage(tweetImage!)}> */}
        <button onClick={handlClick2}>画像アップロード</button>
        <button onClick={() => handleClick3(message, tweetImage)}>
          made by satake
        </button>
      </div>
    </div>
  );
};

export default Tweet;
