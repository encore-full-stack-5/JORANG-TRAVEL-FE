import React from "react";
import jorangImage from "./../image/jorangImage.png";
import ChatSignatureColorOval from "./ChatSignatureColorOval copy";
import ChatSignatureOval from "./ChatSignatureOval copy";

const Chatbot = () => {
  return (
    <div>
      <div>
        <img style={{ width: "50px", height: "50px" }} src={jorangImage}></img>
      </div>
      <div>
        <ChatSignatureColorOval content="usedfmkdfggggggggggggggggggggggggggggggggggggggggggggwersdvcxwtesrdfvc55estrdfhgtawersefbhkjtrtsxfcuhnjkgdrseadrfguhlgrdteswsuetsrdfktherdfnkl프랑스 여행가는데 필요한 걸 추천해줘! 조랭이에게 여행에 관한 모든 걸 물어보세요!!"></ChatSignatureColorOval>
        <ChatSignatureOval content="usedfmkdfggggggggggggggggggggggggggggggggggggggggggggwersdvcxwtesrdfvc55estrdfhgtawersefbhkjtrtsxfcuhnjkgdrseadrfguhlgrdteswsuetsrdfktherdfnkl프랑스 여행가는데 필요한 걸 추천해줘!"></ChatSignatureOval>
      </div>
    </div>
  );
};

export default Chatbot;
