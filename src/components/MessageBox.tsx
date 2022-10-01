import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import "../style/messagebox.css"
const MessageBox = ({message}:{message:string}) => {
  return (
    <div>
   
      <div className="content-area"></div>
      <div className="message-area">
        <h4>{message}</h4>
          
        </div>

</div>
  );
}

export default  MessageBox