import React from "react";

const SignatureOval = (props) => {
  return (
    <div className="signature-oval" style={props.style}>
      <p>{props.content}</p>
    </div>
  );
};

export default SignatureOval;
