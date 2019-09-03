import React, { Component } from "react";
import {Link } from "react-router-dom";
import { Icon, Button } from "semantic-ui-react";

class WelcomePage extends Component {
  state = {
    showBudgetPage: false
  };

  showBudgetPage = () => {
    this.setState({
      showBudgetPage: true
    });
  };

  render() {
    return (
      <>
        <h1>Hi, {this.props.user.first_name ? this.props.user.first_name : "there" }, we are happy you joined! </h1>
        <h3>Take the next step and set up your budget</h3>
        <Link  to="/budget"> <div> <Icon className="angle double right icon huge inverted"></Icon> </div></Link> 
        <Button onClick={this.props.logOut}>Log out</Button> 
      </>
    );
  }
}

export default WelcomePage;





