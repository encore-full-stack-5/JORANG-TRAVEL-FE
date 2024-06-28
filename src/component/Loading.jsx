import React from "react";
import Spinner from "./../image/spinner.gif";
import { Background, LoadingText } from "./Styles";

export default () => {
  return (
    <Background>
      <img src={Spinner} alt="로딩중" width="100%" />
    </Background>
  );
};
