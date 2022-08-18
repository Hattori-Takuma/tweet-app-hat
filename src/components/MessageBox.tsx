import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import "../style/messagebox.css"
const MessageBox = () => {
  return (
    <div>
    <div className="messagecard-wrapper"></div>
      <div className="content-area"></div>
      <div className="message-area">
          <h4>name</h4>
          <p>message</p>
        </div>

</div>
  );
}

export default  MessageBox