import React, { Component } from "react";
import { Button } from "semantic-ui-react";

class HomePage extends Component {
  render() {
    return (
      <div>
        <h1>budgey</h1>
        <Button onClick={() => (window.location = "/signin")}>Sign In</Button>
        <Button onClick={() => (window.location = "/signup")}>Sign Up</Button>
      </div>
    );
  }
}

export default HomePage;
