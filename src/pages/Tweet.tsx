import { useNavigate } from "react-router-dom";
import{setData}from "../plugins/firebase"



const Tweet = () => {
   const navigate = useNavigate();
  const movePage = (path:string) => {
    navigate(`${path}`);
  }
  return (
    <div>
      <h1>Tweet画面</h1>



      <button onClick={setData}>setData</button>
      







    </div>
  )
  


}

export default Tweet;


