import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/pages/Main";
import Login from "./components/pages/authentication/Login";
import './App.css';
import Join from "./components/pages/authentication/Join";
import { RecoilRoot } from "recoil";
import Heaader from "./components/layout/Header";
import ResvAdd from "./components/pages/reservation/ResvAdd";
import ResvList from "./components/pages/reservation/ResvList";
import Resv from "./components/pages/reservation/Resv";
import ResvUpdate from "./components/pages/reservation/ResvUpdate";
// import axios from "axios";
import FindId from "./components/pages/authentication/FindId";
import FindIdResult from "./components/pages/authentication/FindIdResult";
import FindPw from "./components/pages/authentication/FindPwd";
import FindPwResult from "./components/pages/authentication/FindPwdResult";
import BranchList from "./components/pages/shop/BranchList";
import ShopList from "./components/pages/shop/ShopList";
import Shop from "./components/pages/shop/Shop";
import Review from "./components/pages/profile/Review";

function App() {
  return ( // 이 안에 JSX 문법 적용
    <RecoilRoot>
      <BrowserRouter>
        <Heaader/>
        <Routes>
          {/* 메인 */}
          <Route path="/" element={<Main/>}/>

          {/* authentication */}
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

          {/* profile */}
          <Route path="/profile/:userId/review" element={<Review/>}/>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;