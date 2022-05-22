import { useNavigate } from "react-router-dom";



const Tweet = () => {
   const navigate = useNavigate();
  const movePage = (path:string) => {
    navigate(`${path}`);
  }
  return (
    <div>
      <h1>Tweet画面</h1>
    </div>
  )
  


}

export default Tweet;


