import React from "react";
import Spinner from "./../image/spinner.gif";
import { Background } from "./Styles";

const Loading = () => {
  return (
    <Background>
      <img src={Spinner} alt="로딩중" width="100%" />
    </Background>
  );
};
export default Loading;
