import React, { Component } from "react";
import { List, Button, Form } from "semantic-ui-react";

import {
  BrowserRouter as Router,
  withRouter
} from "react-router-dom";

class ExpenseCardNew extends Component {
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

  handleClick = () => {
    this.setState({ showExpenseForm: true });
  };

  handleSubmit = (event) => {

   debugger 
  };

  render() {
    return (
      <div>
        <List divided verticalAlign="middle">
          <List.Item>
            <List.Content className="icon" floated="right">
            {this.state.showExpenseForm ?  null : <Button>Add</Button>}

              {this.state.showExpenseForm ? 
              null : <Button onClick={this.handleClick}> Edit</Button>}
            </List.Content>
            {this.state.showExpenseForm ? (
              //   <List.Content className="icon" floated="right">
              //     {" "}
              <form onSubmit={this.handleSubmit}>
                {" "}
                <input
                  type="text"
                  defaultValue={this.props.category.name}
                  name="category"
                />{" "}
                <input name="amount" type="number" defaultValue={this.getExpenses()} />{" "}
                <Button> Submit</Button>
              </form>
            ) : (
              //   </List.Content>
              <List.Content>
                {this.props.category.name} {this.getExpenses()}
              </List.Content>
            )}
          </List.Item>
        </List>
      </div>
    );
  }
}

export default withRouter(ExpenseCardNew);
