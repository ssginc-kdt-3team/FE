import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/pages/Main";
import Login from "./components/pages/authentication/Login";
import './App.css';
import Join from "./components/pages/authentication/Join";
import { RecoilRoot } from "recoil";
import Header from "./components/layout/Header";
import AddResv from "./components/pages/reservation/AddResv";
import ResvList from "./components/pages/reservation/ResvList";
import Resv from "./components/pages/reservation/Resv";
import UpdateResv from "./components/pages/reservation/UpdateResv";
// import axios from "axios";
import FindId from "./components/pages/authentication/FindId";
import FindIdResult from "./components/pages/authentication/FindIdResult";
import FindPw from "./components/pages/authentication/FindPwd";
import FindPwResult from "./components/pages/authentication/FindPwdResult";
import BranchList from "./components/pages/shop/BranchList";
import ShopList from "./components/pages/shop/ShopList";
import Shop from "./components/pages/shop/Shop";
import Review from "./components/pages/profile/Review";
import Profile from "./components/pages/profile/Profile";
import Cash from "./components/pages/profile/cash/Cash";
import ChargeResult from "./components/pages/profile/cash/ChargeResult";

function App() {
  return ( // 이 안에 JSX 문법 적용
    <RecoilRoot>
      <BrowserRouter>
        <Header/>
        <Routes>
          {/* 메인 */}
          <Route path="/" element={<Main/>}/>

          {/* authentication */}
          <Route path="/login" element={<Login/>}/>
          <Route path="/find-id" element={<FindId/>}/>
          <Route path="/find-id/result" element={<FindIdResult/>}/>
          <Route path="/find-pwd" element={<FindPw/>}/>
          <Route path="/find-pwd/result" element={<FindPwResult/>}/>
          <Route path="/join" element={<Join/>}/>

          {/* resvation */}
          <Route path="/resv/add" element={<AddResv/>}/>
          <Route path="/resv" element={<ResvList isActiveList={false}/>}/>
          <Route path="/resv/active" element={<ResvList isActiveList={true}/>}/>
          <Route path="/resv/:resvId" element={<Resv/>}/>
          <Route path="/resv/update/:resvId" element={<UpdateResv/>}/>

          {/* shop */}
          <Route path="/branch" element={<BranchList/>}/>
          <Route path="/shop/:branchId" element={<ShopList/>}/>
          <Route path="/shop/:branchId/:shopId" element={<Shop/>}/>

          {/* profile */}
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/profile/review" element={<Review/>}/>
          <Route path="/cash" element={<Cash/>}/>

          {/* Charge */}
          <Route path="/chargeResult" element={<ChargeResult/>}/>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;