import React from "react";

const ChatSignatureOval = (props) => {
  return (
    <div className="chat-signature-oval" style={props.style}>
      {props.content}
    </div>
  );
};

export default ChatSignatureOval;
