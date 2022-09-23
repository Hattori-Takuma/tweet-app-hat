import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import "../style/messagebox.css"
const commentBox = ({comment}:{comment:string}) => {
  return (
    <div>
    <div className="messagecard-wrapper"></div>
      <div className="content-area"></div>
      <div className="message-area">
        <h4>{comment}</h4>
          <p>コメント</p>
        </div>

</div>
  );
}

export default  commentBox