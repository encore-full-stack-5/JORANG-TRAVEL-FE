import logo from "./logo.svg";
import "./App.css";
import Header from "./component/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import SignIn from "./component/SignIn";
import Mypage from "./component/Mypage";
import SignUp from "./component/SignUp";
import Nav from "./component/Nav";
import TravelDiary from "./component/TravelDiary";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/SignUp" element={<SignUp />}></Route>
          <Route path="/SignIn" element={<SignIn />}></Route>
          <Route path="/Mypage" element={<Mypage />}></Route>
          <Route path="/TravelDiary" element={<TravelDiary />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
