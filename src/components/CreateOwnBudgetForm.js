import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";

class CreateOwnBudgetForm extends Component {
  state = {
    budget: 0,
    showNext: false
  };

  submitButton = event => {
    event.preventDefault();
    this.setState({
      budget: event.target.value
    });
  };

  showNxt=()=>{
    this.setState({
      showNext: true
    })
  }

  render() {
    return (
      <div className="form-container">
        <div></div>
        <Form inverted onSubmit={e => this.props.setBudget(e, this.state.budget)}>
          <label><h1 className="icon">How much would you like to spend each month?</h1></label>
          <h5> </h5>
          <input onChange={this.submitButton} name="budget" type="number" />
          <h5> </h5>
          <Button onClick={this.showNxt}  inverted color="grey" type="submit" >
            Submit
          </Button>
        </Form>
        <div>
        </div>
      </div>
    );
  }
}

export default CreateOwnBudgetForm;
