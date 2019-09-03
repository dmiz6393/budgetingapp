import React, { Component } from "react";


class ExpenseCard extends Component {


    render() {
      return (
        <div>
      {this.props.expense.amount}
        </div>
      );
    }
  }
  
  export default ExpenseCard;
  