
import React from "react";
import { useNavigate } from "react-router-dom";
import DisableElevation from "../components/Button";

const Login = () => {

   const navigate = useNavigate();
  const movePage = (path:string) => {
    navigate(`${path}`);
  }

  return (


    <div>
      <DisableElevation />
      <h1>ログイン画面</h1>

      <button onClick={() => movePage("Tweet")}>
        ログイン


      </button>



      








    </div>
  )
  


};

export default Login;