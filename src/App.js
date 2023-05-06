import Header from './components/Layout/Header'
import MenuLeft from "./components/Layout/MenuLeft";
import MenuAcc from './components/Layout/MenuAcc';
import Footer from "./components/Layout/Footer";
import {useLocation, useParams} from "react-router-dom";
import {UserContext} from './components/UserContext';
import { useState } from 'react';
function App(props) {
  const [sumSL, setSumSL] = useState("")
  
  function tinhTongQty(data){
    console.log(data);
    setSumSL(data)
  }
  
  let params1 = useLocation();
  return (
    <UserContext.Provider value={{
      tinhTongQty : tinhTongQty,
      sumSL : sumSL
    }}>
      
      <Header/>
      <section>
        <div className="container">
          <div className="row">
            {params1['pathname'].includes("account") ? <MenuAcc/> : <MenuLeft/>}
            {props.children}
          </div>
        </div>
      </section>
      <Footer/>
    </UserContext.Provider> 
  );
}
export default App;
