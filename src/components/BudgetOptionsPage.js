import React, { Component } from "react";
import {Icon, Menu} from "semantic-ui-react";

import { withRouter } from "react-router-dom";

class BudgetOptionsPage extends Component {
  render() {
    return (
        <>
        <Menu icon="labeled" vertical compact size="mini" className="account">
          
          <Menu.Item 
              onClick={() => (window.location = "/profile")}
              active="user"
              name="user"
            >
              {" "}
              <Icon align="right" color="black" name="user" /> My profile
            </Menu.Item>
            </Menu> 
            <h1> </h1>
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
