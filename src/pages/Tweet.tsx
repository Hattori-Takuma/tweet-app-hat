import React, { useState } from 'react';
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setData } from "../plugins/firebase"




const Tweet = () => {

const [message, setMessage] = useState("")


   const navigate = useNavigate();
  const movePage = (path:string) => {
    navigate(`${path}`);
  }
  
  const handleClick = () => {
    setData(message)
}

  return (
    <div>
      <h1>Tweet画面</h1>

      <TextField
        onChange={e => setMessage(e.target.value)}>
        
       </TextField>

      <button onClick={handleClick}>setData</button>
      







    </div>
  )
  


}

export default Tweet;


