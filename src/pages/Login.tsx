import { useNavigate } from "react-router-dom";

const Login = () => {

   const navigate = useNavigate();
  const movePage = (path:string) => {
    navigate(`${path}`);
  }
  return (
    <div>
      <h1>ログイン</h1>
    </div>
  )
  


};

export default Login;