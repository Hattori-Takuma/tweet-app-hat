import Avatar from '@mui/material/Avatar';

import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  getDocs
} from 'firebase/firestore';

import CommentModal from '../components/CommentModal';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import commentBox from '../components/commentBox';
import TweetArea from '../components/TweetArea';
import { selectUser } from '../features/user/userSlice';
import { useLoginCheck } from '../hooks/useLoginCheck';
import { useAppSelector } from '../hooks/useRTK';
import { logout } from '../models/authApplicationServics';
import {
  sendCommentAndUploadeImage,
  sendMessageAndUploadeImage,
} from '../models/tweetApplicationService';
import { db, setComentData, setData ,readCommentData} from '../plugins/firebase';
import './Tweet.css';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { Button, TextField } from '@mui/material';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { ResetTvRounded } from '@mui/icons-material';


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
  const [comment, setComent] = useState('');
  const [comecha, setComecha] = useState<any[]>([]);


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

 const readCommentData = async (id: string) => {
  console.log("readCommentData",id)
  const q = query(collection(db, "message", id, "comment"));
   const querySnapshot = await getDocs(q);
   const commentInfo: any[] = [];
   querySnapshot.forEach((doc) => {
     commentInfo.push({ id: doc.id, data: doc.data() });
    console.log(doc.id, " => ", doc.data());
  });
 }
 const commentReadButton = async () => {
    console.log("read")
    await readCommentData(comment)
  }



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
    
      if (tweetImage === null) {
        await setData(message);
      } else {
        await sendMessageAndUploadeImage(user.displayName, message, tweetImage);
      }
    
 };
  
  const handleComment = async (comment: string,id:string) => {
    await setComentData(comment,id);
    console.log(comment,id)
  };


  // const handleTweet = async (type: tweetType) => {
  //   if (message === '') return;
  //   if (type === tweetType.TWEET) {
  //     if (tweetImage === null) {
  //       await setData(message);
  //     } else {
  //       await sendMessageAndUploadeImage(user.displayName, message, tweetImage);
  //     }
  //   } else if (tweetType.COMMENT) {
  //     if (tweetImage === null) {
  //       await setComment(message);
  //     } else {
  //       await sendCommentAndUploadeImage(user.displayName, message, tweetImage);
  //     }
  //   }
  // };

  //  const handleTweet = async (message: string, file: File | null) => {
  //   if (message === '') return;
  //   if (file === null) {
  //     await setData(message);
  //   } else {
  //     await sendMessageAndUploadeImage(user.displayName, message, file);
  //   }
  // };

  const googleLogOut = async () => {
    await logout();
    movePage('/Login');
    console.log('logout');
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
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
                  
                  

                  <>
      <IconButton
        aria-label="fingerprint"
        color="secondary"
        onClick={handleOpen}
      >
        <AddCommentIcon />
                    </IconButton>

                    <TextField onChange={(e) => setComent(e.target.value)}></TextField>
                    <Button
                variant="contained"
                className="btn"
                onClick={() =>handleComment(comment,chat.id) }
            >
                      comment
            </Button>
                    <button onClick={commentReadButton}  >comment表示</button>
                    

     
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Commentを記入してください
          </Typography>
          <TweetArea
            setMessage={setMessage}
            onChangeImageHandler={onChangeImageHandler}
            handleTweet={handleTweet}
            message={message}
            tweetImage={tweetImage}
          />
        </Box>
      </Modal> */}
    </>
                </div>
              );
            })}
          </div>
        </p>

        <p className="rightside">
          <div>
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
    </div>
        </p>
      </p>
    </div>
  );
};

export default Tweet;
