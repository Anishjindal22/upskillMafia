import React from "react";
import "./Home.css";
const Home = () => {
  return (
    <div>
      <div className="grid-container">
        <div className="container container-one">First container</div>

        <div className="container">
          {/* <!-- Content of the first container goes here --> */}
          <p>First Container (30% width)</p>
        </div>
        <div className="container">
          {/* <!-- Content of the second container goes here --> */}
          <p>Second Container (70% width)</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
