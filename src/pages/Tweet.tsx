import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
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
    const q = query(collection(db, 'message'), orderBy('time', 'desc'));
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

  const handleTweet = async (message: string, file: File | null) => {
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
      <p className="all">
        <p className="side">
          <div className="account">
            <Avatar alt="User" src={user.photoUrl} />
            <div className="userIcon">{user.displayName}</div>
            <div className="logout">
              <div>{user.email}</div>
              <button onClick={googleLogOut}>ログアウト</button>
            </div>
          </div>
        </p>
        <p className="main">
          <header className="header"></header>

          <div className="show-message-area">
            {chat.map((chat, index) => {
              return (
                <div>
                  <MessageBox message={chat.message} /> key={index} message=
                  {chat.message} name={chat.name}
                  <img src={chat.imageUrl}></img>
                </div>
              );
            })}
          </div>
        </p>

        <p className="rightside">
          <div className="sent">
            <TextField onChange={(e) => setMessage(e.target.value)}></TextField>
            <label htmlFor="file_photo" className="label_style">
              <DriveFolderUploadIcon />
              <input
                type="file"
                id="file_photo"
                className="display_none"
                onChange={onChangeImageHandler}
              />
            </label>
            <Button
              variant="contained"
              className="btn"
              onClick={() => handleTweet(message, tweetImage)}
            >
              Tweet
            </Button>
          </div>
        </p>
      </p>
    </div>
  );
};

export default Tweet;
