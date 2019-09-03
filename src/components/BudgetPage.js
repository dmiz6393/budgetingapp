import React, { Component } from "react";
import BudgetDropDown from "./BudgetDropDown";

import { BrowserRouter as Router, Link, withRouter } from "react-router-dom";

class BudgetPage extends Component {
  render() {
    return (
      <div>
        <BudgetDropDown />
      </div>
    );
  }
}

export default BudgetPage;
