
import React from "react";
import { useNavigate } from "react-router-dom";
import DisableElevation from "../components/Button";
import { googleLogin } from "../models/authApplicationServics"

const Login = () => {

   const navigate = useNavigate();
  const movePage = (path:string) => {
    navigate(`${path}`);
  }

  const google = async () => {
    await googleLogin()



  }



  return (


    <div>
      <DisableElevation />
      <h1>ログイン画面</h1>

      <button onClick={() => movePage("Tweet")}>
        ログイン


      </button>

      <button onClick={google}>
        googleログイン


      </button>


      








    </div>
  )
  


};

export default Login;