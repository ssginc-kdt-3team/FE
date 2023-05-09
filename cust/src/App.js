import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/pages/Main";
import Login from "./components/pages/auth/Login";
import './App.css';
import Join from "./components/pages/auth/Join";
import { RecoilRoot } from "recoil";
import Heaader from "./components/layout/Header";
import ResvAdd from "./components/pages/reservation/ResvAdd";
import ResvList from "./components/pages/reservation/ResvList";

function App() {
  return ( // 이 안에 JSX 문법 적용
    <RecoilRoot>
      <BrowserRouter>
        <Heaader/>
        <Routes>       
          <Route path="/" element={<Main/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/join" element={<Join/>}/>
          <Route path="/resv/add" element={<ResvAdd/>}/>
          <Route path="/resv" element={<ResvList/>}/>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;