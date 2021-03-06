import React, { Component } from "react";
import { Button,Form } from "semantic-ui-react"; 
import {
  withRouter
} from "react-router-dom";

class EditIncome extends Component {

  render() {
    return (
      <div className="form-container">

        <Form onSubmit={this.props.updateIncome}>
        <label className="icon income"> <h1>Type your new income below</h1></label>
          <input name="income" type="number" placeholder="$"  />
          <h3> </h3>
          <Button type="submit" > Submit</Button> 
        </Form>
      </div>
    );
  }
}

export default withRouter(EditIncome)
