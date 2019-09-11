import React, { Component } from "react";
import {Icon, Menu} from "semantic-ui-react";

import { withRouter, Link } from "react-router-dom";

class BudgetOptionsPage extends Component {
  render() {
    return (
        <>
            <h1> </h1>
      <div className= "budget" onClick={() => (window.location = "/budget")}>
       <Icon className="icon calculator huge"></Icon>
       <h1 className="icon">Calculate my budget</h1>
        </div>
        <div className="ui divider thick">
        </div>
        <div onClick={() => (window.location = "/budgetform")}>
        <Icon className="bullseye huge"> </Icon>
        <h1 className= "icon">Set my own budget</h1>
      </div>
<h1></h1>
      <div>
      <Link to="/profile">
          {" "}
          <div>
            {" "}
            <Icon className="angle double left icon huge inverted"></Icon>{" "}
          </div>
        </Link>
      </div>
      </>
    );
  }
}

export default withRouter(BudgetOptionsPage);
