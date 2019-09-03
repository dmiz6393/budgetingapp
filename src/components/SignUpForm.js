import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";

class SignUpForm extends Component {
  state = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    income: ""
  };

  handleChange = e => {
    if (e.target.name === "income" && isNaN(e.target.value) === true) {
      alert("You must fill in a number");
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const elements = e.target.getElementsByClassName("required field");
    let arry = Array.from(elements);
    const innerT = arry.map(element => element.children[1].defaultValue);
    innerT.splice(2, 2);
    innerT.includes("")
      ? alert("You need to fill in the required fields")
      : this.props.submitSignUp(this.state);
  };

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <Form onSubmit={e => this.handleSubmit(e)} v>
          <Form.Field required>
            <label>Email:</label>
            <input
              type="email"
              placeholder="email"
              value={this.state.email}
              onChange={this.handleChange}
              name="email"
            />
          </Form.Field>
          <Form.Field required>
            <label>Password:</label>
            <input
              type="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handleChange}
              name="password"
            />
          </Form.Field>

          <Form.Field>
            <label>First Name:</label>
            <input
              type="text"
              placeholder="first name"
              //   value={this.state.first_name}
              onChange={this.handleChange}
              name="first_name"
            />
          </Form.Field>

          <Form.Field>
            <label>Last Name:</label>
            <input
              type="text"
              placeholder="last name"
              //   value={this.state.last_name}
              onChange={this.handleChange}
              name="last_name"
            />
          </Form.Field>

          <Form.Field required>
            <label>Income:</label>
            <input
              type="text"
              placeholder="You annual income after tax"
              value={this.state.income}
              onChange={this.handleChange}
              name="income"
            />
          </Form.Field>

          <Button type="submit" fluid>
            sign up
          </Button>
        </Form>
      </div>
    );
  }
}

export default SignUpForm;
