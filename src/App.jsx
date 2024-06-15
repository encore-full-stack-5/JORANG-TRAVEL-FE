import logo from "./logo.svg";
import "./App.css";
import Header from "./component/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import SignIn from "./component/SignIn";
import Mypage from "./component/Mypage";
import SignUp from "./component/SignUp";
import Nav from "./component/Nav";
import Chatbot from "./component/Chatbot";
import Mytrip from "./component/Mytrip";
import ShareTrip from "./component/ShareTrip";
import ShareTripCountry from "./component/ShareTripCountry";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<ShareTripCountry />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/mypage" element={<Mypage />}></Route>
          <Route path="/shareTrip" element={<ShareTrip />}></Route>
          <Route path="/chatbot" element={<Chatbot />}></Route>
          <Route path="/mytrip" element={<Mytrip />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
