import { useNavigate } from "react-router-dom";

const TkLogin = () => {

   const navigate = useNavigate();
  const movePage = (path:string) => {
    navigate(`${path}`);
  }



};

export default TkLogin;