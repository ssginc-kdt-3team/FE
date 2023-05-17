import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/pages/Main";
import Login from "./components/pages/auth/Login";
import './App.css';
import Join from "./components/pages/auth/Join";
import { RecoilRoot } from "recoil";
import Heaader from "./components/layout/Header";
import ResvAdd from "./components/pages/reservation/ResvAdd";
import ResvList from "./components/pages/reservation/ResvList";
import Resv from "./components/pages/reservation/Resv";
import ResvUpdate from "./components/pages/reservation/ResvUpdate";
// import axios from "axios";
import FindId from "./components/pages/auth/FindId";
import FindIdResult from "./components/pages/auth/FindIdResult";
import FindPw from "./components/pages/auth/FindPw";
import FindPwResult from "./components/pages/auth/FindPWResult";
import BranchList from "./components/pages/shop/BranchList";
import ShopList from "./components/pages/shop/ShopList";
import Shop from "./components/pages/shop/Shop";

function App() {
  return ( // 이 안에 JSX 문법 적용
    <RecoilRoot>
      <BrowserRouter>
        <Heaader/>
        <Routes>
          {/* 메인 */}
          <Route path="/" element={<Main/>}/>

          {/* auth */}
          <Route path="/login" element={<Login/>}/>
          <Route path="/find-id" element={<FindId/>}/>
          <Route path="/find-id/result" element={<FindIdResult/>}/>
          <Route path="/find-pw" element={<FindPw/>}/>
          <Route path="/find-pw/result" element={<FindPwResult/>}/>
          <Route path="/join" element={<Join/>}/>

          {/* resvation */}
          <Route path="/resv/add" element={<ResvAdd/>}/>
          <Route path="/resv" element={<ResvList isActiveList={false}/>}/>
          <Route path="/resv/active" element={<ResvList isActiveList={true}/>}/>
          <Route path="/resv/:resvId" element={<Resv/>}/>
          <Route path="/resv/update/:resvId" element={<ResvUpdate/>}/>

          {/* shop */}
          <Route path="/branch" element={<BranchList/>}/>
          <Route path="/shop/:branchId" element={<ShopList/>}/>
          <Route path="/shop/:branchId/:shopId" element={<Shop/>}/>

        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;