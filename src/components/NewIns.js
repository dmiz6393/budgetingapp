import React, { Component } from "react";
import { Icon, Menu } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import HSBar from "react-horizontal-stacked-bar-chart"; 

class NewIns extends Component {
 

  render() {
    return (
      <>
        {this.props.user === null ? (
          <h3> This page is loading </h3>
        ) : (
          <div>
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
              <h1 className="icon"> My Income </h1>
              <h2 className="icon">{this.props.user.income} </h2>
              <h1 className="icon">Where is most of my money going?</h1>
           { <HSBar height= {100} showTextIn data={   this.props.user.categories.map(category => {
      return( 
        { value: category.expenses[0].amount, description: category.name}
      )
    }) } />}

          </div>
        )}
      </>
    );
  }
}

export default withRouter(NewIns);
