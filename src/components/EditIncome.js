import React, { Component } from "react";
import { Button,Form } from "semantic-ui-react"; 
import {
  BrowserRouter as Router,
  withRouter
} from "react-router-dom";

class EditIncome extends Component {

  render() {
    return (
      <div className="form-container">
        <h1 className="icon"> Type your new income below</h1>
        <Form onSubmit={this.props.updateIncome}>
          <input name="income" type="number" placeholder="$"  />
          <h3> </h3>
          <Button type="submit" > Submit</Button> 
        </Form>
      </div>
    );
  }
}

export default withRouter(EditIncome)
