import { useNavigate } from "react-router-dom";

const StLogin = () => {
   const navigate = useNavigate();
  const movePage = (path:string) => {
    navigate(`${path}`);
  }

  
}


export default StLogin;