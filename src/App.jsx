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
import TravelDiary from "./component/TravelDiary";
import Posts from "./component/Posts";
import ImageSlider from "./component/ImageSlider";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/mypage" element={<Mypage />}></Route>
          <Route path="/sharetrip" element={<ShareTrip />}></Route>
          <Route path="/chatbot" element={<Chatbot />}></Route>
          <Route path="/mytrip" element={<Mytrip />}></Route>
          <Route path="/traveldiary" element={<TravelDiary />}></Route>
          <Route
            path="/country/:country"
            element={<ShareTripCountry />}
          ></Route>
          <Route path="/posts" element={<Posts />}></Route>
          <Route path="/slider" element={<ImageSlider />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
