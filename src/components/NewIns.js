import React, { Component } from "react";
import { Icon, Menu } from "semantic-ui-react";
import { withRouter, Link } from "react-router-dom";
import HSBar from "react-horizontal-stacked-bar-chart"; 
import ProgressBar from './ProgressBar' 

class NewIns extends Component {
 
  render() {
    return (
      <>
        {this.props.user === null ? (
          <h3> This page is loading </h3>
        ) : (
          <div className="insights">
              <h1 className="icon"> My Income: {this.props.user.income}   </h1>
              <h1 className="icon">Where is most of my money going?</h1>
           { <HSBar height= {100} showTextIn data={   this.props.user.categories.map(category => {
      return( 
        { value: category.expenses[0].amount, description: category.name}
      )
    }) } />}
    {this.props.amountSaved()}
<Link to="/profile">
          {" "}
          <div>
            {" "}
            <Icon className="angle double left icon huge inverted"></Icon>{" "}
          </div>
        </Link>
       
          </div>
        )}
        
      </>
    );
  }
}

export default withRouter(NewIns);
