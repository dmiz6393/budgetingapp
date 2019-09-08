import React, { Component } from "react";
import BudgetCalculator from "./BudgetCalculator";
import {Icon, Divider} from "semantic-ui-react";

import { BrowserRouter as Router, Link, withRouter } from "react-router-dom";

class BudgetOptionsPage extends Component {
  render() {
    return (
        <>
      <div onClick={() => (window.location = "/budget")}>
       <Icon className="icon calculator huge"></Icon>
       <h1 className="icon">Calculate my budget</h1>
        </div>
        <div className="ui divider thick">
        </div>
        <div onClick={() => (window.location = "/budgetform")}>
        <Icon className="bullseye huge"> </Icon>
        <h1 className= "icon">Set my own budget</h1>
      </div>
      </>
    );
  }
}

export default withRouter(BudgetOptionsPage);
