import React from "react";

const Login = () => {
  return (
    <form>
      <input type="email" placeholder="Enter your email" required />
      <input type="password" placeholder="Enter your password" required />
      <button type="submit">Log in</button>
    </form>
  );
};

export default Login;
