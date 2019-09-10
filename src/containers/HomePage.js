import React, { Component } from "react";
import background from "./budgey.png" 

class HomePage extends Component {
  render() {
    return (
     
      <div className="header front-page">
         <h1></h1>
         <img src={background} alt="background"/>
         <button className="ui color5 button" onClick={() => (window.location = "/signin")}>Sign In</button>
        <button className="ui color5 button" onClick={() => (window.location = "/signup")}>Sign Up</button>
      <h1></h1>
      </div>
     
    );
  }
}

export default HomePage;
