import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { Button, TextField } from '@mui/material';
import React from 'react';

type Props = {
  setMessage: any;
  onChangeImageHandler: any;
  handleTweet: any;
  message: any;
  tweetImage: any;
};

const TweetArea: React.FC<Props> = ({
  setMessage,
  onChangeImageHandler,
  handleTweet,
  message,
  tweetImage,
}) => {
  return (
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
  );
};

export default TweetArea;
