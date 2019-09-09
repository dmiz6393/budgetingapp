import React, { Component } from "react";
import { Form, Button, Container } from "semantic-ui-react";

import { BrowserRouter as Link, NavLink } from "react-router-dom";

class BudgetCalculator extends Component {
  state = {
    showSaving: false,
    save: 0,
    showBudget: false,
    budget: 0,
    showArrow: false
  };

  handleChange = event => {
    event.preventDefault();
    this.props.saveGoal(event)
    const years = event.target.older.value - event.target.age.value;
    const goal = event.target.goal.value;
    const perYear = goal / years;
    const perMonth = perYear / 12;
    this.setState({
      showSaving: true,
      save: perMonth.toFixed(2)
    });
  };

  budgetCalculator = () => {
    const monthlySalary = parseInt(this.props.user.income) / 12;
    const budget = monthlySalary - this.state.save;
    budget < 0
      ? alert(
          "You aren't making enough to save that amount, please set a new goal"
        )
      : this.setState({
          showBudget: true,
          budget: budget.toFixed(2)
        });
  };

  handleClick = e => {
    this.props.setBudget(e, this.state.budget);
    this.setState({
      showArrow: true
    });
  };

  render() {
    return (
      <Container>
        <Form inverted onSubmit={this.handleChange}>
          <Form.Field widths="equal">
            <Form.Input
              fluid
              label="How much would you like to save?"
              name="goal"
              type="number"
            />
            <Form.Input
              fluid
              label="At what age would you like to have this saved by?"
              name="older"
              type="number"
            />
            <Form.Input
              fluid
              label="How old are you now?"
              name="age"
              type="number"
            />
            <Form.Button> Submit </Form.Button>
          </Form.Field>
        </Form>

        {this.state.showSaving ? (
          <>
            <h1> You will need to save {this.state.save} a month </h1>{" "}
            <Button onClick={this.budgetCalculator}>
              Calculate My Budget{" "}
            </Button>
          </>
        ) : null}
        {this.state.showBudget ? (
          <>
            {" "}
            <h1>
              To save this, your monthly budget should be {this.state.budget}
            </h1>{" "}
            <Button onClick={this.handleClick}>Set this as my budget</Button>{" "}
            <NavLink to="/budgetform">
              <Button>Create my own budget</Button>
            </NavLink>
          </>
        ) : null}
      </Container>
    );
  }
}

export default BudgetCalculator;
