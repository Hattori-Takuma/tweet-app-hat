import React, { useState,useEffect } from 'react';
import { cardActionAreaClasses, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setData ,db} from "../plugins/firebase"
import './Tweet.css'
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";






const Tweet = () => {

const [message, setMessage] = useState("")


   const navigate = useNavigate();
  const movePage = (path:string) => {
    navigate(`${path}`);
  }
  
  const handleClick = () => {
    setData(message)
  }

   const [chat, setChat] = useState<any[]>([])
  
useEffect(() =>{
  const q = query(collection(db, "message"), orderBy("time"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const messagesInfo:any[] = [];
    querySnapshot.forEach((doc) => {
      messagesInfo.push(doc.data());
    });
    setChat(messagesInfo)
  });
    
  console.log(unsubscribe)
  return unsubscribe

}, [])
   
  


  
  
  
  
  
  
  

  return (
    <div>
      <h1>Tweet画面</h1>



    <div className="show-message-area" >
        {
          chat.map((chat, index) => {
            return <h3> key={index} message={chat.message} 
            </h3>
          })
        }

   

      </div>

      
       

         <div className="sent">
      <TextField
        onChange={e => setMessage(e.target.value)}>
        
       </TextField>

        <button onClick={handleClick}>setData</button>
        </div>
      







    </div>
  )
  


}

export default Tweet;


