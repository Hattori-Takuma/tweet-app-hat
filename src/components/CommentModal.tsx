import AddCommentIcon from '@mui/icons-material/AddComment';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import React from 'react';
import TweetArea from './TweetArea';

type Props = {
  setMessage: any;
  onChangeImageHandler: any;
  handleTweet: any;
  message: any;
  tweetImage: any;
};

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

const CommentModal: React.FC<Props> = ({
  setMessage,
  onChangeImageHandler,
  handleTweet,
  message,
  tweetImage,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <IconButton
        aria-label="fingerprint"
        color="secondary"
        onClick={handleOpen}
      >
        <AddCommentIcon />
      </IconButton>
      <Modal
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
      </Modal>
    </>
  );
};

export default CommentModal;
