import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";


class SignInForm extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.submitSignIn(this.state);
  };

  render() {
    return (
      <div className="form-container">
        <h1>Sign In</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field required>
            <label>Email:</label>
            <input
              type="email"
              placeholder="email"
              name="email"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field required>
            <label>Password:</label>
            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Button type="submit" fluid>
            sign in
          </Button>
        </Form>
      </div>
    );
  }
}

export default SignInForm;
