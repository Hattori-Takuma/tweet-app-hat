import AddCommentIcon from '@mui/icons-material/AddComment';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { Button, IconButton, TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import { selectUser } from '../features/user/userSlice';
import { useLoginCheck } from '../hooks/useLoginCheck';
import { useAppSelector } from '../hooks/useRTK';
import { logout } from '../models/authApplicationServics';
import { sendMessageAndUploadeImage } from '../models/tweetApplicationService';
import { db, setComentData, setData } from '../plugins/firebase';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './Tweet.css';

const Tweet = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const isLogin = useLoginCheck();
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<any[]>([]);
  const [tweetImage, setTweetImage] = useState<File | null>(null);
  const [comment, setComent] = useState('');
  const [comecha, setComecha] = useState<{ pid: string; data: any[] }>();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  

  useEffect(() => {
    if (!isLogin) {
      console.log(`login status : [ ${isLogin} ]`);
    }
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
  }, [isLogin]);

  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setTweetImage(e.target.files![0]);
      e.target.value = '';
    }
  };

  const movePage = (path: string) => {
    navigate(`${path}`);
  };

  const handleTweet = async (message: string) => {
    if (message === '' && tweetImage === null ) return;

    if (tweetImage === null) {
      await setData(message);
    } else {
      await sendMessageAndUploadeImage(user.displayName, message, tweetImage);
    }
    setMessage('');
    setTweetImage(null);
    

  };

  const handleComment = async (comment: string, id: string) => {
    
    await setComentData(comment, id)
    setComent('');
  };

  const googleLogOut = async () => {
    await logout();
    movePage('/Login');
    console.log('logout');
  };

  /**
   * 画面左側
   * @returns jsx
   */
  const renderLeftSide = () => (
    <div className="side">
      <div className="account">
        <Avatar alt="User" src={user.photoUrl} />
        <div className="userIcon">{user.displayName}</div>
        <div className="logout">
          <div>{user.email}</div>
          <button onClick={googleLogOut}>ログアウト</button>
        </div>
      </div>
    </div>
  );

  /**
   * 画面中央
   * @returns jsx
   */
  const renderMainSide = () => (

    



    
    <div className="main">
      <header className="header" />
      <div className="show-message-area">
        {chat.map((chat, index) => {
          const readCommentData = async (id: string) => {
            const q = query(collection(db, 'message', id, 'comment'), orderBy('time', 'desc'),
      limit(40));
            const querySnapshot = await getDocs(q);
            const commentInfo: any[] = [];
            querySnapshot.forEach((doc) => {
              commentInfo.push({ id: chat.id, data: doc.data() });
              setComecha({ pid: chat.id, data: commentInfo });
            });
          };
          const commentReadButton = async (id: string) => {
            await readCommentData(id);
          };

          
          return (
            <div key={index}>
               
        {/* <Avatar alt="User" src={user.photoUrl} />
                <div className="userIcon">{user.displayName}</div> */}
                
              <MessageBox message={chat.data.message} />
              <img src={chat.data.imageUrl} />
              {/* alt="imageUrl" */}
              <div>
                <IconButton
                  aria-label="fingerprint"
                  color="secondary"
                  onClick={handleOpen}
                >
                  <AddCommentIcon />
                </IconButton>

                <TextField
                  onChange={(e) => setComent(e.target.value)}
                ></TextField>
                <Button
                  variant="contained"
                  className="btn"
                  onClick={() => handleComment(comment, chat.id)}
                >
                  comment
                </Button>
                <Button  onClick={() => commentReadButton(chat.id)}>
                   <KeyboardArrowDownIcon ></KeyboardArrowDownIcon>
                </Button>
               
                {comecha &&
                  chat.id === comecha.pid &&
                  comecha.data.map((cmc, index) => {
                    return (
                      <ul  key={index}>
                       
                        
                        <li>
                          name : {user.displayName} / comment:{' '}
                          {cmc.data.comment}
                        </li>
                      </ul>
                     
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  /**
   * 画面右側
   * @returns jsx
   */
  const renderRightSide = () => (
    <div className="rightside">
      <div>
        <div className="sent">
          <TextField　value={message} onChange={(e) => setMessage(e.target.value )}></TextField>
          {/* (e) => {e.target.value = '';} */}
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
            onClick={() => handleTweet(message)}
          >
  
            Tweet
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="all">
      {renderLeftSide()}
      {renderMainSide()}
      {renderRightSide()}

    </div>
  );
};

export default Tweet;
