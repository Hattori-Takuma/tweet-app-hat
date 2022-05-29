import React from 'react';
import { useNavigate } from "react-router-dom";
import './App.css';
import Login from './pages/Login';




function App() {
  // const navigate = useNavigate();
  //  const movePage = (path:string) => {
  //   navigate(`${path}`);
  // }
 
 
  return (
    <>
      
    
      <Login />
</>
   
    
  
    
//  <div>
//       <h1>login</h1>
     
//       <h2
//         onClick={() => movePage("TkLogin")}
//        >Takuma's Page</h2>
//       <hr />

//       <h2
//         onClick={() => movePage("StLogin")}
//         >Satake's Page</h2>
    
//     </div>
);
}

export default App;
