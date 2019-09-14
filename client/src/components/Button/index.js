import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function Button(props) {
  return (
<button className="btn btn-primary" {...props} type="submit">Save Book</button>
  );
}

export default Button;
