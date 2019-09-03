import React, { Component } from "react";
import { Form, Button, Container, Icon } from "semantic-ui-react";

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
    const years = event.target.older.value - event.target.age.value;
    const goal = event.target.goal.value;
    const perYear = goal / years;
    const perMonth = perYear / 12;
    this.setState({
      showSaving: true,
      save: perMonth
    });
  };

  budgetCalculator = () => {
    const monthlySalary = parseInt(this.props.user.income) / 12;
    const budget = monthlySalary - this.state.save;
    budget<0 ? alert("You aren't making enough to save that amount, please set a new goal"):   
    this.setState({
      showBudget: true,
      budget: budget
    });
  };

  handleClick = e => {
    this.props.setBudget(e, this.state.budget);
    this.setState({
      showArrow: true
    });
  };

  render() {
    // this.budgetCalculator()
    return (
      <Container>
        <Form onSubmit={this.handleChange}>
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
            {this.state.showArrow && this.props.newUser ? (
              <div>
                <NavLink to="/expenses">
                  <Icon className="angle double right icon huge inverted"/>
                </NavLink>
              </div>
            ) : (
              <NavLink to="/budgetform">
              <Button>
                Create my own budget
              </Button>
              </NavLink>
            )}
          </>
        ) : null}

        {this.props.existingUser ? (
              <NavLink to="/profile">
              <Button>
               Back to my profile
              </Button>
              </NavLink>
            ): null}
      </Container>
    );
  }
}

export default BudgetCalculator;

//what is your savings goal?
// how old are you now?
// what age would you like to have this saved by?
//Would you like to set this as your budget? <select> <option> Yes </option> <option> No </option>  </select>
