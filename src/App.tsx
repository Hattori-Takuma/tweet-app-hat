import { useEffect } from 'react';
import './App.css';
import { useLoginCheck } from './hooks/useLoginCheck';
import Login from './pages/Login';

function App() {
  // const navigate
  const isLogin = useLoginCheck();
  useEffect(() => {
    if (!isLogin) {
      console.log(`login status : [ ${isLogin} ]`);
    }
  }, [isLogin]);
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
