import React from "react";

const handleOnSubmit = (e) => {
  e.preventDefault();
  console.log("submit");
};
const Signup = () => {
  return (
    <form onSubmit={handleOnSubmit}>
      <input type="text" />
    </form>
  );
};
export default Signup;
