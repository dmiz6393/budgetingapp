import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import AddToExpense from "./AddToExpense";

class CategoryCard extends Component {
  state = {
    showExpenseForm: false
  };

  getExpenses = () => {
    if (
      this.props.category.expenses.length !== 0 ||
      this.props.category.expenses[0] == undefined
    ) {
      return this.props.category.expenses[0].amount;
    } else {
      return 0;
    }
  };

  showExpense = () => {
    this.setState({
      showExpenseForm: !this.state.showExpenseForm
    });
  };

  handleChange=()=>{
    this.setState({
      showExpenseForm: !this.state.showExpenseForm, 
    })
  }

  handleSubmit=(e)=>{
    this.props.addExpenses(e, this.props.category)
    this.setState({
      showExpenseForm: !this.state.showExpenseForm
    })
  }
  render() {
    return (
      <>
        <div>
          <h5> Category: {this.props.category.name} </h5>
          <h5> Expenses: {this.getExpenses()} </h5>
          <Button onClick={this.showExpense}> + </Button>
        </div>
        <div>
          {this.state.showExpenseForm ? (
            <form onSubmit={this.handleSubmit}>
              <input name= "exp" type="number" />
              <input type="submit"/> 
            </form>
          ) : <div></div>}
        </div>
      </>
    );
  }
}

export default CategoryCard;

//patch request and add whatever their input is
