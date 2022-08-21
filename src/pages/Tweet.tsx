import Avatar from '@mui/material/Avatar';

import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';

import CommentModal from '../components/CommentModal';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import TweetArea from '../components/TweetArea';
import { selectUser } from '../features/user/userSlice';
import { useLoginCheck } from '../hooks/useLoginCheck';
import { useAppSelector } from '../hooks/useRTK';
import { logout } from '../models/authApplicationServics';
import {
  sendCommentAndUploadeImage,
  sendMessageAndUploadeImage,
} from '../models/tweetApplicationService';
import { db, setComment, setData } from '../plugins/firebase';
import './Tweet.css';

enum tweetType {
  COMMENT,
  TWEET,
}

const Tweet = () => {
  const user = useAppSelector(selectUser);
  const isLogin = useLoginCheck();
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<any[]>([]);
  console.log('🚀 ~ file: Tweet.tsx ~ line 38 ~ Tweet ~ chat', chat);
  const [tweetImage, setTweetImage] = useState<File | null>(null);

  useEffect(() => {
    if (!isLogin) {
      console.log(`login status : [ ${isLogin} ]`);
    }
  }, [isLogin]);

  useEffect(() => {
    const q = query(
      collection(db, 'message'),
      orderBy('time', 'desc'),
      limit(30)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesInfo: any[] = [];
      querySnapshot.forEach((doc) => {
        messagesInfo.push({ id: doc.id, data: doc.data() });
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

  const handleTweet = async (type: tweetType) => {
    if (message === '') return;
    if (type === tweetType.TWEET) {
      if (tweetImage === null) {
        await setData(message);
      } else {
        await sendMessageAndUploadeImage(user.displayName, message, tweetImage);
      }
    } else if (tweetType.COMMENT) {
      if (tweetImage === null) {
        await setComment(message);
      } else {
        await sendCommentAndUploadeImage(user.displayName, message, tweetImage);
      }
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
                <div key={index}>
                  <MessageBox message={chat.data.message} />
                  <img src={chat.data.imageUrl} />
                  <CommentModal
                    setMessage={setMessage}
                    onChangeImageHandler={onChangeImageHandler}
                    handleTweet={handleTweet(tweetType.COMMENT)}
                    message={message}
                    tweetImage={tweetImage}
                  />
                </div>
              );
            })}
          </div>
        </p>

        <p className="rightside">
          <TweetArea
            setMessage={setMessage}
            onChangeImageHandler={onChangeImageHandler}
            handleTweet={handleTweet(tweetType.TWEET)}
            message={message}
            tweetImage={tweetImage}
          />
        </p>
      </p>
    </div>
  );
};

export default Tweet;
