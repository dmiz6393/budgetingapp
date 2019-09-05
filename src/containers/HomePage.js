import React, { Component } from "react";
import { Button, Grid } from "semantic-ui-react";
import background from "./budgey.png" 

class HomePage extends Component {
  render() {
    return (
     
      <div className="header">
         <img src={background} alt="background"/>
         <button class="ui color5 button" onClick={() => (window.location = "/signin")}>Sign In</button>
        <button class="ui color5 button" onClick={() => (window.location = "/signup")}>Sign Up</button>
      </div>
     
    );
  }
}

export default HomePage;
