import React from "react";

const SignatureOval = (props) => {
  return (
    <div className="signature-oval" style={props.style}>
      {props.content}
    </div>
  );
};

export default SignatureOval;
